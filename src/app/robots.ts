import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/studio"],
    },
    sitemap: "https://ackstpaulssouthc.co.ke/sitemap.xml",
  };
}
