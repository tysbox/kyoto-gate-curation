/** ヒーローセクション */
export const heroFields = [
  { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
  { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
  { type: 'string', name: 'subtitle', label: 'Subtitle', ui: { component: 'textarea' } },
  { type: 'string', name: 'ctaText', label: 'CTA Label' },
  { type: 'string', name: 'ctaHref', label: 'CTA URL' },
  { type: 'image', name: 'image', label: 'Hero Image' },
  { type: 'string', name: 'imageAlt', label: 'Image Alt' },
  { type: 'string', name: 'verticalText', label: 'Vertical Text (縦組み)' },
  { type: 'string', name: 'obiText', label: 'Obi Badge Text' },
];
