// Cloudflare Pages Functions — 画像アップロードは GitHub Contents API 経由。
// ローカル開発では src/pages/api/upload-image.ts が担当。
// 静的ホスティング (Cloudflare Pages) では public/images への直接書き込みが
// できないため、GitHub リポジトリへコミットし、再デプロイで反映する。

const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function base64Encode(bytes) {
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

export async function onRequestPost({ request, env }) {
  const GITHUB_TOKEN = env.GITHUB_TOKEN;
  const GITHUB_REPOSITORY = env.GITHUB_REPOSITORY;
  const GITHUB_BRANCH = env.GITHUB_BRANCH || 'main';

  if (!GITHUB_TOKEN || !GITHUB_REPOSITORY) {
    return json(
      { success: false, error: 'アップロードAPIが未設定です (GITHUB_TOKEN / GITHUB_REPOSITORY 環境変数が必要)' },
      503
    );
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, error: 'Invalid form data' }, 400);
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return json({ success: false, error: 'file フィールドは必須です' }, 400);
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return json({ success: false, error: `未対応のファイル形式です: ${file.type}` }, 400);
  }
  if (file.size > MAX_SIZE) {
    return json({ success: false, error: 'ファイルサイズが10MBを超えています' }, 400);
  }

  const safeStem =
    file.name
      .replace(/\.[^.]+$/, '')
      .replace(/[^\w\-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'image';
  const filename = `${safeStem}-${Date.now()}.${ext}`;
  const repoPath = `public/images/${filename}`;
  const apiBase = `https://api.github.com/repos/${GITHUB_REPOSITORY}/contents/${repoPath}`;

  try {
    const bytes = new Uint8Array(await file.arrayBuffer());

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'kyoto-gateway-cms',
      },
      body: JSON.stringify({
        message: `CMS upload ${repoPath}`,
        content: base64Encode(bytes),
        branch: GITHUB_BRANCH,
      }),
    });

    if (!putRes.ok) {
      const text = await putRes.text();
      console.error('GitHub PUT error:', putRes.status, text);
      return json({ success: false, error: 'GitHub API エラー（書き込み）' }, 500);
    }

    return json({
      success: true,
      path: `/images/${filename}`,
      filename,
      note: 'GitHub へアップロードしました。反映には再デプロイが必要です。',
    });
  } catch (error) {
    return json(
      { success: false, error: error instanceof Error ? error.message : '不明なエラー' },
      500
    );
  }
}
