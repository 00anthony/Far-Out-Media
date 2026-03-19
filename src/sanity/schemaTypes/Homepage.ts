// schemas/homepage.ts
import { defineField, defineType } from "sanity";

// All available section keys — must match the SECTION_MAP keys in app/page.tsx
const SECTION_OPTIONS = [
  { title: "Featured Work (Portfolio)",   value: "featuredWork" },
  { title: "Services & Packages",         value: "services" },
  { title: "About",                       value: "about" },
  { title: "Benefits / Stats",            value: "benefits" },
  { title: "Process / Workflow",          value: "process" },
  { title: "Testimonials",               value: "testimonials" },
  { title: "Contact",                     value: "contact" },
];

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  // Singleton — pin in sanity.config.ts with documentId: "homepage-singleton"
  fields: [
    defineField({
      name: "sectionOrder",
      title: "Section Order",
      type: "array",
      description:
        "Drag sections to reorder them on the homepage. Toggle visibility with the eye icon. Only sections listed here will render — remove a section to hide it entirely.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "section",
              title: "Section",
              type: "string",
              options: {
                list: SECTION_OPTIONS,
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "visible",
              title: "Visible",
              type: "boolean",
              description: "Uncheck to hide this section without removing it from the order.",
              initialValue: true,
            }),
          ],
          preview: {
            select: { section: "section", visible: "visible" },
            prepare({ section, visible }) {
              const match = SECTION_OPTIONS.find((o) => o.value === section);
              return {
                title: match?.title ?? section,
                subtitle: visible === false ? "Hidden" : "Visible",
              };
            },
          },
        },
      ],
      // Prevent the same section from appearing more than once
      validation: (Rule) =>
        Rule.custom((items: Array<{ section: string }> | undefined) => {
          if (!items) return true;
          const values = items.map((i) => i.section).filter(Boolean);
          const unique = new Set(values);
          if (unique.size !== values.length)
            return "Each section can only appear once.";
          return true;
        }),
    }),
  ],

  preview: {
    prepare() {
      return { title: "Homepage", subtitle: "Section order & visibility" };
    },
  },
});