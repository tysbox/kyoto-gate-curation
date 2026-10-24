#!/usr/bin/env bash
#
# 編集セッションを開始するランチャー。
#
# 手順:
#   1. .nvmrc の Node を解決する（nvm / volta / 既存 の順に探索。見つからなければ取得）
#   2. node_modules を自己修復する（リンク切れ・実体化していても自動で直す）
#   3. Git インデックスを自己修復する（.git/index が欠落していれば再構築）
#   4. 開発サーバーを起動し、応答したらブラウザで編集画面と EN サイトを開く
#
# 使い分け:
#   - ターミナルから : npm run edit
#   - Finder から   : start.command をダブルクリック
#
# 環境変数:
#   MA_NO_OPEN=1    … ブラウザを開かない

set -euo pipefail

# リポジトリ直下を基準にする
cd "$(dirname "$0")/.."

# 1. PATH 補完 (Finder 起動時は PATH が最小のため node/npm が見つからない)
for _dir in \
  "${HOME}/.hermes/node/bin" \
  "${HOME}/.local/bin" \
  "${HOME}/.nvm/versions/node"/*/bin \
  "${HOME}/.volta/bin" \
  "/opt/homebrew/bin" \
  "/usr/local/bin"
do
  for _d in ${_dir}; do
    if [ -d "${_d}" ]; then
      case ":${PATH}:" in
        *":${_d}:"*) : ;;
        *) PATH="${_d}:${PATH}" ;;
      esac
    fi
  done
done
export PATH

# 1b. Node バージョン解決 (.nvmrc がある場合)
if [ -f .nvmrc ]; then
  NODE_VERSION=$(cat .nvmrc | tr -d '[:space:]')
  if command -v nvm >/dev/null 2>&1; then
    nvm use "$NODE_VERSION" 2>/dev/null || nvm install "$NODE_VERSION"
  elif command -v volta >/dev/null 2>&1; then
    volta install "node@$NODE_VERSION"
  fi
fi

# 1c. node/npm の存在確認
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "ERROR: node / npm が見つかりません。Node.js 22.22 以上をインストールしてください。" >&2
  exit 1
fi

# 1d. Node バージョン確認 (Astro 7 は >=22.22.0 を要求)
NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)
NODE_MINOR=$(node -p 'process.versions.node.split(".")[1]' 2>/dev/null || echo 0)
if [ "${NODE_MAJOR}" -lt 22 ] || { [ "${NODE_MAJOR}" -eq 22 ] && [ "${NODE_MINOR}" -lt 22 ]; }; then
  echo "WARNING: Node $(node --version) は Astro 7 非対応です (>=22.22.0 必須)。" >&2
  # hermes node (v22.22.3) があれば優先使用
  if [ -x "${HOME}/.hermes/node/bin/node" ]; then
    export PATH="${HOME}/.hermes/node/bin:${PATH}"
    hash -r
    echo "  → ${HOME}/.hermes/node/bin/node ($(node --version)) を使用します" >&2
  else
    echo "  → このまま続行しますが、起動に失敗する可能性があります" >&2
  fi
fi

# 2. node_modules 自己修復
if [ -L node_modules ] && [ ! -d node_modules ]; then
  echo "node_modules symlink broken, removing..."
  rm -f node_modules
fi
if [ ! -d node_modules ]; then
  echo "node_modules missing, installing..."
  npm install
fi

# 3. Git インデックス修復 (git リポジトリの場合のみ)
if [ -d .git ] && [ ! -f .git/index ]; then
  echo "Git index missing, resetting..."
  git reset
fi

# 4. 既存プロセス停止 (ポート競合防止)
# lsof -ti は複数PIDを改行区切りで返すため、1つずつ kill する
for port in 4321 4001 9000; do
  pids=$(lsof -ti ":${port}" 2>/dev/null || true)
  if [ -n "${pids}" ]; then
    echo "Port ${port} in use, killing: $(echo ${pids} | tr '\n' ' ')"
    for pid in ${pids}; do
      kill -9 "${pid}" 2>/dev/null || true
    done
  fi
done
sleep 1

# 5. 開発サーバー起動 (TinaCMS + Astro)
echo "Starting dev server (TinaCMS + Astro)..."
npm run edit &
DEV_PID=$!

# サーバー応答待ち (TinaCMS 初回コンパイルで時間がかかる)
# Astro (4321) と Tina GraphQL (4001) の両方が応答するまで待つ
echo "Waiting for dev server (Astro + TinaCMS)..."
READY=0
for i in {1..120}; do
  ASTRO_OK=0
  TINA_OK=0
  curl -sf http://127.0.0.1:4321 >/dev/null 2>&1 && ASTRO_OK=1
  curl -sf http://localhost:4001/graphql >/dev/null 2>&1 && TINA_OK=1
  if [ "${ASTRO_OK}" -eq 1 ] && [ "${TINA_OK}" -eq 1 ]; then
    echo "Dev server ready (Astro + TinaCMS GraphQL)"
    READY=1
    break
  fi
  sleep 1
done
if [ "${READY}" -ne 1 ]; then
  echo "WARNING: dev server did not respond within 120s" >&2
fi

# ブラウザを開く (MA_NO_OPEN=1 でスキップ)
if [ -z "${MA_NO_OPEN:-}" ]; then
  if command -v open >/dev/null 2>&1; then
    open http://127.0.0.1:4321/admin/
    sleep 1
    open http://127.0.0.1:4321/
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open http://127.0.0.1:4321/admin/
    sleep 1
    xdg-open http://127.0.0.1:4321/
  fi
fi

wait $DEV_PID