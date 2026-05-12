import BlogClient from "@/components/BlogClient";
import { fetchSanity } from "@/lib/sanity";

const fallbackPosts = [
  {
    id: "1",
    slug: "celebrating-our-30th-anniversary",
    title: "Celebrating Our 30th Anniversary",
    date: "April 15, 2026",
    author: "The Parish Council",
    category: "News",
    image: "/images/ushers.jpg"
  },
  {
    id: "2",
    slug: "the-importance-of-youth-in-the-church",
    title: "The Importance of Youth in the Church",
    date: "March 28, 2026",
    author: "Youth Ministry",
    category: "Insights",
    image: "/images/youth.jpg"
  },
  {
    id: "3",
    slug: "community-outreach-feeding-the-needy",
    title: "Community Outreach: Feeding the Needy",
    date: "March 10, 2026",
    author: "CSR Committee",
    category: "Mission",
    image: "/images/communion.jpg"
  }
];

export default async function BlogPage() {
  let posts = fallbackPosts;

  try {
    const sanityPosts = await fetchSanity<any[]>(`*[_type == "blog"] | order(date desc) {
      "id": _id,
      title,
      date,
      author,
      category,
      "slug": slug.current,
      "image": image.asset->url
    }`);

    if (sanityPosts) {
      posts = sanityPosts.map((post: any) => ({
        ...post,
        image: post.image ? `${post.image}?w=800&auto=format` : post.image
      }));
    }
  } catch (error) {
    console.error("Failed to fetch blogs from Sanity:", error);
  }

  return <BlogClient posts={posts} />;
}
