/**
 * パスヘルパー
 *
 * ロケール別 URL を生成する。
 *   - デフォルトロケール (en) はルート直下: /  /#faq
 *   - その他 (ja / fr) はプレフィックス:   /ja/  /ja/#faq
 */

import { defaultLocale, type Locale } from './config';

/** ロケールのベースパス(末尾スラッシュ付き) */
export function localePath(lang: Locale): string {
  return lang === defaultLocale ? '/' : `/${lang}/`;
}

/**
 * ロケール内のアンカー/パスを生成。
 *   localizedHref('ja', '#faq') → '/ja/#faq'
 *   localizedHref('en', '#faq') → '/#faq'
 */
export function localizedHref(lang: Locale, href: string): string {
  if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href;
  }
  const base = localePath(lang);
  if (href.startsWith('#')) return `${base}${href}`;
  if (href === '/' || href === '') return base;
  return `${base}${href.replace(/^\//, '')}`;
}

/**
 * 現在のパスから別ロケールの同等パスを生成(言語切替用)。
 * 例: currentPath='/ja/#faq', target='en' → '/#faq'
 */
export function switchLocalePath(currentPath: string, target: Locale): string {
  const [pathPart, hash = ''] = currentPath.split('#');
  const hashSuffix = hash ? `#${hash}` : '';

  const segments = pathPart.split('/').filter(Boolean);
  const known = ['en', 'ja', 'fr'];
  if (segments.length > 0 && known.includes(segments[0])) {
    segments.shift();
  }
  const rest = segments.join('/');

  const base = localePath(target);
  if (!rest) return `${base}${hashSuffix}`;
  return `${base}${rest}${hashSuffix}`;
}

/**
 * 画像など静的アセットパスを絶対パスへ正規化。
 * ロケールプレフィックス付き URL でも画像が解決されるようにする。
 */
export function normalizeAssetPath(p: string | undefined | null): string {
  if (!p) return '';
  if (/^(https?:)?\/\//.test(p) || p.startsWith('data:')) return p;
  return `/${p.replace(/^\/+/, '')}`;
}
