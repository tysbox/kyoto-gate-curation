import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const prerender = false;

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * POST /api/upload-image (multipart/form-data, field: file)
 * → public/images/ へ保存し、{ path: '/images/<name>' } を返す。
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return new Response(JSON.stringify({ success: false, error: 'file フィールドは必須です' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return new Response(
        JSON.stringify({ success: false, error: `未対応のファイル形式です: ${file.type}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (file.size > MAX_SIZE) {
      return new Response(JSON.stringify({ success: false, error: 'ファイルサイズが10MBを超えています' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const imagesDir = path.join(process.cwd(), 'public/images');
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

    // 元ファイル名を安全化(日本語・空白・危険文字を除去)
    const safeStem = path
      .basename(file.name, path.extname(file.name))
      .replace(/[^\w\-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'image';
    const filename = `${safeStem}-${Date.now()}.${ext}`;
    const targetPath = path.join(imagesDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(targetPath, buffer);
    console.log(`[upload-image] Saved: public/images/${filename} (${file.size} bytes)`);

    return new Response(
      JSON.stringify({ success: true, path: `/images/${filename}`, filename }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[upload-image] error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : '不明なエラーが発生しました',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
