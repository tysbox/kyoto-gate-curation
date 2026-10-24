/** グローバル設定 */
export const globalFields = [
  { type: 'string', name: 'siteName', label: 'Site Name', required: true },
  { type: 'string', name: 'logoText', label: 'Logo Text' },
  { type: 'string', name: 'logoSubtext', label: 'Logo Subtext' },
  { type: 'string', name: 'tagline', label: 'Tagline (縦組み等)' },
  {
    type: 'object',
    name: 'nav',
    label: 'Navigation',
    list: true,
    ui: { itemProps: (item: any) => ({ label: item?.label || 'Nav' }) },
    fields: [
      { type: 'string', name: 'label', label: 'Label', required: true },
      { type: 'string', name: 'href', label: 'URL', required: true },
    ],
  },
  {
    type: 'object',
    name: 'footer',
    label: 'Footer',
    fields: [
      { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
      { type: 'string', name: 'catalystsTitle', label: 'Catalysts Title' },
      { type: 'string', name: 'catalysts', label: 'Catalysts', list: true },
      { type: 'string', name: 'patronageTitle', label: 'Patronage Title' },
      { type: 'string', name: 'patronageBody', label: 'Patronage Body', ui: { component: 'textarea' } },
      { type: 'string', name: 'coordinates', label: 'Coordinates' },
      { type: 'string', name: 'rights', label: 'Rights' },
      { type: 'string', name: 'model', label: 'Model Line' },
    ],
  },
];
