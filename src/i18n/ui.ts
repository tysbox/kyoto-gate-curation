/**
 * UI 文言辞書
 *
 * コンポーネント内のハードコード文言をここに集約する。
 * コンテンツ JSON に含まれない「画面の部品」の文言用。
 * 未定義のキーは defaultLocale (en) にフォールバックする。
 */

import { defaultLocale, type Locale } from './config';

export interface UIStrings {
  cta: string;
  menuLabel: string;
  languageLabel: string;
  form: {
    submit: string;
    submitting: string;
    success: string;
    successDetail: string;
    reset: string;
    required: string;
    protocolAccept: string;
  };
  footerTagline: string;
  footerCatalysts: string;
  footerPatronage: string;
  footerPatronageBody: string;
  footerRights: string;
  footerModel: string;
  coordinates: string;
  section: {
    manifestoEyebrow: string;
    manifestoTitle: string;
    ateliersEyebrow: string;
    ateliersTitle: string;
    gastronomyEyebrow: string;
    gastronomyTitle: string;
    sanctuariesEyebrow: string;
    sanctuariesTitle: string;
    accreditationEyebrow: string;
    accreditationTitle: string;
  };
  metrics: {
    inscriptionsLabel: string;
    inscriptionsNote: string;
    returnLabel: string;
    returnNote: string;
    intakeLabel: string;
    intakeNote: string;
  };
  readMore: string;
  watermark: string;
}

const en: UIStrings = {
  cta: 'Diagnostic Intake',
  menuLabel: 'Menu',
  languageLabel: 'Language',
  form: {
    submit: 'Transmit Epistolary Nomination',
    submitting: 'Sealing…',
    success: 'Nomination Sealed & Received',
    successDetail:
      '受任審査を開始いたします。京都ネイティブのヴェテラン伴走者より、ご指定の秘書デスクまたはコンフィデンシャル窓口へ48時間以内に「実存診立て（Diagnostic Intake）」の日程調整をご案内申し上げます。',
    reset: 'Draft Another Nomination',
    required: 'required',
    protocolAccept:
      'I accept the Protocol of Stillness: 成果や評価の一切を問わない絶対的安全圏の維持、デジタル機器の完全遮断、および文化財・当主の尊厳に対する不干渉。',
  },
  footerTagline:
    '現代リーダーの心理的Threshold（防衛の鎧）を融解し、何のアプリも入っていない素の盤面（Root Slate）へと導くD2Cキュレーション事業。',
  footerCatalysts: 'Four Core Catalysts',
  footerPatronage: 'Direct Cultural Patronage',
  footerPatronageBody:
    '旅行会社の30〜50%中抜きを完全排除。全額が文化財修復と職人継承資金へ直接還流される透明なエコシステム。',
  footerRights: '© 2026 KYOTO GATEWAY. STRICTLY PRIVATE CLIENT & PARTNER MONOGRAPH.',
  footerModel: 'DIRECT-TO-CONSUMER BESPOKE CURATION & PSYCHOLOGICAL DECOUPLING',
  coordinates: '35°00′42″N 135°46′05″E // HIGASHIYAMA REGION',
  section: {
    manifestoEyebrow: 'The Core Thesis',
    manifestoTitle: 'Accepting Fracture: The Alchemy of Wabi-Sabi',
    ateliersEyebrow: 'Living Ateliers',
    ateliersTitle: 'The Living Masters',
    gastronomyEyebrow: 'Gastronomy',
    gastronomyTitle: 'Shunting the Critical Mind',
    sanctuariesEyebrow: 'Sanctuary Register // Cloistered Enclaves',
    sanctuariesTitle: 'The Architecture of Stillness (禅・数寄)',
    accreditationEyebrow: 'Patron Registry',
    accreditationTitle: 'The Patron Registry — Diagnostic Intake',
  },
  metrics: {
    inscriptionsLabel: 'Annual Inscriptions',
    inscriptionsNote: '年間12組厳格限定',
    returnLabel: 'Direct Cultural Return',
    returnNote: '中間搾取ゼロ・全額直納',
    intakeLabel: 'Diagnostic Intake',
    intakeNote: '伴走者との事前診立て',
  },
  readMore: 'Read the Full Account',
  watermark: 'presentation sample',
};

const ja: UIStrings = {
  cta: '事前診立て',
  menuLabel: 'メニュー',
  languageLabel: '言語',
  form: {
    submit: '推薦状を送信する',
    submitting: '送信中…',
    success: '推薦を受け付けました',
    successDetail:
      '受任審査を開始いたします。京都ネイティブのヴェテラン伴走者より、ご指定の秘書デスクまたはコンフィデンシャル窓口へ48時間以内に「実存診立て（Diagnostic Intake）」の日程調整をご案内申し上げます。',
    reset: '別の推薦を記入する',
    required: '必須',
    protocolAccept:
      '静寂のプロトコルに同意します：成果や評価の一切を問わない絶対的安全圏の維持、デジタル機器の完全遮断、および文化財・当主の尊厳に対する不干渉。',
  },
  footerTagline:
    '現代リーダーの心理的Threshold（防衛の鎧）を融解し、何のアプリも入っていない素の盤面（Root Slate）へと導くD2Cキュレーション事業。',
  footerCatalysts: '四つの核心触媒',
  footerPatronage: '直接文化パトロネージ',
  footerPatronageBody:
    '旅行会社の30〜50%中抜きを完全排除。全額が文化財修復と職人継承資金へ直接還流される透明なエコシステム。',
  footerRights: '© 2026 KYOTO GATEWAY. プライベートクライアントおよびパートナー限定資料。',
  footerModel: 'D2Cビスポークキュレーション & 心理的デカップリング',
  coordinates: '北緯35°00′42″ 東経135°46′05″ // 東山地域',
  section: {
    manifestoEyebrow: '核心命題',
    manifestoTitle: '不全の受容：侘び寂びの錬金術',
    ateliersEyebrow: '生ける工房',
    ateliersTitle: '生きる名工たち',
    gastronomyEyebrow: '食',
    gastronomyTitle: '批評する心を逸らす：八重の旨味',
    sanctuariesEyebrow: '聖域登録 // 隠遁の enclosure',
    sanctuariesTitle: '静寂の建築（禅・数寄）',
    accreditationEyebrow: 'パトロン登録',
    accreditationTitle: 'パトロン登録 — 事前診立て',
  },
  metrics: {
    inscriptionsLabel: '年間受入組数',
    inscriptionsNote: '年間12組厳格限定',
    returnLabel: '直接文化還元率',
    returnNote: '中間搾取ゼロ・全額直納',
    intakeLabel: '事前診立て',
    intakeNote: '伴走者との事前診立て',
  },
  readMore: '詳細記事を読む',
  watermark: 'presentation sample',
};

const fr: UIStrings = {
  cta: 'Diagnostic initial',
  menuLabel: 'Menu',
  languageLabel: 'Langue',
  form: {
    submit: 'Transmettre la nomination',
    submitting: 'Scellement…',
    success: 'Nomination scellée et reçue',
    successDetail:
      'L’examen de recevabilité débutera. Un accompagnateur vétéran natif de Kyoto vous proposera, sous 48 heures, un créneau pour le « Diagnostic Intake » via votre secrétariat ou votre canal confidentiel.',
    reset: 'Rédiger une autre nomination',
    required: 'requis',
    protocolAccept:
      'J’accepte le Protocole du Silence : maintien d’une zone de sécurité absolue sans exigence de résultat, coupure numérique totale, et non-ingérence envers le patrimoine et les maîtres des lieux.',
  },
  footerTagline:
    'Une curation D2C qui fait fondre le seuil psychologique des dirigeants modernes — leur armure défensive — pour les guider vers une ardoise vierge, sans aucune application.',
  footerCatalysts: 'Quatre catalyseurs fondamentaux',
  footerPatronage: 'Mécénat culturel direct',
  footerPatronageBody:
    'Élimination totale des prélèvements de 30 à 50 % des agences. L’intégralité revient directement à la restauration du patrimoine et à la transmission des artisans.',
  footerRights: '© 2026 KYOTO GATEWAY. MONOGRAPHE RÉSERVÉ AUX CLIENTS ET PARTENAIRES PRIVÉS.',
  footerModel: 'CURATION BESPOKE D2C & DÉCOUPLAGE PSYCHOLOGIQUE',
  coordinates: '35°00′42″N 135°46′05″E // RÉGION DE HIGASHIYAMA',
  section: {
    manifestoEyebrow: 'Thèse centrale',
    manifestoTitle: 'Accepter la fracture : l’alchimie du wabi-sabi',
    ateliersEyebrow: 'Ateliers vivants',
    ateliersTitle: 'Les maîtres vivants',
    gastronomyEyebrow: 'Gastronomie',
    gastronomyTitle: 'Mettre l’esprit critique en veille : l’expansion umami octuple',
    sanctuariesEyebrow: 'Registre des sanctuaires // Enclos retirés',
    sanctuariesTitle: 'L’architecture du silence (禅・数寄)',
    accreditationEyebrow: 'Registre des mécènes',
    accreditationTitle: 'Registre des mécènes — Diagnostic initial',
  },
  metrics: {
    inscriptionsLabel: 'Inscriptions annuelles',
    inscriptionsNote: '12 couples par an, strictement',
    returnLabel: 'Retour culturel direct',
    returnNote: 'Zéro prélèvement intermédiaire · versement intégral',
    intakeLabel: 'Diagnostic initial',
    intakeNote: 'Entretien préalable avec l’accompagnateur',
  },
  readMore: 'Lire le récit complet',
  watermark: 'presentation sample',
};

const dictionaries: Partial<Record<Locale, UIStrings>> = { en, ja, fr };

/** ロケールの UI 文言を取得(未定義は en にフォールバック) */
export function getUI(lang: Locale): UIStrings {
  return dictionaries[lang] ?? dictionaries[defaultLocale] ?? en;
}
