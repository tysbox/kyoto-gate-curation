import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

// ローカル開発時はオンデマンドレンダリング(node アダプタ)。
// Cloudflare ビルド時は静的化(functions/api/ が担当)。
export const prerender = false;

/**
 * POST /api/save-file
 * body: { filename: 'home.json' | 'home.ja.json' | 'settings.json' | ..., content: string(JSON) }
 *
 * content/ 配下の JSON へ書き込む。ホワイトリストでディレクトリトラバーサルを防止。
 */
const ALLOWED_FILES = new Set([
  'home.json', 'home.ja.json', 'home.fr.json',
  'settings.json', 'settings.ja.json', 'settings.fr.json',
]);

export const POST: APIRoute = async ({ request }) => {
  try {
    let data: any;
    try {
      const raw = await request.text();
      if (!raw) {
        return new Response(JSON.stringify({ success: false, error: 'Empty request body' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      data = JSON.parse(raw);
    } catch {
      return new Response(JSON.stringify({ success: false, error: 'Invalid JSON format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { filename, content } = data;
    if (!filename || typeof content !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'filename と content は必須です' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const baseName = path.basename(String(filename));
    if (!ALLOWED_FILES.has(baseName)) {
      return new Response(
        JSON.stringify({ success: false, error: `不正なファイル名です: ${baseName}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch {
      return new Response(JSON.stringify({ success: false, error: '無効なJSON形式です' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const dir = ALLOWED_FILES.has('settings.json') && baseName.startsWith('settings')
      ? 'content/global'
      : 'content/pages';
    const targetPath = path.join(process.cwd(), dir, baseName);

    fs.writeFileSync(targetPath, JSON.stringify(parsed, null, 2) + '\n', 'utf-8');
    console.log(`[save-file] Saved: ${dir}/${baseName} at ${new Date().toISOString()}`);

    return new Response(
      JSON.stringify({ success: true, message: `保存しました: ${dir}/${baseName}`, path: `${dir}/${baseName}` }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[save-file] error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : '不明なエラーが発生しました',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
