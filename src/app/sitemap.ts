import { MetadataRoute } from "next";
import { fetchSanity } from "@/lib/sanity";

const BASE_URL = "https://ackstpaulssouthc.co.ke";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/donate",
    "/events",
    "/fellowships",
    "/gallery",
    "/legal/privacy",
    "/legal/terms",
    "/ministries",
    "/ministries/choir",
    "/ministries/media",
    "/ministries/men",
    "/ministries/missions",
    "/ministries/ombi",
    "/ministries/praise",
    "/ministries/sunday-school",
    "/ministries/ushers",
    "/ministries/women",
    "/ministries/youth",
    "/resources/succession",
    "/sermons",
    "/services",
    "/shop",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic blog posts
  try {
    const posts = await fetchSanity<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "blog" && defined(slug.current)] { "slug": slug.current, _updatedAt }`
    );

    const blogRoutes = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
  } catch (error) {
    console.error("Failed to fetch blog posts for sitemap:", error);
    return routes;
  }
}
