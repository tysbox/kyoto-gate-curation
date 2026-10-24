/**
 * i18n 設定 — 対応ロケールとデフォルトロケール
 *
 * コンテンツファイル命名規則:
 *   - デフォルトロケール (en) → content/pages/home.json
 *   - その他 (ja / fr)       → content/pages/home.ja.json / home.fr.json
 *   - グローバル設定も同様    → content/global/settings.ja.json
 */

export const locales = ['en', 'ja', 'fr'] as const;

export type Locale = (typeof locales)[number];

/** ルート `/` で表示される言語 */
export const defaultLocale: Locale = 'en';

/** 言語切替 UI の表示名 */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  fr: 'Français',
};

/** コンパクト表示（ヘッダー用） */
export const localeShort: Record<Locale, string> = {
  en: 'EN',
  ja: 'JA',
  fr: 'FR',
};

/** HTML lang 属性値 */
export const localeHtmlLang: Record<Locale, string> = {
  en: 'en',
  ja: 'ja',
  fr: 'fr',
};

/** ロケールが有効か判定 */
export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/**
 * コンテンツのベース名からロケール別ファイル名を生成。
 *   contentFile('home', 'en') → 'home.json'
 *   contentFile('home', 'ja') → 'home.ja.json'
 */
export function contentFile(base: string, lang: Locale): string {
  return lang === defaultLocale ? `${base}.json` : `${base}.${lang}.json`;
}
