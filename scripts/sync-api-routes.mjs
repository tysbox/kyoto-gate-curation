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

const isCloudflare = process.env.BUILD_TARGET === 'cloudflare';
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
  if (fs.existsSync(srcApi)) {
    if (fs.existsSync(dstApi)) {
      fs.rmSync(dstApi, { recursive: true, force: true });
    }
    fs.cpSync(srcApi, dstApi, { recursive: true });
    console.log('[sync-api-routes] Copied src/api -> src/pages/api for local dev');
  }
}