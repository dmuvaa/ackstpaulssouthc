"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Calendar, Users, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const heroImages = [
  {
    url: "/images/congregation.jpg",
    title: "A Vibrant Community of Faith",
    subtitle: "Join us in worship and fellowship as we grow together in Christ."
  },
  {
    url: "/images/choir 3.jpg",
    title: "Harmonious Worship",
    subtitle: "Experience the power of music and liturgy in our services."
  },
  {
    url: "/images/youth.jpg",
    title: "Empowering the Next Generation",
    subtitle: "Dedicated ministries for children, youth, and young adults."
  },
  {
    url: "/images/vicar.jpg",
    title: "Rooted in Tradition, Reaching for Hope",
    subtitle: "A parish dedicated to spiritual growth and community impact."
  }
];

export default function HomePage() {
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentHero]);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <section className="relative w-full bg-slate-50">
        <div className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentHero}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentHero].url}
                alt={heroImages[currentHero].title}
                fill
                className="object-cover object-top md:object-center"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows - more subtle */}
          <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
            <button 
              onClick={() => setCurrentHero((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md pointer-events-auto transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setCurrentHero((prev) => (prev + 1) % heroImages.length)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md pointer-events-auto transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content Container - Grounded and Expanded */}
        <div className="container mx-auto px-4 -mt-20 md:-mt-32 relative z-30 pb-12">
          <motion.div 
            key={currentHero}
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-4xl"
          >
            <div className="space-y-6">
              <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-xs md:text-sm uppercase tracking-widest font-bold">
                ACK St Paul's South C Parish
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-primary leading-[1.1]">
                {heroImages[currentHero].title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
                {heroImages[currentHero].subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild size="lg" variant="gold" className="h-14 px-10 text-lg font-bold shadow-lg shadow-accent/20">
                  <Link href="/donate">Support Our Mission</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-primary/20 text-primary hover:bg-primary/5">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            {/* Indicators inside the card */}
            <div className="flex gap-2 mt-8 border-t pt-8 border-slate-50">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentHero(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    currentHero === i ? "w-10 bg-accent" : "w-2 bg-slate-200 hover:bg-slate-300"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats/Services */}
      <section className="container mx-auto -mt-8 md:-mt-16 px-4 pb-20 relative z-20">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-4"
        >
          {[
            { icon: Users, title: "Our Community", desc: "Join our diverse family of believers." },
            { icon: BookOpen, title: "Sermons", desc: "Be inspired by the word of God." },
            { icon: Calendar, title: "Events", desc: "Stay updated with church activities." },
            { icon: Heart, title: "Give Back", desc: "Make a difference through your tithe." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-morphism h-full transition-all hover:shadow-xl hover:-translate-y-1 bg-white/95 backdrop-blur-md">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Welcome from Vicar */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-8 md:gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[600px] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl"
          >
            <Image
              src="/images/vicar.jpg"
              alt="Our Vicar"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <p className="font-outfit text-2xl font-bold tracking-tight">The Venerable Vicar</p>
              <p className="text-slate-200">Parish Priest</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <Badge className="bg-secondary text-white px-4 py-1">A Message of Welcome</Badge>
            <h2 className="text-4xl font-black tracking-tight text-primary sm:text-5xl">Word from Our Vicar</h2>
            <div className="h-1.5 w-24 bg-accent rounded-full" />
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed italic">
              <p>
                "Welcome to ACK St Paul's South C. We are a vibrant community dedicated to sharing the love of Christ and serving our neighbors. Whether you are a lifelong Anglican or just exploring faith, there is a place for you here."
              </p>
              <p>
                "Our parish is a sanctuary where tradition meets hope, and where every soul is encouraged to find their purpose in God's great mission. Join us this Sunday and experience the warmth of our fellowship."
              </p>
            </div>
            <Button asChild size="lg" variant="gold" className="group h-14 px-10 text-lg font-bold">
              <Link href="/about" className="flex items-center gap-2">
                Our Full Leadership <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* New Here? What to Expect */}
      <section className="bg-primary py-24 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-accent text-primary px-4 py-1 font-bold">New Here?</Badge>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">What to Expect</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300 text-lg">
              Visiting a new church can be intimidating. We want to make your first visit as welcoming and smooth as possible.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: "🚗", title: "Ample Parking", desc: "Safe and secure parking is available within the church premises for all worshippers." },
              { icon: "🙌", title: "Vibrant Worship", desc: "Our services blend Anglican liturgy with contemporary praise, creating a powerful spiritual experience." },
              { icon: "🧒", title: "Kids & Teens", desc: "Dedicated Sunday School and Teens' services run concurrently with our main morning service." },
              { icon: "☕", title: "Fellowship", desc: "Stay after the service to connect with our members and clergy over refreshments." },
              { icon: "📖", title: "The Word", desc: "Bible-centered teaching that is relevant to your daily life and spiritual growth." },
              { icon: "🛡️", title: "Safe Environment", desc: "We adhere to all safety protocols to ensure a peaceful and secure worship environment." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-accent">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Featured Sermon */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-muted rounded-[2rem] md:rounded-[4rem] p-6 md:p-16">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <Badge className="bg-primary text-white">Latest Sermon</Badge>
                <h2 className="text-4xl font-black tracking-tight text-primary sm:text-5xl">Watch Our Latest Message</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Can't make it to the sanctuary? Catch up on our latest sermons and biblical teachings from the comfort of your home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="gold" className="h-14 px-10 text-lg font-bold">
                    Watch on YouTube
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold">
                    Browse All Sermons
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-[2.5rem] shadow-2xl group cursor-pointer">
                <Image
                  src="/images/congregation.jpg"
                  alt="Latest Sermon Placeholder"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary border-b-[10px] border-b-transparent ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Ministries Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-4">
              <Badge className="bg-primary text-white px-4 py-1">Ministries & Groups</Badge>
              <h2 className="text-4xl font-black tracking-tight text-primary sm:text-5xl">Finding Your Place</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                There is a place for everyone at ACK St Paul's. Explore our diverse ministries and find where you belong.
              </p>
            </div>
            <Button variant="link" asChild className="text-primary font-bold text-lg p-0 h-auto">
              <Link href="/ministries" className="flex items-center gap-2">View All Ministries <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Men's Ministry (KAMA)", img: "/images/MU 2.jpeg", desc: "Empowering men in faith, family, and leadership.", href: "/ministries/men" },
              { title: "Youth Ministry (SPYCE)", img: "/images/youth.jpg", desc: "A vibrant movement of young believers chosen for purpose.", href: "/ministries/youth" },
              { title: "Sunday School", img: "/images/children 1.jpeg", desc: "Building a strong biblical foundation for our children.", href: "/ministries/sunday-school" },
              { title: "Women's Group (MU)", img: "/images/MU 2.jpeg", desc: "Nurturing women through prayer, fellowship, and service.", href: "/ministries/women" },
              { title: "Praise & Worship", img: "/images/band 1.jpg", desc: "Leading the congregation into heartfelt worship and praise.", href: "/ministries/praise" },
              { title: "Missions & Outreach", img: "/images/missions.jpeg", desc: "Spreading the Gospel and extending Christ's love to all.", href: "/ministries/missions" },
            ].map((ministry, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative h-[450px] overflow-hidden rounded-[2.5rem] shadow-xl"
              >
                <Image
                  src={ministry.img}
                  alt={ministry.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-black mb-3">{ministry.title}</h3>
                  <p className="text-slate-200 mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {ministry.desc}
                  </p>
                  <Button asChild variant="gold" size="sm" className="w-fit h-10 px-6 rounded-full font-bold">
                    <Link href={ministry.href}>Explore Ministry</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Stories */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:gap-16 lg:grid-cols-2 items-center">
            <div className="relative">
              <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl z-10">
                <Image
                  src="/images/sisters keeper .jpeg"
                  alt="Community Impact"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent rounded-full -z-0 blur-2xl opacity-50" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary rounded-full -z-0 blur-3xl opacity-10" />
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <Badge className="bg-secondary text-white">Our Impact</Badge>
                <h2 className="text-4xl font-black tracking-tight text-primary sm:text-5xl">Transforming Lives, Building Community</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Faith in action is at the heart of everything we do. Through our various outreaches and programs, we've seen God move in incredible ways within our community.
                </p>
              </div>
              <div className="grid gap-6">
                {[
                  { stat: "2,000+", label: "Lives Impacted Annually" },
                  { stat: "15+", label: "Community Outreach Projects" },
                  { stat: "100%", label: "Biblical Foundation" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-2xl border shadow-sm">
                    <div className="text-3xl font-black text-secondary">{stat.stat}</div>
                    <div className="text-lg font-bold text-primary">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-primary text-primary hover:bg-primary hover:text-white" asChild>
                <Link href="/gallery">See Our Story in Photos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-primary">Upcoming Events</h2>
              <p className="text-muted-foreground">Join us in our upcoming activities and fellowship.</p>
            </div>
            <Button variant="link" asChild className="text-primary font-bold text-lg p-0 h-auto">
              <Link href="/events" className="flex items-center gap-2">View All Events <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { date: "May 15", title: "Monthly Men's Fellowship", time: "6:00 PM" },
              { date: "May 20", title: "Youth Sunday Worship", time: "9:00 AM" },
              { date: "Jun 01", title: "Church Anniversary Service", time: "8:00 AM" },
            ].map((event, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="group flex cursor-pointer gap-6 rounded-[2.5rem] bg-white p-8 shadow-sm transition-all hover:shadow-md border border-primary/5"
              >
                <div className="flex flex-col items-center justify-center rounded-2xl bg-primary/5 px-6 py-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="text-xs font-bold uppercase tracking-widest">{event.date.split(" ")[0]}</span>
                  <span className="text-3xl font-black">{event.date.split(" ")[1]}</span>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-xl mb-1">{event.title}</h3>
                  <p className="text-muted-foreground">{event.time} • Sanctuary</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 text-center lg:text-left"
            >
              <h2 className="text-3xl font-bold text-accent">Our Vision</h2>
              <p className="text-xl leading-relaxed text-slate-200">
                To be an Empowered Church Transforming Humanity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4 text-center lg:text-left"
            >
              <h2 className="text-3xl font-bold text-accent">Our Mission</h2>
              <p className="text-xl leading-relaxed text-slate-200">
                To Empower Humanity for Holistic Service inspired by God’s will.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-center lg:text-left"
            >
              <h2 className="text-3xl font-bold text-accent">Clarion Call</h2>
              <p className="text-xl italic leading-relaxed text-slate-200">
                "God’s work done God’s way shall never lack God’s resources."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Church Schedule Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-secondary text-white px-4 py-1">Join Us</Badge>
            <h2 className="text-4xl font-bold text-primary">Church Schedule</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Experience transformative worship every Sunday and engage with our community throughout the week.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { time: "8:00 AM - 9:30 AM", title: "First English Service", desc: "A vibrant traditional-contemporary blend." },
              { time: "10:00 AM - 12:20 PM", title: "Second English Service", desc: "Our main congregational worship service." },
              { time: "12:30 PM - 1:30 PM", title: "Swahili Service", desc: "Worship and word in the national language." },
              { time: "10:00 AM - 12:00 PM", title: "Youth Service (SPYCE)", desc: "Tailored for young people to thrive in faith." },
              { time: "10:30 AM - 12:00 PM", title: "Teens & Children", desc: "Building a strong foundation in Christ." },
              { time: "Mon - Fri", title: "Office Hours", desc: "Open 8:00 AM to 5:00 PM for all inquiries." },
            ].map((slot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white p-8 shadow-sm border border-border/50 hover:shadow-md transition-all"
              >
                <div className="mb-4 text-sm font-bold text-secondary uppercase tracking-widest">{slot.time}</div>
                <h3 className="mb-2 text-xl font-bold text-primary">{slot.title}</h3>
                <p className="text-muted-foreground">{slot.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden hero-gradient">
        <div className="container relative mx-auto px-4 text-center text-white">
          <h2 className="mb-6 text-4xl font-bold">Ready to take the next step?</h2>
          <p className="mb-10 text-xl text-slate-100 opacity-90 max-w-2xl mx-auto">
            Become a part of our growing community today. Whether you want to volunteer, donate, or join a home fellowship, we're here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="gold" asChild className="h-14 px-10 text-lg font-bold">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold bg-white text-primary hover:bg-white/90 border-none shadow-lg" asChild>
              <Link href="/donate">Support via M-Pesa</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
