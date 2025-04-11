import { MetadataRoute } from "next";

// Define supported locales
const locales = ["en-US", "fr-FR"];
const baseUrl = "https://biotecuniverse.org";

// Helper function to fetch data with error handling
async function fetchData(endpoint: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

// Helper function to escape special XML characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    "",
    "/home",
    "/privacy-policy",
    "/about",
    "/news-&-insights",
    "/whitepapers",
    "/projects",
    "/ongoing-projects",
    "/portfolio",
    "/upcoming-projects",
    "/events",
    "/upcoming-events",
    "/past-events",
    "/calendar-of-activities",
    "/exhibitions-&-sponsorships",
    "/membership-benefits",
    "/membership-faqs",
    "/membership-qualifications",
    "/membership-tiers",
    "/services",
    "/contact",
    "/donate",
    "/faqs",
    "/members",
  ].flatMap((path) =>
    locales.map((locale) => ({
      url: escapeXml(`${baseUrl}/${locale}${path}`),
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.8,
    }))
  );

  // Fetch dynamic data
  const [blogs, projects, events, services, members] = await Promise.all([
    fetchData("/blog/posts"),
    fetchData("/projects"),
    fetchData("/events"),
    fetchData("/services"),
    fetchData("/auth/members"),
  ]);

  // Dynamic blog routes
  const blogRoutes = blogs.flatMap(
    (blog: { _id: string; updatedAt?: string }) =>
      locales.map((locale) => ({
        url: escapeXml(`${baseUrl}/${locale}/post/${blog._id}`),
        lastModified: blog.updatedAt || currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  // Dynamic project routes
  const projectRoutes = projects.flatMap(
    (project: { _id: string; updatedAt?: string }) =>
      locales.map((locale) => ({
        url: escapeXml(`${baseUrl}/${locale}/projects/${project._id}`),
        lastModified: project.updatedAt || currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  // Dynamic event routes
  const eventRoutes = events.flatMap(
    (event: { _id: string; updatedAt?: string }) =>
      locales.map((locale) => ({
        url: escapeXml(`${baseUrl}/${locale}/events/${event._id}`),
        lastModified: event.updatedAt || currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  // Dynamic service routes
  const serviceRoutes = services.flatMap(
    (service: { _id: string; updatedAt?: string }) =>
      locales.map((locale) => ({
        url: escapeXml(`${baseUrl}/${locale}/service/${service._id}`),
        lastModified: service.updatedAt || currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  // Dynamic member routes
  const memberRoutes = members.flatMap(
    (member: { _id: string; updatedAt?: string }) =>
      locales.map((locale) => ({
        url: escapeXml(`${baseUrl}/${locale}/members/${member._id}`),
        lastModified: member.updatedAt || currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  // Combine all routes
  return [
    ...staticPages,
    ...blogRoutes,
    ...projectRoutes,
    ...eventRoutes,
    ...serviceRoutes,
    ...memberRoutes,
  ];
}
