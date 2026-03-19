// schemas/process.ts
import { defineField, defineType } from "sanity";

export const process = defineType({
  name: "process",
  title: "Process Section",
  type: "document",
  // Singleton — pin in sanity.config.ts with documentId: "process-singleton"
  fields: [

    // ── Section text ─────────────────────────────────────────────────
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "string",
      initialValue: "How We Work",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Our Workflow",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
      description: "Short label shown to the right of the heading. e.g. \"From concept to screen\"",
      initialValue: "From concept to screen",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      description: "Hex code used for step indicators and eyebrow. e.g. #C2B280",
      initialValue: "#C2B280",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),

    // ── Steps ─────────────────────────────────────────────────────────
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      description:
        "Each step is a card. Drag to reorder — the display order matches the array order. The step number (01, 02...) is set manually so you control the label independently of position.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Step Number",
              type: "string",
              description: 'Display label only — does not affect order. e.g. "01", "02"',
              validation: (Rule) => Rule.required().max(4),
            }),
            defineField({
              name: "title",
              title: "Step Title",
              type: "string",
              description: 'e.g. "Discover", "Create", "Capture", "Deliver"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "desc",
              title: "Description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required().max(200),
            }),
          ],
          preview: {
            select: { title: "id", subtitle: "title" },
            prepare({ title, subtitle }) {
              return { title: `${title} — ${subtitle}` };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
  ],

  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title, subtitle: "Process section" };
    },
  },
});