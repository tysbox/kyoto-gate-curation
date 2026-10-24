// tina/config.ts
import { defineConfig } from "tinacms";

// tina/fields/global.ts
var globalFields = [
  { type: "string", name: "siteName", label: "Site Name", required: true },
  { type: "string", name: "logoText", label: "Logo Text" },
  { type: "string", name: "logoSubtext", label: "Logo Subtext" },
  { type: "string", name: "tagline", label: "Tagline (\u7E26\u7D44\u307F\u7B49)" },
  {
    type: "object",
    name: "nav",
    label: "Navigation",
    list: true,
    ui: { itemProps: (item) => ({ label: item?.label || "Nav" }) },
    fields: [
      { type: "string", name: "label", label: "Label", required: true },
      { type: "string", name: "href", label: "URL", required: true }
    ]
  },
  {
    type: "object",
    name: "footer",
    label: "Footer",
    fields: [
      { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
      { type: "string", name: "catalystsTitle", label: "Catalysts Title" },
      { type: "string", name: "catalysts", label: "Catalysts", list: true },
      { type: "string", name: "patronageTitle", label: "Patronage Title" },
      { type: "string", name: "patronageBody", label: "Patronage Body", ui: { component: "textarea" } },
      { type: "string", name: "coordinates", label: "Coordinates" },
      { type: "string", name: "rights", label: "Rights" },
      { type: "string", name: "model", label: "Model Line" }
    ]
  }
];

// tina/fields/hero.ts
var heroFields = [
  { type: "string", name: "eyebrow", label: "Eyebrow" },
  { type: "string", name: "title", label: "Title", isTitle: true, required: true },
  { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
  { type: "string", name: "ctaText", label: "CTA Label" },
  { type: "string", name: "ctaHref", label: "CTA URL" },
  { type: "image", name: "image", label: "Hero Image" },
  { type: "string", name: "imageAlt", label: "Image Alt" },
  { type: "string", name: "verticalText", label: "Vertical Text (\u7E26\u7D44\u307F)" },
  { type: "string", name: "obiText", label: "Obi Badge Text" }
];

// tina/fields/textSection.ts
var textSectionFields = [
  { type: "string", name: "eyebrow", label: "Eyebrow" },
  { type: "string", name: "title", label: "Title", required: true },
  { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
  { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
  {
    type: "object",
    name: "metrics",
    label: "Metrics",
    list: true,
    ui: {
      itemProps: (item) => ({ label: item?.label || "Metric" })
    },
    fields: [
      { type: "string", name: "value", label: "Value", required: true },
      { type: "string", name: "unit", label: "Unit" },
      { type: "string", name: "label", label: "Label", required: true },
      { type: "string", name: "note", label: "Note" }
    ]
  }
];

// tina/fields/plate.ts
var plateFields = [
  { type: "string", name: "id", label: "Anchor ID", required: true },
  { type: "string", name: "code", label: "Code (e.g. Plate 01 // ...)" },
  { type: "string", name: "kicker", label: "Kicker" },
  { type: "string", name: "title", label: "Title", required: true },
  { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
  { type: "image", name: "image", label: "Image" },
  { type: "string", name: "imageAlt", label: "Image Alt" },
  { type: "string", name: "badgeTop", label: "Badge (top-right)" },
  { type: "string", name: "badgeBottom", label: "Badge (bottom-left)" },
  {
    type: "object",
    name: "specs",
    label: "Specs",
    list: true,
    ui: { itemProps: (item) => ({ label: item?.label || "Spec" }) },
    fields: [
      { type: "string", name: "label", label: "Label", required: true },
      { type: "string", name: "value", label: "Value", required: true }
    ]
  },
  {
    type: "object",
    name: "cta",
    label: "CTA",
    fields: [
      { type: "string", name: "label", label: "Label" },
      { type: "string", name: "href", label: "URL" }
    ]
  },
  { type: "string", name: "detailSlug", label: "Detail Slug (\u5C06\u6765\u306E\u8A73\u7D30\u8A18\u4E8B)" }
];

// tina/fields/sanctuary.ts
var sanctuaryFields = [
  { type: "string", name: "id", label: "Anchor ID", required: true },
  { type: "string", name: "code", label: "Code (e.g. SANCTUARY 01 // ZEN)" },
  { type: "string", name: "title", label: "Title", required: true },
  { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
  { type: "image", name: "image", label: "Image" },
  { type: "string", name: "imageAlt", label: "Image Alt" },
  { type: "string", name: "badge", label: "Badge" },
  { type: "string", name: "detailSlug", label: "Detail Slug (\u5C06\u6765\u306E\u8A73\u7D30\u8A18\u4E8B)" }
];

// tina/fields/form.ts
var formFields = [
  { type: "string", name: "title", label: "Title" },
  { type: "string", name: "description", label: "Description" },
  {
    type: "object",
    name: "fields",
    label: "Fields",
    list: true,
    ui: { itemProps: (item) => ({ label: item?.label || "Field" }) },
    fields: [
      { type: "string", name: "name", label: "Name (key)", required: true },
      { type: "string", name: "label", label: "Label", required: true },
      { type: "string", name: "placeholder", label: "Placeholder" },
      { type: "boolean", name: "required", label: "Required" },
      {
        type: "string",
        name: "type",
        label: "Type",
        options: ["text", "email", "textarea", "select"]
      }
    ]
  },
  { type: "string", name: "protocolText", label: "Protocol Text", ui: { component: "textarea" } },
  { type: "string", name: "submitLabel", label: "Submit Label" }
];

// tina/config.ts
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Page",
        path: "content/pages",
        format: "json",
        ui: {
          router: ({ document }) => {
            const filename = document._sys.filename;
            const [base, lang] = filename.split(".");
            const prefix = lang ? `/${lang}` : "";
            if (base === "home") return `${prefix}/`;
            return `${prefix}/${base}`;
          }
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          {
            type: "object",
            name: "nav",
            label: "Navigation",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "Nav" }) },
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "URL", required: true }
            ]
          },
          { type: "object", name: "hero", label: "Hero", fields: heroFields },
          { type: "object", name: "manifesto", label: "Manifesto", fields: textSectionFields },
          {
            type: "object",
            name: "plates",
            label: "Plates (\u5DE5\u82B8\u30FB\u98DF)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Plate" }) },
            fields: plateFields
          },
          {
            type: "object",
            name: "sanctuaries",
            label: "Sanctuaries (\u8056\u57DF)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Sanctuary" }) },
            fields: sanctuaryFields
          },
          {
            type: "object",
            name: "accreditation",
            label: "Accreditation",
            fields: [
              ...textSectionFields,
              { type: "object", name: "form", label: "Form", fields: formFields }
            ]
          }
        ]
      },
      {
        name: "global",
        label: "Global",
        path: "content/global",
        format: "json",
        ui: { global: true },
        fields: globalFields
      }
    ]
  }
});
export {
  config_default as default
};
