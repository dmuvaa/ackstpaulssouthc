import AboutClient from "@/components/AboutClient";
import { fetchSanity } from "@/lib/sanity";

// Fallback data with categories
const fallbackStats = [
  { label: "Active Members", value: "2,000+" },
  { label: "Weekly Services", value: "3" },
  { label: "Community Projects", value: "15+" },
  { label: "Years of Ministry", value: "30+" },
];

const fallbackLeaders = [
  {
    name: "Ven. Canon Charles Chege Kariuki",
    role: "Archdeacon / Vicar",
    bio: "A devoted servant of God who has faithfully served in the Anglican Church since 2000. He is well-grounded in theology and leadership, with a strong commitment to church growth and nurturing believers. Passionate about mentoring, he leads the parish with humility and a vision for spiritual transformation.",
    img: "/images/leadership/ven-canon-charles.jpg",
    category: "clergy"
  },
  {
    name: "Rev. Moses Agwet",
    role: "Curate",
    bio: "Guided by a deep passion for mission and ministry, Rev. Moses joined ACK St. Paul’s in 2025. His journey includes serving as a diocesan evangelist before being ordained as a priest in 2022. He brings a rich experience from various pastoral roles and is committed to fostering a vibrant, faith-filled community.",
    img: "/images/leadership/moses.webp",
    category: "clergy"
  },
  {
    name: "Ben Okuku",
    role: "Lay Reader",
    bio: "Answering God's call in 2004, Ben is a lecturer by profession and a devoted family man who finds great joy in guiding others in their walk of faith. He balances his career and ministry with grace, serving as a spiritual mentor. He encourages others to embrace God’s call with trust and confidence.",
    img: "/images/leadership/ben-okuku.png",
    category: "clergy"
  },
  {
    name: "Edith Murimi",
    role: "Lay Reader",
    bio: "A devoted minister since 2018 with a deep love for sharing God's Word. She balances her career and family life with a commitment to witnessing lives transformed through Christ. Her journey is defined by building meaningful relationships and serving the Kingdom with joy and excellence.",
    img: "/images/leadership/edith-murimi.png",
    category: "clergy"
  },
  {
    name: "David Irungu Gachui",
    role: "Vicar’s Warden",
    bio: "An accomplished executive with over 15 years of experience in the financial sector, David brings strategic leadership and sound governance to the church. Currently serving as a General Manager at KDIC, he uses his expertise in accountability to support the parish's vision and mission.",
    img: "/images/leadership/david.png",
    category: "official"
  },
  {
    name: "Peter Lawi Ojuka",
    role: "People’s Warden",
    bio: "Serving the parish since 2000, Peter carries his role as People's Warden with humility and a deep sense of responsibility toward the congregation. A logistics professional and director, he balances his career with a commitment to growing in God's Word and making a God-honoring impact.",
    img: "/images/leadership/lawi-ojuka.jpg",
    category: "official"
  },
  {
    name: "Jidraff Kamau Githendu",
    role: "PCC Secretary",
    bio: "A Health Systems Management Specialist, Jidraff brings extensive organizational expertise to his role as PCC Secretary. Guided by Colossians 3:23, he approaches every responsibility as service to God, focusing on mentorship and community leadership to raise purposeful individuals.",
    img: "/images/leadership/Jidrraff.png",
    category: "official"
  },
  {
    name: "Martin Muchere",
    role: "Parish Treasurer",
    bio: "With 15 years of experience in property valuation and tax consultancy, Martin ensures transparency and effective financial management within the parish. He is dedicated to high ethical standards and sound stewardship, using his professional gifts to serve the Church with excellence and accountability.",
    img: "/images/leadership/martin.png",
    category: "official"
  },
  {
    name: "Elijah Mwangi",
    role: "Chairman, KAMA",
    bio: "A seasoned Advocate with over 25 years of experience, Elijah integrates legal professionalism with a strong sense of faith. He has served in various leadership capacities, including as a Legal Advisor at parish and diocesan levels, and currently chairs KAMA while serving in the Diocesan Synod.",
    img: "/images/leadership/elijah-mwangi.png",
    category: "chair"
  },
  {
    name: "Jane Mutungi",
    role: "Chairlady, Mothers’ Union",
    bio: "Blending professional project management expertise with spiritual devotion, Jane provides structured leadership to the Mothers' Union. She is passionate about strengthening organizational processes, mentoring others, and fostering a culture grounded in integrity, accountability, and purposeful service.",
    img: "/images/leadership/janemutungi.webp",
    category: "chair"
  },
  {
    name: "Roselyne Daughty Owino",
    role: "Chair, SPYCE",
    bio: "A Microbiology researcher by profession, Roselyne leads the youth ministry with a deep sense of calling. She is passionate about building a vibrant youth church and nurturing the next generation to be firmly rooted in faith, prayer, and community service.",
    img: "/images/leadership/roselyn.webp",
    category: "chair"
  },
  {
    name: "Tr. Ann Dada",
    role: "Chairperson, Sunday School",
    bio: "With over a decade of dedicated service, Ann nurtures the spiritual growth of children with patience, love, and a deep sense of purpose. An avid adventurer and scout, she brings a holistic approach to mentorship, instilling strong Christian values in the next generation.",
    img: "/images/leadership/ann-tr.webp",
    category: "chair"
  },
  {
    name: "Dr. Leah Oyake-Ombis",
    role: "Chairperson, Development",
    bio: "With over 20 years of experience in environmental governance, Dr. Leah brings strategic vision to the church's development projects. A director and technical advisor, she is passionate about sustainability and community transformation, using her expertise to contribute to the growth of the parish.",
    img: "/images/leadership/oyake.webp",
    category: "chair"
  },
  {
    name: "Evans Shivembe",
    role: "Chairperson, Church Choir",
    bio: "A choir member since 2000, Evans leads the choir with humility and a firm belief that music is a divine calling. A supply chain professional, he brings structure to his leadership while fostering unity and musical excellence for wholehearted worship.",
    img: "/images/leadership/evans-chivembe.jpg",
    category: "chair"
  },
  {
    name: "Victoria Wambugu",
    role: "Chair, Media & Marketing",
    bio: "A PR professional and entrepreneur, Victoria supports the church’s communication and outreach efforts with strategic expertise. She is committed to sharing the church’s message in a clear and engaging way, bridging faith and modern media to make a meaningful impact.",
    img: "/images/leadership/vicvic.webp",
    category: "chair"
  }
];

export default async function AboutPage() {
  let stats = fallbackStats;
  let leaders = fallbackLeaders;

  try {
    const sanityStats = await fetchSanity<any[]>(`*[_type == "stat"] | order(order asc) { label, value }`);
    const sanityLeaders = await fetchSanity<any[]>(`*[_type == "leader"] | order(order asc) { name, role, bio, "img": image.asset->url, category }`);

    if (sanityStats && sanityStats.length > 0) {
      stats = sanityStats;
    }
    if (sanityLeaders && sanityLeaders.length > 0) {
      leaders = sanityLeaders;
    }
  } catch (error) {
    console.error("Failed to fetch from Sanity, using fallback data:", error);
  }

  return <AboutClient leaders={leaders} stats={stats} />;
}
