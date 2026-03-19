// app/work/[slug]/page.tsx
import { notFound } from "next/navigation";
import { client } from "@/src/sanity/lib/client";
import ProjectClient from "./Projectclient";

/* ─────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────── */
export interface ProjectData {
  _id: string;
  title: string;
  category: string;
  description: string | null;
  client: string | null;
  projectDate: string | null;
  thumbnail: string;
  thumbnailAlt: string;
  videoEmbedUrl: string | null;
  videoProvider: "vimeo" | "youtube" | null;
  slug: string;
  seoTitle: string | null;
  seoDescription: string | null;
  // Adjacent projects for prev/next navigation
  prevProject: { title: string; slug: string; thumbnail: string } | null;
  nextProject: { title: string; slug: string; thumbnail: string } | null;
}

/* ─────────────────────────────────────────────────────────────────────
   QUERIES
───────────────────────────────────────────────────────────────────── */
const PROJECT_QUERY = `
  *[_type == "workProject" && slug.current == $slug][0] {
    _id,
    title,
    category,
    description,
    client,
    projectDate,
    "thumbnail":    thumbnail.asset->url,
    thumbnailAlt,
    videoEmbedUrl,
    videoProvider,
    "slug":         slug.current,
    seoTitle,
    seoDescription
  }
`;

// Fetch all slugs for static generation + prev/next lookup
const ALL_SLUGS_QUERY = `
  *[_type == "workProject"] | order(_createdAt asc) {
    "slug": slug.current,
    title,
    "thumbnail": thumbnail.asset->url
  }
`;

/* ─────────────────────────────────────────────────────────────────────
   STATIC PARAMS — pre-builds every project page at build time
───────────────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(ALL_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

/* ─────────────────────────────────────────────────────────────────────
   METADATA — dynamic SEO per project
───────────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>; // ← Promise, not plain object
}) {
  const { slug } = await params; // ← await it

  const project: ProjectData | null = await client.fetch(
    PROJECT_QUERY,
    { slug } // ← now slug is the actual string
  );

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.seoTitle ?? `${project.title} — Far Out Media`,
    description:
      project.seoDescription ??
      project.description ??
      `${project.category} by Far Out Media`,
    openGraph: {
      images: [{ url: project.thumbnail }],
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────── */
export const revalidate = 3600;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>; // ← Promise, not plain object
}) {
  const { slug } = await params; // ← await it

  const [project, allProjects] = await Promise.all([
    client.fetch<ProjectData | null>(PROJECT_QUERY, { slug }), // ← slug string
    client.fetch<{ slug: string; title: string; thumbnail: string }[]>(
      ALL_SLUGS_QUERY
    ),
  ]);

  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return <ProjectClient project={{ ...project, prevProject, nextProject }} />;
}