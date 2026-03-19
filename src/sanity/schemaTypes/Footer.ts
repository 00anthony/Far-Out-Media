// schemas/footer.ts
import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  // Singleton — pin in sanity.config.ts with documentId: "footer-singleton"
  groups: [
    { name: "brand",   title: "Brand",   default: true },
    { name: "links",   title: "Links" },
    { name: "legal",   title: "Legal" },
  ],
  fields: [

    // ── Brand ────────────────────────────────────────────────────────
    defineField({
      name: "brandFirst",
      title: "Brand Name — First Part",
      type: "string",
      group: "brand",
      description: 'Rendered in white. e.g. "Far Out"',
      initialValue: "Far Out",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brandAccent",
      title: "Brand Name — Accent Part",
      type: "string",
      group: "brand",
      description: 'Rendered in accent color. e.g. "Media"',
      initialValue: "Media",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      group: "brand",
      description: "Hex code for brand accent, link hovers, and status dot. e.g. #C2B280",
      initialValue: "#C2B280",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      group: "brand",
      rows: 2,
      initialValue: "Premium cinematic videography and storytelling. Elevating brands through intentional motion and drone artistry.",
      validation: (Rule) => Rule.required().max(200),
    }),

    // ── Contact items ─────────────────────────────────────────────────
    defineField({
      name: "contactItems",
      title: "Contact Items",
      type: "array",
      group: "links",
      description: "Each item is a line in the Contact column. Add an href to make it a link (e.g. mailto: or tel:).",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link (optional)",
              type: "string",
              description: 'e.g. "mailto:cam@faroutmediaco.com" or "tel:+17045550000"',
            }),
          ],
          preview: { select: { title: "text", subtitle: "href" } },
        },
      ],
    }),

    // ── Social links ─────────────────────────────────────────────────
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "links",
      description: "Shown in the Follow column. Drag to reorder.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform Name",
              type: "string",
              description: 'e.g. "Instagram", "Vimeo", "TikTok"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "href" } },
        },
      ],
    }),

    // ── Nav links ─────────────────────────────────────────────────────
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      group: "links",
      description: "Shown in the Navigate column.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href",  title: "URL / Path", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),

    // ── Legal ─────────────────────────────────────────────────────────
    defineField({
      name: "legalName",
      title: "Legal Company Name",
      type: "string",
      group: "legal",
      description: 'Used in the copyright line. e.g. "Far Out Media Co."',
      initialValue: "Far Out Media Co.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "privacyHref",
      title: "Privacy Policy URL",
      type: "string",
      group: "legal",
      initialValue: "#",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "termsHref",
      title: "Terms of Service URL",
      type: "string",
      group: "legal",
      initialValue: "#",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: { title: "brandFirst", subtitle: "brandAccent" },
    prepare({ title, subtitle }) {
      return { title: `${title} ${subtitle}`, subtitle: "Footer" };
    },
  },
});