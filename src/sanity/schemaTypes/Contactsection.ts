// schemas/contactSection.ts
import { defineField, defineType } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact Section",
  type: "document",
  // Singleton — pin in sanity.config.ts with documentId: "contact-section-singleton"
  groups: [
    { name: "text",    title: "Text Content", default: true },
    { name: "form",    title: "Form" },
    { name: "success", title: "Success State" },
  ],
  fields: [

    // ── Text content ─────────────────────────────────────────────────
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "string",
      group: "text",
      initialValue: "Ready to Begin?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingFirst",
      title: "Heading — First Line",
      type: "string",
      group: "text",
      initialValue: "Let's Create",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingAccent",
      title: "Heading — Accent Line",
      type: "string",
      group: "text",
      description: "Rendered as a gradient. e.g. \"Something Far Out.\"",
      initialValue: "Something Far Out.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      group: "text",
      description: "Hex code for eyebrow, underlines, and button fill. e.g. #C2B280",
      initialValue: "#C2B280",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      group: "text",
      rows: 2,
      initialValue: "Tell us about your project. We'll get back within 24 hours with a custom plan—no obligation.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "footerLeft",
      title: "Footer — Left Text",
      type: "string",
      group: "text",
      initialValue: "Serving Charlotte, NC",
    }),
    defineField({
      name: "footerRight",
      title: "Footer — Right Text",
      type: "string",
      group: "text",
      initialValue: "Currently Accepting Projects",
    }),

    // ── Form ─────────────────────────────────────────────────────────
    defineField({
      name: "formFields",
      title: "Form Fields",
      type: "array",
      group: "form",
      description:
        "The text inputs shown in the form. Drag to reorder. Any field you add here automatically appears in the submission email with no code changes needed.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Field Name (internal key)",
              type: "string",
              description:
                'Lowercase, no spaces. This is the key sent to the API. e.g. "phone", "budget". Do NOT change existing field names after launch as it will break submissions.',
              validation: (Rule) =>
                Rule.required().regex(/^[a-z][a-zA-Z0-9]*$/, {
                  name: "camelCase identifier",
                }),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'Shown as the floating label. e.g. "Phone Number"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              title: "Input Type",
              type: "string",
              options: {
                list: [
                  { title: "Text",     value: "text" },
                  { title: "Email",    value: "email" },
                  { title: "Phone",    value: "tel" },
                  { title: "Textarea", value: "textarea" },
                ],
                layout: "radio",
              },
              initialValue: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "required",
              title: "Required?",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "colSpan",
              title: "Width",
              type: "string",
              description: "Half = one column. Full = spans both columns.",
              options: {
                list: [
                  { title: "Half width", value: "half" },
                  { title: "Full width", value: "full" },
                ],
                layout: "radio",
              },
              initialValue: "half",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", type: "type", required: "required" },
            prepare({ title, type, required }) {
              return {
                title,
                subtitle: `${type}${required ? " · required" : ""}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "projectTypes",
      title: "Project Type Pills",
      type: "array",
      group: "form",
      description:
        "The pill buttons below the form fields. Add, remove, or drag to reorder.",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "submitLabel",
      title: "Submit Button Label",
      type: "string",
      group: "form",
      initialValue: "Get a Free Quote",
      validation: (Rule) => Rule.required(),
    }),

    // ── Success state ─────────────────────────────────────────────────
    defineField({
      name: "successHeading",
      title: "Success Heading",
      type: "string",
      group: "success",
      initialValue: "Message Received.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "successBody",
      title: "Success Body",
      type: "text",
      group: "success",
      rows: 2,
      initialValue: "We'll review your project and reach out within 24 hours. Get ready for something far out.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "successFooter",
      title: "Success Footer Line",
      type: "string",
      group: "success",
      initialValue: "Far Out Media · Charlotte, NC",
    }),
  ],

  preview: {
    select: { title: "headingFirst" },
    prepare({ title }) {
      return { title, subtitle: "Contact section" };
    },
  },
});