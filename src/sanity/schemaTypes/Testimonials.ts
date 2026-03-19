// schemas/testimonials.ts
import { defineField, defineType } from "sanity";

export const testimonials = defineType({
  name: "testimonials",
  title: "Testimonials Section",
  type: "document",
  // Singleton — pin in sanity.config.ts with documentId: "testimonials-singleton"
  fields: [

    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "string",
      initialValue: "Client Stories",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      description: "Hex code for the eyebrow, quote marks, and avatar borders. e.g. #C2B280",
      initialValue: "#C2B280",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      description:
        "Each item becomes one card. Displays as a 3-column grid on desktop. Drag to reorder. Recommended: multiples of 3 for clean rows.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 3,
              description: "Do not include quotation marks — they are added automatically.",
              validation: (Rule) => Rule.required().max(300),
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description: 'e.g. "Jameson Reed"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title / Company",
              type: "string",
              description: 'e.g. "CEO, Altitude Outdoor"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "initials",
              title: "Initials",
              type: "string",
              description: 'Shown in the avatar circle. e.g. "JR". 2–3 characters.',
              validation: (Rule) => Rule.required().max(3),
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "title" },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(9),
    }),
  ],

  preview: {
    select: { title: "eyebrow" },
    prepare({ title }) {
      return { title, subtitle: "Testimonials section" };
    },
  },
});