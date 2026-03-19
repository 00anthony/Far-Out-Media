import { defineField, defineType } from "sanity";

// schemas/featuredWork.ts
// ─────────────────────────────────────────────────────────────────────────────
// Singleton document that controls the Featured Work section on the home page.
// The projects array is a list of references to workProject documents so you
// can pick and order them without duplicating content.
// ─────────────────────────────────────────────────────────────────────────────
export const featuredWork = defineType({
  name: "featuredWork",
  title: "Featured Work Section",
  type: "document",
  fields: [
    // ── Section text ─────────────────────────────────────────────────────
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "string",
      initialValue: "Selected Works",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Our Portfolio",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      initialValue:
        "A collection of visual experiences tailored to capture the essence of every brand and moment.",
      validation: (Rule) => Rule.required().max(200),
    }),

    // ── Accent color ─────────────────────────────────────────────────────
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      description: "Hex code used for eyebrow, category labels, and CTA. e.g. #C2B280",
      initialValue: "#C2B280",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),

    // ── CTA ──────────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      type: "string",
      initialValue: "Interested?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "Start Your Project",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "CTA URL / Path",
      type: "string",
      initialValue: "/#contact",
      validation: (Rule) => Rule.required(),
    }),

    // ── Projects ─────────────────────────────────────────────────────────
    defineField({
      name: "projects",
      title: "Featured Projects",
      type: "array",
      description:
        "Pick and order the projects to display. Drag to reorder. Recommended: 3 or 6 for a clean grid.",
      of: [
        {
          type: "reference",
          to: [{ type: "workProject" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
  ],

  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title, subtitle: "Featured Work section" };
    },
  },
});