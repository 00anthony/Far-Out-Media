// schemas/benefits.ts
import { defineField, defineType } from "sanity";

export const benefits = defineType({
  name: "benefits",
  title: "Benefits Section",
  type: "document",
  // Singleton — pin in sanity.config.ts with documentId: "benefits-singleton"
  fields: [

    // ── Section text ─────────────────────────────────────────────────
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "string",
      initialValue: "Impact & Results",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "headingFirst",
      title: "Heading — First Line",
      type: "string",
      description: 'Rendered in white. e.g. "Video Isn\'t Optional."',
      initialValue: "Video Isn't Optional.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingAccent",
      title: "Heading — Accent Line",
      type: "string",
      description: 'Rendered in muted gray. e.g. "It\'s Your Competitive Edge."',
      initialValue: "It's Your Competitive Edge.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      description: "Hex code used for the eyebrow and stat values. e.g. #C2B280",
      initialValue: "#C2B280",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),

    // ── Benefit stats ─────────────────────────────────────────────────
    defineField({
      name: "benefits",
      title: "Benefits / Stats",
      type: "array",
      description:
        "Each item is a stat card. Drag to reorder — they fill the grid left-to-right, top-to-bottom. Even numbers (2, 4, 6...) produce the cleanest grid.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Stat Value",
              type: "string",
              description: 'The large display number or word. e.g. "540%", "91%", "24h"',
              validation: (Rule) => Rule.required().max(10),
            }),
            defineField({
              name: "body",
              title: "Description",
              type: "text",
              rows: 2,
              description: "The explanatory sentence shown below the stat.",
              validation: (Rule) => Rule.required().max(160),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "body" },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),

    // ── Callout box ───────────────────────────────────────────────────
    defineField({
      name: "calloutHeading",
      title: "Callout Heading",
      type: "string",
      description: "Bold line inside the bottom callout box.",
      initialValue: "Anyone can shoot video. The difference is intent.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "calloutQuote",
      title: "Callout Quote",
      type: "text",
      rows: 2,
      description: "Italic quote inside the callout box. Quotation marks are added automatically.",
      initialValue:
        "Far Out Media doesn't just deliver footage; they deliver visual assets that tell a strategic story.",
      validation: (Rule) => Rule.required().max(300),
    }),
  ],

  preview: {
    select: { title: "headingFirst" },
    prepare({ title }) {
      return { title, subtitle: "Benefits section" };
    },
  },
});