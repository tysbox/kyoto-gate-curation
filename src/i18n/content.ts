/**
 * コンテンツ読み込みユーティリティ
 *
 * ロケール別 JSON を読み込む。指定ロケールが存在しなければ
 * デフォルトロケール (en) にフォールバックする。
 *
 * 命名規則:
 *   en → content/pages/home.json
 *   ja → content/pages/home.ja.json
 *   fr → content/pages/home.fr.json
 */

import fs from 'node:fs';
import path from 'node:path';
import type { SiteData, GlobalSettings } from '../types';
import { defaultLocale, contentFile, type Locale } from './config';

const contentRoot = path.join(process.cwd(), 'content');

function readJson<T>(filePath: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  } catch {
    return null;
  }
}

/** ロケール別ページコンテンツ(フォールバック付き) */
export function loadPageData(lang: Locale, base = 'home'): SiteData | null {
  const candidates = [contentFile(base, lang)];
  if (lang !== defaultLocale) candidates.push(contentFile(base, defaultLocale));

  for (const file of candidates) {
    const data = readJson<SiteData>(path.join(contentRoot, 'pages', file));
    if (data) return data;
  }
  return null;
}

/** ロケール別グローバル設定(フォールバック付き) */
export function loadGlobalSettings(lang: Locale): GlobalSettings | null {
  const candidates = [contentFile('settings', lang)];
  if (lang !== defaultLocale) candidates.push(contentFile('settings', defaultLocale));

  for (const file of candidates) {
    const data = readJson<GlobalSettings>(path.join(contentRoot, 'global', file));
    if (data) return data;
  }
  return null;
}

/** 指定ロケールのコンテンツが実在するか */
export function hasLocaleContent(lang: Locale, base = 'home'): boolean {
  return fs.existsSync(path.join(contentRoot, 'pages', contentFile(base, lang)));
}
