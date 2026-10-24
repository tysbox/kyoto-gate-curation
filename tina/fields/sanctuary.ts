/** Sanctuary(聖域カード) */
export const sanctuaryFields = [
  { type: 'string', name: 'id', label: 'Anchor ID', required: true },
  { type: 'string', name: 'code', label: 'Code (e.g. SANCTUARY 01 // ZEN)' },
  { type: 'string', name: 'title', label: 'Title', required: true },
  { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
  { type: 'image', name: 'image', label: 'Image' },
  { type: 'string', name: 'imageAlt', label: 'Image Alt' },
  { type: 'string', name: 'badge', label: 'Badge' },
  { type: 'string', name: 'detailSlug', label: 'Detail Slug (将来の詳細記事)' },
];
