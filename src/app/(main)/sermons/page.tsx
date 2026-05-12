import { fetchSanity } from "@/lib/sanity";
import SermonsClient from "@/components/SermonsClient";

const fallbackSermons = [
  {
    title: "Walking in Divine Purpose",
    preacher: "The Ven. Vicar",
    date: "May 3, 2026",
    type: "Video",
    description: "Discover how to align your life with God's ultimate plan for you.",
    duration: "45 mins"
  },
  {
    title: "The Power of Forgiveness",
    preacher: "Rev. Assistant",
    date: "April 26, 2026",
    type: "Audio",
    description: "A deep exploration of how forgiveness sets the believer free.",
    duration: "38 mins"
  },
  {
    title: "Youth: Salt and Light",
    preacher: "Lay Reader",
    date: "April 19, 2026",
    type: "Video",
    description: "Encouraging the youth to be bold in their faith within their spheres of influence.",
    duration: "52 mins"
  }
];

export default async function SermonsPage() {
  let sermons = fallbackSermons;

  try {
    const sanitySermons = await fetchSanity<any[]>(`*[_type == "sermon"] | order(date desc) {
      title,
      "preacher": preacher->name,
      date,
      type,
      description,
      duration,
      "image": image.asset->url,
      youtubeUrl,
      notes
    }`);

    if (sanitySermons && sanitySermons.length > 0) {
      sermons = sanitySermons;
    }
  } catch (error) {
    console.error("Failed to fetch sermons from Sanity:", error);
  }

  return <SermonsClient sermons={sermons} />;
}
