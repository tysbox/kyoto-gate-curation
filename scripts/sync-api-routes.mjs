/**
 * API ルート同期スクリプト
 *
 * Cloudflare Pages では functions/api/ が API を担当するため、
 * src/pages/api/ 配下の API ルートをビルドに含めません。
 * （API ソースは src/api/ に保管し、ローカル開発時のみ src/pages/api/ へ複製）
 *
 * このスクリプトは以下を実行:
 *   - BUILD_TARGET=cloudflare のとき: src/pages/api/ を削除（静的ビルド用）
 *   - それ以外: src/api/ → src/pages/api/ を複製（ローカル開発用）
 */

import fs from 'node:fs';
import path from 'node:path';

const isCloudflare =
  process.env.BUILD_TARGET === 'cloudflare' || process.env.CF_PAGES === '1';
const srcApi = path.resolve('src/api');
const dstApi = path.resolve('src/pages/api');

if (isCloudflare) {
  // Cloudflare ビルド時: pages/api を削除（functions/api/ が担当）
  if (fs.existsSync(dstApi)) {
    fs.rmSync(dstApi, { recursive: true, force: true });
    console.log('[sync-api-routes] Removed src/pages/api for Cloudflare build');
  }
} else {
  // ローカル開発: src/api → src/pages/api を複製
  // 複製時に prerender=false を注入 (node アダプタでオンデマンドレンダリング)。
  // ソース (src/api) 自体には含めない — Cloudflare ビルドが src/ をスキャンして
  // サーバーページと誤認するのを防ぐため。
  if (fs.existsSync(srcApi)) {
    if (fs.existsSync(dstApi)) {
      fs.rmSync(dstApi, { recursive: true, force: true });
    }
    fs.cpSync(srcApi, dstApi, { recursive: true });
    const PRERENDER_LINE = 'export const prerender = false;\n';
    for (const file of fs.readdirSync(dstApi)) {
      if (!file.endsWith('.ts')) continue;
      const fp = path.join(dstApi, file);
      let content = fs.readFileSync(fp, 'utf-8');
      if (!content.includes('export const prerender')) {
        // 最後の import 文の後に挿入
        const lines = content.split('\n');
        let lastImport = -1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import ')) lastImport = i;
        }
        lines.splice(lastImport + 1, 0, '', PRERENDER_LINE.trimEnd());
        content = lines.join('\n');
        fs.writeFileSync(fp, content);
      }
    }
    console.log('[sync-api-routes] Copied src/api -> src/pages/api for local dev (prerender=false injected)');
  }
}