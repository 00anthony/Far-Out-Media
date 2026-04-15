// schemas/workProject.ts
import { defineField, defineType } from "sanity";

export const workProject = defineType({
  name: "workProject",
  title: "Work Project",
  type: "document",
  groups: [
    { name: "content",  title: "Content",  default: true },
    { name: "media",    title: "Media" },
    { name: "meta",     title: "Meta / SEO" },
  ],
  fields: [

    // ── Identity ──────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: 'e.g. "Desert Nights"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: 'Click "Generate" — this becomes the URL: /work/desert-nights',
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      description: 'e.g. "Cinematic Narrative", "Drone Landscape", "Wedding Film"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Project Description",
      type: "text",
      group: "content",
      rows: 3,
      description: "Shown on the project detail page.",
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
      group: "content",
      description: "Optional — shown as a credit on the project page.",
    }),
    defineField({
      name: "projectDate",
      title: "Project Date",
      type: "date",
      group: "content",
      options: { dateFormat: "MMMM YYYY" },
    }),

    // ── Media ─────────────────────────────────────────────────────────
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      description: "Portrait orientation (3:4 ratio). Shown on the grid card.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnailAlt",
      title: "Thumbnail Alt Text",
      type: "string",
      group: "media",
      validation: (Rule) => Rule.required(),
    }),

    // Short silent looping clip — plays on card hover.
    defineField({
      name: "previewVideoMp4",
      title: "Hover Preview Clip — MP4",
      type: "file",
      group: "media",
      options: { accept: "video/mp4" },
      description:
        "5–10 sec silent loop shown on card hover. Keep under 3MB — compress heavily in Handbrake or similar.",
    }),
    defineField({
      name: "previewVideoWebm",
      title: "Hover Preview Clip — WebM (optional)",
      type: "file",
      group: "media",
      options: { accept: "video/webm" },
      description: "Smaller file for desktop/Android. iOS falls back to MP4.",
    }),

    // ── Video source (choose ONE of the two approaches below) ─────────
    //
    // Option A — Embed URL (Vimeo / YouTube)
    // Use this for finished films already hosted on a video platform.
    // No storage cost, best quality, supports captions/chapters.
    defineField({
      name: "videoEmbedUrl",
      title: "Full Video Embed URL  (Option A — Vimeo / YouTube)",
      type: "url",
      group: "media",
      description:
        'Vimeo or YouTube embed URL. e.g. "https://player.vimeo.com/video/123456789" or "https://www.youtube.com/embed/abc123". Leave blank if uploading the file directly below.',
    }),

    // Option B — Self-hosted file upload
    // Upload the MP4 directly to Sanity's asset CDN.
    // Good for private / unlisted films, or when a platform account isn't needed.
    // ⚠️  Large files will count against your Sanity asset quota — compress before uploading.
    defineField({
      name: "videoFile",
      title: "Full Video File  (Option B — upload from computer)",
      type: "file",
      group: "media",
      options: { accept: "video/mp4,video/webm,video/ogg" },
      description:
        "Upload an MP4/WebM directly. Used when no embed URL is set. Compress to <500MB before uploading.",
    }),

    defineField({
      name: "videoProvider",
      title: "Video Provider",
      type: "string",
      group: "media",
      description:
        'Set to "Self-hosted" when using the file upload above, or the matching platform for an embed URL.',
      options: {
        list: [
          { title: "Vimeo",       value: "vimeo" },
          { title: "YouTube",     value: "youtube" },
          { title: "Self-hosted", value: "self-hosted" },
        ],
        layout: "radio",
      },
    }),

    // ── Meta ─────────────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "meta",
      description: "Defaults to the project title if left blank.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: "meta",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
  ],

  preview: {
    select: {
      title:    "title",
      subtitle: "category",
      media:    "thumbnail",
    },
  },
});