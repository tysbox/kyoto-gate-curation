import { defineConfig } from 'tinacms';
import { globalFields } from './fields/global';
import { heroFields } from './fields/hero';
import { textSectionFields } from './fields/textSection';
import { plateFields } from './fields/plate';
import { sanctuaryFields } from './fields/sanctuary';
import { formFields } from './fields/form';

/**
 * TinaCMS — ローカル専用構成
 *
 * - clientId / token は未設定(ローカルファイルモード)。
 *   `npm run edit` で tinacms dev が起動し、/admin から編集できる。
 * - 多言語: content/pages/home.json (en) / home.ja.json (ja) / home.fr.json (fr)
 *   を同一コレクションで扱い、ui.router でロケールプレフィックスを解決する。
 */
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'page',
        label: 'Page',
        path: 'content/pages',
        format: 'json',
        ui: {
          router: ({ document }) => {
            // home.json (en) / home.ja.json (ja) / home.fr.json (fr)
            const filename = document._sys.filename;
            const [base, lang] = filename.split('.');
            const prefix = lang ? `/${lang}` : '';
            if (base === 'home') return `${prefix}/`;
            return `${prefix}/${base}`;
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'nav',
            label: 'Navigation',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || 'Nav' }) },
            fields: [
              { type: 'string', name: 'label', label: 'Label', required: true },
              { type: 'string', name: 'href', label: 'URL', required: true },
            ],
          },
          { type: 'object', name: 'hero', label: 'Hero', fields: heroFields as any },
          { type: 'object', name: 'manifesto', label: 'Manifesto', fields: textSectionFields as any },
          {
            type: 'object',
            name: 'plates',
            label: 'Plates (工芸・食)',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || 'Plate' }) },
            fields: plateFields as any,
          },
          {
            type: 'object',
            name: 'sanctuaries',
            label: 'Sanctuaries (聖域)',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || 'Sanctuary' }) },
            fields: sanctuaryFields as any,
          },
          {
            type: 'object',
            name: 'accreditation',
            label: 'Accreditation',
            fields: [
              ...textSectionFields,
              { type: 'object', name: 'form', label: 'Form', fields: formFields as any },
            ],
          },
        ],
      },
      {
        name: 'global',
        label: 'Global',
        path: 'content/global',
        format: 'json',
        ui: { global: true },
        fields: globalFields as any,
      },
    ],
  },
});
