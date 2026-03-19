// schemas/navbar.ts
import { defineField, defineType } from "sanity";

export const navbar = defineType({
  name: "navbar",
  title: "Navbar",
  type: "document",
  // Treat this as a singleton — only one navbar document should ever exist.
  // Enforce this in sanity.config.ts (see integration notes below).
  fields: [
    // ── Branding ──────────────────────────────────────────────────────
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "image",
      options: { hotspot: true },
      description: "Displayed at 32×32px. Square images work best.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      type: "string",
      initialValue: "Logo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brandFirst",
      title: "Brand Name — First Part",
      type: "string",
      description: 'Displayed in white. e.g. "Far Out"',
      initialValue: "Far Out",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brandAccent",
      title: "Brand Name — Accent Part",
      type: "string",
      description: "Displayed in the accent color. e.g. \"Media\"",
      initialValue: "Media",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      description: "Hex code used for the brand accent and CTA hover. e.g. #C2B280",
      initialValue: "#C2B280",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, {
          name: "hex color",
          invert: false,
        }),
    }),

    // ── Navigation links ───────────────────────────────────────────────
    defineField({
      name: "links",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL / Path",
              type: "string",
              description: 'Internal: "/services" or "/#work". External: "https://..."',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),

    // ── CTA button ─────────────────────────────────────────────────────
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "Get a Quote",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button URL / Path",
      type: "string",
      initialValue: "/#contact",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: { title: "brandFirst", subtitle: "brandAccent" },
    prepare({ title, subtitle }) {
      return { title: `${title} ${subtitle}`, subtitle: "Navbar settings" };
    },
  },
});