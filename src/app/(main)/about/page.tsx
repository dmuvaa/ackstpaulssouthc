"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, History, Target, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Active Members", value: "2,000+" },
  { label: "Weekly Services", value: "3" },
  { label: "Community Projects", value: "15+" },
  { label: "Years of Ministry", value: "30+" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Top Section - About Us */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Who We Are */}
            <div className="space-y-4 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-bold uppercase tracking-widest text-sm text-secondary">Who We Are</span>
              <h1 className="text-3xl font-black text-primary">Anglican Church of Kenya St. Paul’s South C</h1>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  The Anglican Church of Christ is a faith-based organization deeply rooted in the Christian tradition. We are part of the Anglican Communion, a global fellowship of churches that traces its heritage back to the Church of England. Our foundation is firmly established in the teachings and values of Jesus Christ as revealed in the Holy Scriptures. We believe that Jesus Christ is the source of salvation and the cornerstone of our faith.
                </p>
                <p>
                  We are committed to fostering a spirit of unity among our members, while upholding the rich liturgical and sacramental traditions of the Anglican Church. Our faith is expressed not only in worship but also in our daily lives, as we seek to live out the teachings of Christ in our relationships, work, and service to others.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="space-y-4 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-bold uppercase tracking-widest text-sm text-secondary">Our Vision</span>
              <h2 className="text-2xl font-bold text-primary">To be an Empowered Church Transforming Humanity.</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                We strive to empower individuals for holistic service, inspired by God’s will. Our core values of unity, faith and practice, integrity, accountability, and service guide our actions and shape our identity as a community of believers.
              </p>
            </div>

            {/* Our Commitment */}
            <div className="space-y-4 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-bold uppercase tracking-widest text-sm text-secondary">Our Commitment</span>
                <h2 className="text-2xl font-bold text-primary">Integrity and Transparency</h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  We strive to be transparent in our mission and accountable to God and to one another. Ultimately, we are called to serve our communities and the world, reflecting the love and compassion of Christ in all that we do.
                </p>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed font-bold italic border-t pt-4 border-slate-100 mt-auto">
                "God’s work done God’s way shall never lack God’s resources." <br />— Our Clarion Call
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-primary mb-6">Our Leadership</h2>
            <p className="text-lg text-muted-foreground">
              Meet the dedicated team of clergy, lay leaders, and parish officials committed to serving
              God and our community at ACK St Paul's South C.
            </p>
          </div>

          {/* Clergy & Senior Leadership */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
              <span className="h-px bg-secondary/20 flex-1"></span>
              Clergy & Lay Readers
              <span className="h-px bg-secondary/20 flex-1"></span>
            </h3>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Ven. Canon Charles Chege Kariuki",
                  role: "Archdeacon / Vicar",
                  bio: "A devoted servant of God who has faithfully served in the Anglican Church since 2000. He is well-grounded in theology and leadership, with a strong commitment to church growth and nurturing believers. Passionate about mentoring, he leads the parish with humility and a vision for spiritual transformation.",
                  img: "/images/leadership/ven-canon-charles.jpg"
                },
                {
                  name: "Rev. Moses Agwet",
                  role: "Curate",
                  bio: "Guided by a deep passion for mission and ministry, Rev. Moses joined ACK St. Paul’s in 2025. His journey includes serving as a diocesan evangelist before being ordained as a priest in 2022. He brings a rich experience from various pastoral roles and is committed to fostering a vibrant, faith-filled community.",
                  img: "/images/leadership/moses.webp"
                },
                {
                  name: "Ben Okuku",
                  role: "Lay Reader",
                  bio: "Answering God's call in 2004, Ben is a lecturer by profession and a devoted family man who finds great joy in guiding others in their walk of faith. He balances his career and ministry with grace, serving as a spiritual mentor. He encourages others to embrace God’s call with trust and confidence.",
                  img: "/images/leadership/ben-okuku.png"
                },
                {
                  name: "Edith Murimi",
                  role: "Lay Reader",
                  bio: "A devoted minister since 2018 with a deep love for sharing God's Word. She balances her career and family life with a commitment to witnessing lives transformed through Christ. Her journey is defined by building meaningful relationships and serving the Kingdom with joy and excellence.",
                  img: "/images/leadership/edith-murimi.png"
                },
              ].map((leader, i) => (
                <LeaderCard key={i} leader={leader} />
              ))}
            </div>
          </div>

          {/* Parish Officials */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
              <span className="h-px bg-secondary/20 flex-1"></span>
              Parish Officials
              <span className="h-px bg-secondary/20 flex-1"></span>
            </h3>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "David Irungu Gachui",
                  role: "Vicar’s Warden",
                  bio: "An accomplished executive with over 15 years of experience in the financial sector, David brings strategic leadership and sound governance to the church. Currently serving as a General Manager at KDIC, he uses his expertise in accountability to support the parish's vision and mission.",
                  img: "/images/leadership/david.png"
                },
                {
                  name: "Peter Lawi Ojuka",
                  role: "People’s Warden",
                  bio: "Serving the parish since 2000, Peter carries his role as People's Warden with humility and a deep sense of responsibility toward the congregation. A logistics professional and director, he balances his career with a commitment to growing in God's Word and making a God-honoring impact.",
                  img: "/images/leadership/lawi-ojuka.jpg"
                },
                {
                  name: "Jidraff Kamau Githendu",
                  role: "PCC Secretary",
                  bio: "A Health Systems Management Specialist, Jidraff brings extensive organizational expertise to his role as PCC Secretary. Guided by Colossians 3:23, he approaches every responsibility as service to God, focusing on mentorship and community leadership to raise purposeful individuals.",
                  img: "/images/leadership/Jidrraff.png"
                },
                {
                  name: "Martin Muchere",
                  role: "Parish Treasurer",
                  bio: "With 15 years of experience in property valuation and tax consultancy, Martin ensures transparency and effective financial management within the parish. He is dedicated to high ethical standards and sound stewardship, using his professional gifts to serve the Church with excellence and accountability.",
                  img: "/images/leadership/martin.png"
                },
              ].map((leader, i) => (
                <LeaderCard key={i} leader={leader} />
              ))}
            </div>
          </div>

          {/* Ministry & Committee Chairs */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
              <span className="h-px bg-secondary/20 flex-1"></span>
              Ministry & Committee Chairs
              <span className="h-px bg-secondary/20 flex-1"></span>
            </h3>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Elijah Mwangi",
                  role: "Chairman, KAMA",
                  bio: "A seasoned Advocate with over 25 years of experience, Elijah integrates legal professionalism with a strong sense of faith. He has served in various leadership capacities, including as a Legal Advisor at parish and diocesan levels, and currently chairs KAMA while serving in the Diocesan Synod.",
                  img: "/images/leadership/elijah-mwangi.png"
                },
                {
                  name: "Jane Mutungi",
                  role: "Chairlady, Mothers’ Union",
                  bio: "Blending professional project management expertise with spiritual devotion, Jane provides structured leadership to the Mothers' Union. She is passionate about strengthening organizational processes, mentoring others, and fostering a culture grounded in integrity, accountability, and purposeful service.",
                  img: "/images/leadership/janemutungi.webp"
                },
                {
                  name: "Roselyne Daughty Owino",
                  role: "Chair, SPYCE",
                  bio: "A Microbiology researcher by profession, Roselyne leads the youth ministry with a deep sense of calling. She is passionate about building a vibrant youth church and nurturing the next generation to be firmly rooted in faith, prayer, and community service.",
                  img: "/images/leadership/roselyn.webp"
                },
                {
                  name: "Tr. Ann Dada",
                  role: "Chairperson, Sunday School",
                  bio: "With over a decade of dedicated service, Ann nurtures the spiritual growth of children with patience, love, and a deep sense of purpose. An avid adventurer and scout, she brings a holistic approach to mentorship, instilling strong Christian values in the next generation.",
                  img: "/images/leadership/ann-tr.webp"
                },
                {
                  name: "Dr. Leah Oyake-Ombis",
                  role: "Chairperson, Development",
                  bio: "With over 20 years of experience in environmental governance, Dr. Leah brings strategic vision to the church's development projects. A director and technical advisor, she is passionate about sustainability and community transformation, using her expertise to contribute to the growth of the parish.",
                  img: "/images/leadership/oyake.webp"
                },
                {
                  name: "Evans Shivembe",
                  role: "Chairperson, Church Choir",
                  bio: "A choir member since 2000, Evans leads the choir with humility and a firm belief that music is a divine calling. A supply chain professional, he brings structure to his leadership while fostering unity and musical excellence for wholehearted worship.",
                  img: "/images/leadership/evans-chivembe.jpg"
                },
                {
                  name: "Victoria Wambugu",
                  role: "Chair, Media & Marketing",
                  bio: "A PR professional and entrepreneur, Victoria supports the church’s communication and outreach efforts with strategic expertise. She is committed to sharing the church’s message in a clear and engaging way, bridging faith and modern media to make a meaningful impact.",
                  img: "/images/leadership/vicvic.webp"
                },
              ].map((leader, i) => (
                <LeaderCard key={i} leader={leader} />
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Stats Section */}
      <section className="hero-gradient py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-extrabold md:text-5xl">{stat.value}</div>
                <div className="mt-2 text-sm uppercase tracking-widest text-slate-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function LeaderCard({ leader }: { leader: { name: string; role: string; bio: string; img: string } }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 transition-all hover:shadow-2xl h-full"
    >
      <div className="relative aspect-square w-32 mx-auto mt-6 overflow-hidden rounded-full">
        <Image
          src={leader.img}
          alt={leader.name}
          fill
          className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h4 className="text-lg md:text-xl font-black text-primary leading-tight group-hover:text-secondary transition-colors">{leader.name}</h4>
          <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.15em] mt-1">{leader.role}</p>
        </div>
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
          {leader.bio}
        </p>
      </div>
    </motion.div>
  );
}
