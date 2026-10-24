/** テキスト主体セクション(Manifesto / Accreditation) */
export const textSectionFields = [
  { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
  { type: 'string', name: 'title', label: 'Title', required: true },
  { type: 'string', name: 'quote', label: 'Quote', ui: { component: 'textarea' } },
  { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
  {
    type: 'object',
    name: 'metrics',
    label: 'Metrics',
    list: true,
    ui: {
      itemProps: (item: any) => ({ label: item?.label || 'Metric' }),
    },
    fields: [
      { type: 'string', name: 'value', label: 'Value', required: true },
      { type: 'string', name: 'unit', label: 'Unit' },
      { type: 'string', name: 'label', label: 'Label', required: true },
      { type: 'string', name: 'note', label: 'Note' },
    ],
  },
];
