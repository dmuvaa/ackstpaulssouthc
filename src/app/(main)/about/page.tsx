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
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold sm:text-5xl"
          >
            About ACK St Paul's South C
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-300"
          >
            Discover our journey, our values, and the people who lead us.
          </motion.p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-secondary">
                <ShieldCheck className="h-6 w-6" />
                <span className="font-bold uppercase tracking-widest text-sm">Who We Are</span>
              </div>
              <h2 className="text-4xl font-black text-primary">Anglican Church of Kenya <br/>St. Paul’s South C</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We are a faith-based organization deeply rooted in the Christian tradition and part of the global Anglican Communion. Our foundation is firmly established in the teachings and values of Jesus Christ as revealed in the Holy Scriptures.
                </p>
                <p>
                  We believe that Jesus Christ is the source of salvation and the cornerstone of our faith. Our liturgical and sacramental traditions guide our worship and daily lives, fostering a spirit of unity among our members.
                </p>
              </div>
            </div>
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/brigade-sunday school.jpg"
                alt="ACK St Paul's Community"
                fill
                className="object-cover object-top"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-8 rounded-2xl border-l-4 border-secondary">
                <p className="text-xl font-bold text-primary italic">
                  "God’s work done God’s way shall never lack God’s resources."
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-secondary">— Our Clarion Call</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3 mb-16">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-sm border"
            >
              <Target className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-lg">
                To be an Empowered Church Transforming Humanity.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-sm border"
            >
              <Users className="h-10 w-10 text-secondary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground text-lg">
                To Empower Humanity for Holistic Service inspired by God’s will.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-sm border"
            >
              <ShieldCheck className="h-10 w-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Core Values</h3>
              <ul className="space-y-2 text-muted-foreground text-lg">
                <li className="flex items-center gap-2 font-medium">• Unity</li>
                <li className="flex items-center gap-2 font-medium">• Faith and Practice</li>
                <li className="flex items-center gap-2 font-medium">• Integrity</li>
                <li className="flex items-center gap-2 font-medium">• Accountability & Transparency</li>
                <li className="flex items-center gap-2 font-medium">• Service</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-white">
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
                  bio: "A devoted servant who has served since 2000. He is well-grounded in theology and leadership, passionate about mentoring clergy and lay leaders with humility and vision.",
                  img: "/images/leadership/ven-canon-charles.jpg" 
                },
                { 
                  name: "Rev. Moses Agwet", 
                  role: "Curate", 
                  bio: "Guided by a deep passion for mission, Rev. Moses joined the parish in 2025. He was ordained in 2022 and has served faithfully in various evangelical and pastoral roles.",
                  img: "/images/leadership/moses-agwet.jpg" 
                },
                { 
                  name: "Ben Okuku", 
                  role: "Lay Reader", 
                  bio: "Serving since 2004, Ben is a lecturer and devoted family man who finds great joy in guiding others in their walk of faith and mentoring the church community.",
                  img: "/images/leadership/ben-okuku.png" 
                },
                { 
                  name: "Edith Murimi", 
                  role: "Lay Reader", 
                  bio: "A devoted minister since 2018 with a deep love for sharing God's Word. She balances her career and family life with a passionate commitment to spiritual transformation.",
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
                  bio: "An accomplished financial executive with over 15 years of experience. He brings strategic leadership and sound governance to support the church's mission and stewardship.",
                  img: "/images/leadership/david-irungu.jpg" 
                },
                { 
                  name: "Peter Lawi Ojuka", 
                  role: "People’s Warden", 
                  bio: "A faithful member since 2000, Peter serves with humility and responsibility. He is a logistics professional who seeking to make a God-honoring impact in the community.",
                  img: "/images/leadership/lawi-ojuka.jpg" 
                },
                { 
                  name: "Jidraff Kamau Githendu", 
                  role: "PCC Secretary", 
                  bio: "A seasoned Health Systems Management Specialist and youth mentor. He approaches leadership with the conviction that all work is service to God.",
                  img: "/images/leadership/jidraff.jpg" 
                },
                { 
                  name: "Martin Muchere", 
                  role: "Parish Treasurer", 
                  bio: "With over 15 years in property valuation and tax consultancy, Martin ensures transparency and effective financial management through accuracy and ethical standards.",
                  img: "/images/leadership/martin-muchere.jpg" 
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
                  bio: "A seasoned Advocate with 25 years of experience. He uses his legal expertise to serve the church through advocacy, reform, and leadership in KAMA.",
                  img: "/images/leadership/elijah-mwangi.png" 
                },
                { 
                  name: "Jane Mutungi", 
                  role: "Chairlady, Mothers’ Union", 
                  bio: "Jane blends professional project management expertise with spiritual devotion to foster a culture of integrity, accountability, and mentorship within the MU.",
                  img: "/images/leadership/jane-mutungi.jpg" 
                },
                { 
                  name: "Roselyne Daughty Owino", 
                  role: "Chair, SPYCE", 
                  bio: "A biotechnology researcher passionate about nurturing a vibrant youth ministry firmly rooted in faith and committed to serving God and community.",
                  img: "/images/leadership/roselyne-daughty.jpg" 
                },
                { 
                  name: "Tr. Ann Dada", 
                  role: "Chairperson, Sunday School", 
                  bio: "Nurturing children's spiritual growth for over a decade. She guides the next generation with patience, love, and a deep sense of Christian values.",
                  img: "/images/leadership/ann-dada.jpg" 
                },
                { 
                  name: "Dr. Leah Oyake-Ombis", 
                  role: "Chairperson, Development", 
                  bio: "An expert in environmental governance and urban development. She leads with a focus on sustainability, stewardship, and community transformation.",
                  img: "/images/leadership/oyake-ombis.jpg" 
                },
                { 
                  name: "Evans Shivembe", 
                  role: "Chairperson, Church Choir", 
                  bio: "A choir member since 2000, Evans believes music is a calling. He mentors talent and upholds musical excellence for wholehearted worship.",
                  img: "/images/leadership/evans-chivembe.jpg" 
                },
                { 
                  name: "Victoria Wambugu", 
                  role: "Chair, Media & Marketing", 
                  bio: "A PR professional and entrepreneur who supports the church's outreach and communication, sharing God's message in clear and engaging ways.",
                  img: "/images/leadership/victoria-wambugu.jpg" 
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
      className="group flex flex-col bg-slate-50/50 rounded-[2rem] overflow-hidden border border-slate-100 transition-all hover:bg-white hover:shadow-2xl"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={leader.img}
          alt={leader.name}
          fill
          className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <p className="text-white text-xs leading-relaxed line-clamp-4">
            {leader.bio}
          </p>
        </div>
      </div>
      <div className="p-6 text-center lg:text-left">
        <h4 className="text-xl font-black text-primary leading-tight group-hover:text-secondary transition-colors">{leader.name}</h4>
        <p className="text-secondary font-bold text-xs uppercase tracking-widest mt-2">{leader.role}</p>
        <p className="text-muted-foreground text-sm mt-4 line-clamp-3 group-hover:hidden transition-all">
          {leader.bio}
        </p>
      </div>
    </motion.div>
  );
}
