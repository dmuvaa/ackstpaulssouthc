"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Users, ShieldCheck, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const heroSlides = [
    {
      image: "/images/women-group1.jpeg",
      badge: "Building Stronger Families",
      title: <>Mothers&apos; Union</>,
      desc: "Empowering women in faith, family, and service. A space for spiritual nourishment, fellowship, and empowerment.",
    },
    {
      image: "/images/mother-union.jpeg",
      badge: "Spiritual Nourishment",
      title: <>Fellowship & <span className="text-secondary">Growth</span></>,
      desc: "Growing together in grace and love, supporting one another in our spiritual journey.",
    },
    {
      image: "/images/mothers-union1.jpeg",
      badge: "Christian Family Life",
      title: <>Promoting <span className="text-secondary">Family Values</span></>,
      desc: "Upholding the institution of marriage and the promotion of family life according to Christian teachings.",
      position: "object-top"
    },
    {
      image: "/images/mothers-ack.jpeg",
      badge: "United in Service",
      title: <>Mothers of the <span className="text-secondary">Church</span></>,
      desc: "Upholding Christian values and supporting the church's mission across the diocese.",
    }
  ];

export default function WomenMinistryPage() {
  const [activeHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section — Split Layout */}
      <section className="relative min-h-[calc(100vh-6rem)] flex flex-col md:flex-row">
        {/* Left: Image Slideshow */}
        <div className="relative w-full md:w-[65%] aspect-[4/3] md:aspect-auto md:h-auto overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeHero}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={heroSlides[activeHero].image}
                alt="Women's Ministry"
                fill
                className={`object-cover ${heroSlides[activeHero].position || "object-center"}`}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Text Content — animates with slide */}
        <div className="w-full md:w-[35%] bg-primary flex flex-col justify-center relative overflow-hidden py-10 md:py-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeHero}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="px-8 md:px-12 lg:px-16 py-12 md:py-0 space-y-6"
            >
              <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
                {heroSlides[activeHero].badge}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white">
                {heroSlides[activeHero].title}
              </h1>
              <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed">
                {heroSlides[activeHero].desc}
              </p>
              <div className="flex gap-4 pt-4">
                <button className="bg-secondary text-primary px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-all text-sm">
                  Learn More
                </button>
                <button className="border border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all text-sm">
                  Contact Us
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="flex gap-2 px-8 md:px-12 lg:px-16 mt-6 md:mt-0 md:absolute md:bottom-12">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentHero(i)}
                className={`h-2 rounded-full transition-all duration-500 ${activeHero === i ? "w-10 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Identity & Mission Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Badge className="bg-secondary text-white px-4 py-1 mb-4">Our Identity & Mission</Badge>
          <h2 className="text-3xl font-bold text-primary sm:text-4xl mb-6">Symbolized by Blue, White & Gold</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            The Mothers&apos; Union is symbolized by its distinctive colors—**blue** for royalty, **white** for holiness, and **gold** for the heavenly and precious.
          </p>
          <div className="bg-primary text-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <p className="text-xl font-medium italic mb-4">
              &quot;I can do all things through Christ who strengthens me.&quot;
            </p>
            <p className="font-bold text-secondary">— Philippians 4:13</p>
          </div>
        </div>
      </section>

      {/* Core Objectives Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="bg-secondary text-white px-4 py-1 mb-4">Focus</Badge>
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">Core Objectives</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            The Mothers&apos; Union is built on principles that guide our service and fellowship.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            "To uphold Christ’s teaching on marriage and promote its deeper understanding.",
            "To encourage parents to raise their children in the Christian faith.",
            "To maintain a worldwide fellowship of Christians united in prayer and service.",
            "To promote conditions that support stable family life and protect children.",
            "To assist those facing challenges in family life through spiritual and material support."
          ].map((objective, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-6 bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-8 w-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 font-bold">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{objective}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-secondary text-white px-4 py-1 mb-4">Our Pillars</Badge>
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Pillars of the Mothers&apos; Union</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              The MU is built on five foundational pillars that shape its mission:
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {["Prayer", "Welfare", "Children", "Marriage", "Calamity"].map((pillar, i) => (
                <div key={i} className="bg-white px-4 py-2 rounded-full shadow-sm border text-sm font-bold text-primary">
                  {i + 1}. {pillar} Pillar
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* Pillar 1: Prayer */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border shadow-sm space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Flower2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">1. Prayer Pillar</h3>
                  <p className="text-sm text-muted-foreground">Nurturing Spiritual Growth</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prayer is at the heart of the MU, fostering spiritual growth and a deep sense of fellowship.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>Weekly Online Prayer Meetings:</strong> Every Wednesday at 7:30 p.m., providing a platform for intercession and encouragement.</li>
                <li><strong>World Day of Prayer:</strong> Held annually in March, bringing women together in prayer for the church and the world.</li>
                <li><strong>Monthly Ladies’ Prayer Meeting:</strong> Every second Sunday at 8:00 a.m., strengthening a culture of corporate prayer within the church.</li>
              </ul>
            </motion.div>

            {/* Pillar 2: Welfare */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border shadow-sm space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">2. Welfare Pillar</h3>
                  <p className="text-sm text-muted-foreground">Extending Compassion and Care</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Welfare Pillar plays a crucial role in ensuring the well-being of members and addressing community needs.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>Managing the church kitchen and mobilizing resources for upkeep.</li>
                <li>Supporting the education of a bright but needy high school girl.</li>
                <li>Organizing visits to prisons and the Borstal Institution during Talent Week, bringing hope and encouragement to those in need.</li>
              </ul>
            </motion.div>

            {/* Pillar 3: Children */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border shadow-sm space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">3. Children Pillar</h3>
                  <p className="text-sm text-muted-foreground">Raising a Generation in Faith</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dedicated to guiding children in their spiritual journey, the Children Pillar actively supports the ACK St. Paul’s South C Sunday School ministry.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>Sunday School Support:</strong> Volunteers assist teachers in handling young children, ensuring a conducive learning environment.</li>
                <li><strong>40 Days of Prayer for Children:</strong> Mobilized parents via WhatsApp to support daily prayers for children from August 26th to October 4th, 2024.</li>
                <li><strong>Outreach to KWETU Home of Peace:</strong> During Talent Week in October, MU members visited the home, sharing the Word of God and donating food and financial support.</li>
                <li><strong>Education Scholarship Support:</strong> In partnership with the Welfare Pillar, MU has sponsored a bright but needy Form 4 student whose guardian is a church member. Funds are raised through monthly member contributions.</li>
              </ul>
            </motion.div>

            {/* Pillar 4: Marriage */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border shadow-sm space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">4. Marriage Pillar</h3>
                  <p className="text-sm text-muted-foreground">Strengthening Christian Homes</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Committed to upholding Christ’s teaching on marriage, the Marriage Pillar has in 2024 successfully:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>Organized a family and marriage seminar featuring Father Kinyua.</li>
                <li>Hosted a luncheon for clergy during Talent Week as a token of appreciation.</li>
                <li>Recognized and appreciated church support staff for their dedication and service.</li>
              </ul>
            </motion.div>

            {/* Pillar 5: Calamity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border shadow-sm space-y-4 lg:col-span-2 max-w-3xl mx-auto w-full"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">5. Calamity Pillar</h3>
                  <p className="text-sm text-muted-foreground">Support in Times of Need</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Life comes with its challenges, and the MU ensures that no one faces them alone. The Calamity Pillar in 2024 successfully provided for:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>Bereavement care:</strong> Visiting and supporting grieving families.</li>
                <li><strong>Community support:</strong> Providing clothing, meals, and gifts for Thursday Fellowship members.</li>
                <li><strong>Elderly care:</strong> Regular visits to elderly members in need of comfort and assistance.</li>
                <li><strong>Prison Ministry:</strong> Outreach to Borstal Institution, extending love and encouragement to young offenders.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-primary mb-6">Join the Movement!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Mothers&apos; Union is a place for women seeking to grow in faith, support families, and serve the community. We invite you to join us on this transformative journey!
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="font-bold h-12 px-8" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
          <p className="mt-8 font-bold text-primary">ACK St. Paul’s South C – Mothers&apos; Union: Nurturing Families, Serving in Love!</p>
        </div>
      </section>
    </div>
  );
}
