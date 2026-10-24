/** サイト全体のコンテンツ型定義 */

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  verticalText: string;
  obiText: string;
}

/** 指標(メトリクス) */
export interface MetricItem {
  value: string;
  unit?: string;
  label: string;
  note: string;
}

/** 汪用セクション(Manifesto / Accreditation など) */
export interface TextSection {
  eyebrow: string;
  title: string;
  quote?: string;
  body: string;
  metrics?: MetricItem[];
}

/** 詳細記事への導線を持つカード */
export interface DetailLink {
  label: string;
  href: string;
}

/** Plate(工芸・食の大きな2段組) */
export interface Plate {
  id: string;
  code: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  /** 画像上の帯注記 */
  badgeTop?: string;
  badgeBottom?: string;
  /** 仕様表 */
  specs?: { label: string; value: string }[];
  cta?: DetailLink;
  /** 詳細記事のスラッグ(将来の /plates/{slug} 用) */
  detailSlug?: string;
}

/** Sanctuary(聖域カード) */
export interface Sanctuary {
  id: string;
  code: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  badge: string;
  detailSlug?: string;
}

/** フォーム項目 */
export interface FormField {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  type: 'text' | 'email' | 'textarea' | 'select';
  options?: string[];
}

export interface FormContent {
  title: string;
  description: string;
  fields: FormField[];
  protocolText: string;
  submitLabel: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface GlobalSettings {
  siteName: string;
  logoText: string;
  logoSubtext: string;
  tagline: string;
  nav: NavItem[];
  footer: {
    description: string;
    catalystsTitle: string;
    catalysts: string[];
    patronageTitle: string;
    patronageBody: string;
    coordinates: string;
    rights: string;
    model: string;
  };
}

export interface SiteData {
  title: string;
  description: string;
  nav: NavItem[];
  hero: HeroContent;
  manifesto: TextSection;
  plates: Plate[];
  sanctuaries: Sanctuary[];
  accreditation: TextSection & { form: FormContent };
}
