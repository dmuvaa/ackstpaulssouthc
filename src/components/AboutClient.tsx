"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, History, Target, ShieldCheck } from "lucide-react";

interface Leader {
  name: string;
  role: string;
  bio: string;
  img: string;
  category?: string;
}

interface Stat {
  label: string;
  value: string;
}

interface AboutClientProps {
  leaders: Leader[];
  stats: Stat[];
}

export default function AboutClient({ leaders, stats }: AboutClientProps) {
  const clergy = leaders.filter(l => l.category === 'clergy');
  const officials = leaders.filter(l => l.category === 'official');
  const chairs = leaders.filter(l => l.category === 'chair');
  const other = leaders.filter(l => !l.category || !['clergy', 'official', 'chair'].includes(l.category));

  return (
    <div className="flex flex-col">
      {/* Top Section - About Us */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Who We Are */}
            <div className="space-y-4 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-bold uppercase tracking-widest text-sm text-secondary">Who We Are</span>
              <h1 className="text-3xl font-black text-primary">Anglican Church of Kenya St. Paul’s South C Parish</h1>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  The Anglican Church of Christ is a faith-based organization deeply rooted in the Christian tradition. We are part of the Anglican Communion, a global fellowship of churches that traces its heritage back to the Church of England. Our foundation is firmly established in the teachings and values of Jesus Christ as revealed in the Holy Scriptures. We believe that Jesus Christ is the source of salvation and the cornerstone of our faith.
                </p>
                <p>
                  We are committed to fostering a spirit of unity among our members, while upholding the rich liturgical and sacramental traditions of the Anglican Church. Our faith is expressed not only in worship but also in our daily lives, as we seek to live out the teachings of Christ in our relationships, work, and service to others.
                </p>
              </div>
            </div>

            {/* Our Vision & Core Values */}
            <div className="space-y-4 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="font-bold uppercase tracking-widest text-sm text-secondary">Our Vision</span>
                <h2 className="text-2xl font-bold text-primary mt-2 mb-4">To be an Empowered Church Transforming Humanity.</h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  We strive to empower individuals for holistic service, inspired by God’s will.
                </p>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <span className="font-bold uppercase tracking-widest text-sm text-secondary block mb-3">Core Values</span>
                <p className="text-base text-muted-foreground mb-3">Our core values include:</p>
                <div className="space-y-2 text-base text-muted-foreground font-medium">
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-black rounded-full" />
                    Unity
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-black rounded-full" />
                    Faith and Practice
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-black rounded-full" />
                    Integrity
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-black rounded-full" />
                    Accountability
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-black rounded-full" />
                    Service
                  </p>
                </div>
              </div>
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
              God and our community at ACK St Paul's South C Parish.
            </p>
          </div>

          {/* Clergy & Senior Leadership */}
          {clergy.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
                <span className="h-px bg-secondary/20 flex-1"></span>
                Clergy & Lay Readers
                <span className="h-px bg-secondary/20 flex-1"></span>
              </h3>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                {clergy.map((leader, i) => (
                  <LeaderCard key={i} leader={leader} />
                ))}
              </div>
            </div>
          )}

          {/* Parish Officials */}
          {officials.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
                <span className="h-px bg-secondary/20 flex-1"></span>
                Parish Officials
                <span className="h-px bg-secondary/20 flex-1"></span>
              </h3>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                {officials.map((leader, i) => (
                  <LeaderCard key={i} leader={leader} />
                ))}
              </div>
            </div>
          )}

          {/* Ministry & Committee Chairs */}
          {chairs.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
                <span className="h-px bg-secondary/20 flex-1"></span>
                Ministry & Committee Chairs
                <span className="h-px bg-secondary/20 flex-1"></span>
              </h3>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                {chairs.map((leader, i) => (
                  <LeaderCard key={i} leader={leader} />
                ))}
              </div>
            </div>
          )}

          {/* Other Leaders (Fallback) */}
          {other.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
                <span className="h-px bg-secondary/20 flex-1"></span>
                Other Leaders
                <span className="h-px bg-secondary/20 flex-1"></span>
              </h3>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                {other.map((leader, i) => (
                  <LeaderCard key={i} leader={leader} />
                ))}
              </div>
            </div>
          )}
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

function LeaderCard({ leader }: { leader: Leader }) {
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
