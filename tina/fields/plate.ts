/** Plate(工芸・食の2段組) */
export const plateFields = [
  { type: 'string', name: 'id', label: 'Anchor ID', required: true },
  { type: 'string', name: 'code', label: 'Code (e.g. Plate 01 // ...)' },
  { type: 'string', name: 'kicker', label: 'Kicker' },
  { type: 'string', name: 'title', label: 'Title', required: true },
  { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
  { type: 'image', name: 'image', label: 'Image' },
  { type: 'string', name: 'imageAlt', label: 'Image Alt' },
  { type: 'string', name: 'badgeTop', label: 'Badge (top-right)' },
  { type: 'string', name: 'badgeBottom', label: 'Badge (bottom-left)' },
  {
    type: 'object',
    name: 'specs',
    label: 'Specs',
    list: true,
    ui: { itemProps: (item: any) => ({ label: item?.label || 'Spec' }) },
    fields: [
      { type: 'string', name: 'label', label: 'Label', required: true },
      { type: 'string', name: 'value', label: 'Value', required: true },
    ],
  },
  {
    type: 'object',
    name: 'cta',
    label: 'CTA',
    fields: [
      { type: 'string', name: 'label', label: 'Label' },
      { type: 'string', name: 'href', label: 'URL' },
    ],
  },
  { type: 'string', name: 'detailSlug', label: 'Detail Slug (将来の詳細記事)' },
];
