// schemas/hero.ts
import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  // Singleton — only one hero document should ever exist.
  // Pin it in sanity.config.ts structure (see integration notes in Hero.tsx).
  fields: [

    // ── Text content ────────────────────────────────────────────────────
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      description: 'Small label above the heading. e.g. "Charlotte based cinematic studio"',
      initialValue: "Charlotte based cinematic studio",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "headingFirst",
      title: "Heading — First Line",
      type: "string",
      description: 'Rendered in white. e.g. "Stories"',
      initialValue: "Stories",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingAccent",
      title: "Heading — Accent Line",
      type: "string",
      description: 'Rendered as a gradient. e.g. "That Move."',
      initialValue: "That Move.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
      initialValue:
        "Cinematic films crafted to elevate brands, capture moments, and create lasting impact through intentional storytelling and elite drone artistry.",
      validation: (Rule) => Rule.required().max(300),
    }),

    // ── Colors ──────────────────────────────────────────────────────────
    defineField({
      name: "primaryAccentColor",
      title: "Primary Accent Color",
      type: "string",
      description: "Hex code — used for the eyebrow text and primary button background. e.g. #C2B280",
      initialValue: "#C2B280",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),
    defineField({
      name: "accentColorFrom",
      title: "Heading Gradient — Start Color",
      type: "string",
      description: "Left/start hex of the accent heading gradient. e.g. #ffffff",
      initialValue: "#ffffff",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),
    defineField({
      name: "accentColorTo",
      title: "Heading Gradient — End Color",
      type: "string",
      description: "Right/end hex of the accent heading gradient. e.g. #6b7280",
      initialValue: "#6b7280",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),

    // ── Buttons ─────────────────────────────────────────────────────────
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      description: "Up to 3 buttons. First is typically primary, second outline.",
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
              description: 'Internal: "/#work" or "/services". External: "https://..."',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "style",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Primary (filled)", value: "primary" },
                  { title: "Outline (bordered)", value: "outline" },
                ],
                layout: "radio",
              },
              initialValue: "primary",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "style" },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),

    // ── Media ────────────────────────────────────────────────────────────
    defineField({
      name: "videoMp4",
      title: "Background Video — MP4 (required)",
      type: "file",
      description:
        "H.264-encoded MP4. This is the primary video file — required for iOS compatibility.",
      options: { accept: "video/mp4" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoWebm",
      title: "Background Video — WebM (optional)",
      type: "file",
      description:
        "Smaller file size for Android/desktop. iOS ignores it and uses the MP4 above.",
      options: { accept: "video/webm" },
    }),
    defineField({
      name: "poster",
      title: "Poster / Fallback Image",
      type: "image",
      description:
        "Shown while the video loads and as a permanent fallback on iOS low power mode.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoOpacity",
      title: "Video Opacity (%)",
      type: "number",
      description: "0 = invisible, 100 = fully opaque. Default: 60",
      initialValue: 60,
      validation: (Rule) => Rule.required().min(0).max(100).integer(),
    }),
  ],

  preview: {
    select: { title: "headingFirst", subtitle: "headingAccent" },
    prepare({ title, subtitle }) {
      return { title: `${title} ${subtitle}`, subtitle: "Hero section" };
    },
  },
});