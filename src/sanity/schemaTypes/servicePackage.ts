import { defineField, defineType } from "sanity";

export const servicePackage = defineType({
  name: "servicePackage",
  title: "Service Package",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Package Title",
      type: "string",
      description: 'e.g. "Essentials", "Growth", "Brand Builder"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Video Marketing — Full-Service", value: "video-marketing" },
          { title: "Aerial Marketing — Drone-Only", value: "aerial-marketing" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first within their category.",
    }),
    defineField({
      name: "featured",
      title: "Mark as Most Popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short sentence shown under the title on the services page.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    // ── Pricing ──
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "object",
      fields: [
        defineField({
          name: "startingAt",
          title: "Starting At ($)",
          type: "number",
        }),
        defineField({
          name: "upTo",
          title: "Up To ($)",
          type: "number",
          description: "Leave blank for 'Starting at X' display.",
        }),
        defineField({
          name: "label",
          title: "Custom Price Label",
          type: "string",
          description:
            'Override the generated label, e.g. "Custom — contact for quote".',
        }),
      ],
    }),

    // ── Timeline ──
    defineField({
      name: "timeline",
      title: "Delivery Timeline",
      type: "object",
      fields: [
        defineField({
          name: "minDays",
          title: "Min Days",
          type: "number",
        }),
        defineField({
          name: "maxDays",
          title: "Max Days",
          type: "number",
        }),
        defineField({
          name: "label",
          title: "Custom Label",
          type: "string",
          description: 'e.g. "Priority 3–5 days" — overrides the generated range.',
        }),
      ],
    }),

    // ── Deliverables ──
    defineField({
      name: "deliverables",
      title: "What You Get",
      description: "first 4 points will be listed on home page",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "detail",
              title: "Detail",
              type: "string",
              description: "Optional sub-text, e.g. platform optimisation note.",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "detail" },
          },
        },
      ],
    }),

    // ── Add-ons ──
    defineField({
      name: "addOns",
      title: "Add-Ons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "price",
              title: "Price Label",
              type: "string",
              description: 'e.g. "+$150" or "Included"',
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "price" },
          },
        },
      ],
    }),

    // ── FAQ ──
    defineField({
      name: "faq",
      title: "Frequently Asked Questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
  ],

  orderings: [
    {
      title: "Category then Order",
      name: "categoryOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category",
      featured: "featured",
    },
    prepare({ title, subtitle, featured }) {
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle:
          subtitle === "video-marketing"
            ? "Video Marketing"
            : "Aerial Marketing",
      };
    },
  },
});