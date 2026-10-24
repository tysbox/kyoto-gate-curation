/** 推薦フォーム */
export const formFields = [
  { type: 'string', name: 'title', label: 'Title' },
  { type: 'string', name: 'description', label: 'Description' },
  {
    type: 'object',
    name: 'fields',
    label: 'Fields',
    list: true,
    ui: { itemProps: (item: any) => ({ label: item?.label || 'Field' }) },
    fields: [
      { type: 'string', name: 'name', label: 'Name (key)', required: true },
      { type: 'string', name: 'label', label: 'Label', required: true },
      { type: 'string', name: 'placeholder', label: 'Placeholder' },
      { type: 'boolean', name: 'required', label: 'Required' },
      {
        type: 'string',
        name: 'type',
        label: 'Type',
        options: ['text', 'email', 'textarea', 'select'],
      },
    ],
  },
  { type: 'string', name: 'protocolText', label: 'Protocol Text', ui: { component: 'textarea' } },
  { type: 'string', name: 'submitLabel', label: 'Submit Label' },
];
