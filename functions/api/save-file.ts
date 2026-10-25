// Cloudflare Pages Functions — KV は使わず、GitHub Contents API 経由で保存。
// ローカル開発 (npm run dev / edit) では src/pages/api/save-file.ts が担当。
//
// 必要な環境変数 (Cloudflare Pages の Settings > Environment variables):
//   GITHUB_TOKEN      … repo スコープを持つ Personal Access Token
//   GITHUB_REPOSITORY … owner/repo (例: tysbox/kyoto-gate-curation)
//   GITHUB_BRANCH     … 既定 'main'
//
// 未設定の場合は 503 を返す (静的サイトとして閲覧は可能)。

const ALLOWED_FILES = new Set([
  'home.json', 'home.ja.json', 'home.fr.json',
  'settings.json', 'settings.ja.json', 'settings.fr.json',
]);

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function base64Encode(str) {
  const bytes = new TextEncoder().encode(str);
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
      { success: false, error: '保存APIが未設定です (GITHUB_TOKEN / GITHUB_REPOSITORY 環境変数が必要)' },
      503
    );
  }

  let data;
  try {
    const raw = await request.text();
    if (!raw) return json({ success: false, error: 'Empty request body' }, 400);
    data = JSON.parse(raw);
  } catch {
    return json({ success: false, error: 'Invalid JSON format' }, 400);
  }

  const { filename, content } = data;
  if (!filename || typeof content !== 'string') {
    return json({ success: false, error: 'filename と content は必須です' }, 400);
  }

  const baseName = filename.split('/').pop();
  if (!ALLOWED_FILES.has(baseName)) {
    return json({ success: false, error: `不正なファイル名です: ${baseName}` }, 400);
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    return json({ success: false, error: '無効なJSON形式です' }, 400);
  }

  const dir = baseName.startsWith('settings') ? 'content/global' : 'content/pages';
  const repoPath = `${dir}/${baseName}`;
  const apiBase = `https://api.github.com/repos/${GITHUB_REPOSITORY}/contents/${repoPath}`;

  try {
    // 既存ファイルの sha を取得
    let sha;
    const getRes = await fetch(`${apiBase}?ref=${encodeURIComponent(GITHUB_BRANCH)}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'kyoto-gateway-cms',
      },
    });
    if (getRes.ok) {
      const body = await getRes.json();
      sha = body.sha;
    } else if (getRes.status !== 404) {
      return json({ success: false, error: 'GitHub API エラー（読み取り）' }, 500);
    }

    const putBody = {
      message: `CMS update ${repoPath}`,
      content: base64Encode(JSON.stringify(parsed, null, 2) + '\n'),
      branch: GITHUB_BRANCH,
    };
    if (sha) putBody.sha = sha;

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'kyoto-gateway-cms',
      },
      body: JSON.stringify(putBody),
    });

    if (!putRes.ok) {
      const text = await putRes.text();
      console.error('GitHub PUT error:', putRes.status, text);
      return json({ success: false, error: 'GitHub API エラー（書き込み）' }, 500);
    }

    const resJson = await putRes.json();
    return json({
      success: true,
      message: `GitHub に保存しました: ${repoPath}`,
      path: repoPath,
      sha: resJson.content?.sha,
    });
  } catch (error) {
    return json(
      { success: false, error: error instanceof Error ? error.message : '不明なエラー' },
      500
    );
  }
}
