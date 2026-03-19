// schemas/about.ts
import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  // Singleton — pin in sanity.config.ts structure with documentId: "about-singleton"
  fields: [

    // ── Text ────────────────────────────────────────────────────────────
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "string",
      initialValue: "Our Philosophy",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "headingFirst",
      title: "Heading — First Line",
      type: "string",
      description: "Rendered in white bold. e.g. \"We Don't Just Film.\"",
      initialValue: "We Don't Just Film.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingAccent",
      title: "Heading — Accent Line",
      type: "string",
      description: "Rendered italic and muted below the first line. e.g. \"We Craft Experiences.\"",
      initialValue: "We Craft Experiences.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      description: "Hex code for the eyebrow label. e.g. #C2B280",
      initialValue: "#C2B280",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),

    // ── Body paragraphs ─────────────────────────────────────────────────
    defineField({
      name: "paragraphs",
      title: "Body Paragraphs",
      type: "array",
      description: "Each item becomes its own paragraph. Add or remove paragraphs freely.",
      of: [{ type: "text" }],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),

    // ── Achievements ─────────────────────────────────────────────────────
    defineField({
      name: "achievements",
      title: "Achievements / Stats",
      type: "array",
      description: "Displayed in a grid below the body copy. Recommended: 2–4 items.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: 'The big number or word. e.g. "100+" or "FAA"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'Small caption below the value. e.g. "Projects Delivered"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ── Image ────────────────────────────────────────────────────────────
    defineField({
      name: "image",
      title: "Portrait / Feature Image",
      type: "image",
      options: { hotspot: true },
      description: "Portrait orientation (4:5 ratio) works best.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      initialValue: "Founder Portrait",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: { title: "headingFirst" },
    prepare({ title }) {
      return { title, subtitle: "About section" };
    },
  },
});