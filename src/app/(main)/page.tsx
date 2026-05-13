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
  const activeHero = currentHero >= heroImages.length ? 0 : currentHero;

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
              key={activeHero}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[activeHero].url}
                alt={heroImages[activeHero].title}
                fill
                className="object-cover object-top md:object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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

          {/* Content Overlaid on Image */}
          <div className="absolute inset-0 z-10 flex items-end pb-2">
            <div className="container mx-auto px-4">
              <motion.div 
                key={activeHero}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                /* REDUCED SPACING: space-y-2 for mobile, space-y-3 for desktop */
                className="max-w-4xl text-white space-y-2 md:space-y-3"
              >
                <Badge className="bg-secondary/20 text-white border-none px-3 py-1 text-[10px] md:text-xs uppercase tracking-widest font-bold backdrop-blur-md">
                  ACK St Paul's South C Parish
                </Badge>

                {/* REDUCED FONT: text-xl for mobile, text-4xl for desktop */}
                <h1 className="text-xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  {heroImages[activeHero].title}
                </h1>

                {/* REDUCED FONT: text-sm for mobile, text-lg for desktop */}
                <p className="text-sm md:text-lg text-slate-200 leading-snug max-w-2xl font-medium">
                  {heroImages[activeHero].subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {/* SMALLER BUTTONS: h-11 for mobile, h-14 for desktop */}
                  <Button asChild size="lg" variant="gold" className="h-11 md:h-14 px-6 md:px-10 text-sm md:text-lg font-bold shadow-lg shadow-accent/20">
                    <Link href="/donate">Support Our Mission</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-11 md:h-14 px-6 md:px-10 text-sm md:text-lg font-bold border-white text-white bg-transparent hover:bg-black">
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>

                {/* Indicators: Reduced margin/padding */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentHero(i)}
                      className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        activeHero === i ? "w-8 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/50"
                      )}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome from Vicar */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid items-start gap-8 md:gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[600px] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl"
          >
            <Image
              src="/images/vicarcanon.jpeg"
              alt="Our Vicar"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-10 left-10 text-white">
              <p className="font-outfit text-2xl font-bold tracking-tight">The Venerable Canon</p>
              <p className="text-slate-200">Parish Vicar</p>
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
              <Link href="/services" className="flex items-center gap-2">
                View Church Services <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* New Here? What to Expect */}
      <section className="bg-primary py-8 md:py-16 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 md:mb-16 text-center">
            <Badge className="mb-4 bg-accent text-primary px-4 py-1 font-bold">New Here?</Badge>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">What to Expect</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300 text-lg">
              Visiting a new church can be intimidating. We want to make your first visit as welcoming and smooth as possible.
            </p>
          </div>
          <div className="grid gap-4 md:gap-8 md:grid-cols-3">
            {[
              { icon: "🚗", title: "Ample Parking", desc: "Safe and secure parking is available within the church premises for all worshippers." },
              { icon: "🙌", title: "Vibrant Worship", desc: "Our services blend Anglican liturgy with contemporary praise, creating a powerful spiritual experience." },
              { icon: "🧒", title: "Kids & Teens", desc: "Dedicated Sunday School and Teens' services run concurrently with our main morning service." },
              { icon: "☕", title: "Fellowship", desc: "Stay after the service to connect with our members and clergy over refreshments." },
              { icon: "📖", title: "The Word", desc: "Bible-centered teaching that is relevant to your daily life and spiritual growth." },
              { icon: "🛡️", title: "Safe Environment", desc: "We adhere to all safety protocols to ensure a peaceful and secure worship environment." },
              { icon: "🏢", title: "Multipurpose Hall (MPH)", desc: "Our modern facility is available for events, conferences, and community gatherings." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-[2rem] hover:bg-white/10 transition-all"
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
      <section className="py-8 md:py-12">
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
                  <Button size="lg" variant="gold" className="h-14 px-10 text-lg font-bold" asChild>
                    <Link href="https://www.youtube.com/@ackstpaulsparishsouthc" target="_blank" rel="noopener noreferrer">
                      Watch on YouTube
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold" asChild>
                    <Link href="https://www.youtube.com/@AckStPaulsParishSouthC/streams" target="_blank" rel="noopener noreferrer">
                      Browse All Sermons
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-[2.5rem] shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/bUlV-KEt_Cc?si=meBk_ies9sSzr8e1&start=615"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Ministries Grid */}
      <section className="py-8 md:py-16">
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
              { title: "Youth Ministry (SPYCE)", img: "/images/youths bible study hang out .jpeg", desc: "A vibrant movement of young believers chosen for purpose.", href: "/ministries/youth" },
              { title: "Mother's Union", img: "/images/MU 2.jpeg", desc: "Nurturing women through prayer, fellowship, and service.", href: "/ministries/women" },
              { title: "Praise & Worship", img: "/images/band 1.jpg", desc: "Leading the congregation into heartfelt worship and praise.", href: "/ministries/praise" },
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
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end text-white">
                  <h3 className="text-lg md:text-2xl font-black mb-1 md:mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{ministry.title}</h3>
                  <p className="text-xs md:text-base text-slate-200 mb-3 md:mb-4 line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {ministry.desc}
                  </p>
                  <Button asChild variant="gold" size="sm" className="w-fit h-8 md:h-10 px-4 md:px-6 rounded-full font-bold text-xs md:text-sm">
                    <Link href={ministry.href}>Explore Ministry</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Stories */}
      <section className="bg-muted/30 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:gap-16 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1 hidden lg:block">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-[600px] w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl z-10">
                <Image
                  src="/images/sisters keeper .jpeg"
                  alt="Community Impact"
                  fill
                  className="object-cover object-right"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent rounded-full -z-0 blur-2xl opacity-50" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary rounded-full -z-0 blur-3xl opacity-10" />
            </div>
            <div className="space-y-10 order-1 lg:order-2">
              <div className="space-y-4">
                <Badge className="bg-secondary text-white">Our Impact</Badge>
                <h2 className="text-4xl font-black tracking-tight text-primary sm:text-5xl">Transforming Lives, Building Community</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Faith in action is at the heart of everything we do. Through our various outreaches and programs, we've seen God move in incredible ways within our community.
                </p>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-2xl z-10 block lg:hidden my-6">
                  <Image
                    src="/images/sisters keeper .jpeg"
                    alt="Community Impact"
                    fill
                    className="object-cover object-right"
                  />
                </div>
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
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
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
      <section className="bg-primary py-8 md:py-16 text-white">
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
      <section className="bg-muted/30 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-16 text-center">
            <Badge className="mb-4 bg-secondary text-white px-4 py-1">Join Us</Badge>
            <h2 className="text-4xl font-bold text-primary">Church Schedule</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Experience transformative worship every Sunday and engage with our community throughout the week.
            </p>
          </div>
          <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-border/50 hover:shadow-md transition-all"
              >
                <div className="mb-4 text-sm font-bold text-secondary uppercase tracking-widest">{slot.time}</div>
                <h3 className="mb-2 text-xl font-bold text-primary">{slot.title}</h3>
                <p className="text-muted-foreground">{slot.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multipurpose Hall Section */}
      <section id="hall" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <Badge className="mb-4 bg-secondary text-white px-4 py-1">Venue Hire</Badge>
            <h2 className="text-4xl font-bold text-primary mb-6">Host Your Event with Us!</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              <p>
                Looking for the perfect venue for your next event? ACK St Paul's South C Multipurpose Hall offers a complete event solution with modern facilities, ample parking, and a serene environment.
              </p>
              <p className="font-bold text-primary text-xl">
                You have an event? We have the solution.
              </p>
              <p className="text-base">
                Our state-of-the-art facility accommodates over 500-600 guests, with 4 additional intimate halls for smaller gatherings. Equipped with sophisticated audio-visual technology and flexible seating arrangements, we ensure a smooth experience for conferences, weddings, and parties.
              </p>
              <p className="text-accent font-bold italic text-base">“Tents are overrated, anyway!”</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-start max-w-7xl mx-auto">
            {/* Left Side: Large Image (No overlay) */}
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg">
              <Image
                src="/images/mph-dinner-enhanced.png"
                alt="Multipurpose Hall"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right Side: Rate Card Table & Discount */}
            <div className="space-y-6">
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 bg-white border-b border-slate-100">
                  <h3 className="text-xl font-bold text-primary">Hall Hire Rate Card</h3>
                  <p className="text-xs text-muted-foreground">Rates are inclusive of 16% VAT</p>
                </div>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-left text-muted-foreground font-bold">
                        <th className="p-4">Name of Hall</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Capacity</th>
                        <th className="p-4">Day Rate</th>
                        <th className="p-4">Evening Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: "Victory Hall", loc: "Ground Floor", cap: "500 Guests", day: "Ksh 50,000", eve: "Ksh 15,000" },
                        { name: "Wisdom Hall", loc: "1st Floor (Door 1)", cap: "30 Guests", day: "Ksh 10,000", eve: "Ksh 3,000" },
                        { name: "Praise Hall", loc: "1st Floor (Door 2)", cap: "10 Guests", day: "Ksh 5,000", eve: "Ksh 2,000" },
                        { name: "Exploits Hall", loc: "1st Floor (Door 3)", cap: "50 Guests", day: "Ksh 15,000", eve: "Ksh 4,000" },
                        { name: "Exodus Hall", loc: "2nd Floor (Door 1)", cap: "30 Guests", day: "Ksh 10,000", eve: "Ksh 3,000" },
                        { name: "Courage Hall", loc: "2nd Floor (Door 2)", cap: "70 Guests", day: "Ksh 20,000", eve: "Ksh 8,000" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-bold text-primary">{row.name}</td>
                          <td className="p-4 text-muted-foreground">{row.loc}</td>
                          <td className="p-4 text-muted-foreground">{row.cap}</td>
                          <td className="p-4 font-bold text-secondary">{row.day}</td>
                          <td className="p-4 font-bold text-secondary">{row.eve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="block md:hidden divide-y divide-slate-100">
                  {[
                    { name: "Victory Hall", loc: "Ground Floor", cap: "500 Guests", day: "Ksh 50,000", eve: "Ksh 15,000" },
                    { name: "Wisdom Hall", loc: "1st Floor (Door 1)", cap: "30 Guests", day: "Ksh 10,000", eve: "Ksh 3,000" },
                    { name: "Praise Hall", loc: "1st Floor (Door 2)", cap: "10 Guests", day: "Ksh 5,000", eve: "Ksh 2,000" },
                    { name: "Exploits Hall", loc: "1st Floor (Door 3)", cap: "50 Guests", day: "Ksh 15,000", eve: "Ksh 4,000" },
                    { name: "Exodus Hall", loc: "2nd Floor (Door 1)", cap: "30 Guests", day: "Ksh 10,000", eve: "Ksh 3,000" },
                    { name: "Courage Hall", loc: "2nd Floor (Door 2)", cap: "70 Guests", day: "Ksh 20,000", eve: "Ksh 8,000" },
                  ].map((row, i) => (
                    <div key={i} className="p-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-primary text-lg">{row.name}</h4>
                        <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full font-bold">{row.cap}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{row.loc}</p>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Day Rate</span>
                          <span className="font-bold text-secondary">{row.day}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Evening Rate</span>
                          <span className="font-bold text-secondary">{row.eve}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-slate-50 text-xs text-muted-foreground text-center border-t border-slate-100">
                  Proximity to town CBD, off Lang'ata Road, near T-MALL. Paybill No: 308937 | Account: MPH
                </div>
              </div>

              {/* Discount Text below the table */}
              <div className="bg-accent/5 border border-accent/20 p-4 rounded-xl text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Special Offer</span>
                <h4 className="text-lg font-black text-primary mt-1">20% Discount in August!</h4>
                <p className="text-xs text-muted-foreground">Book with us today and enjoy a great deal in return.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 md:py-16 overflow-hidden hero-gradient">
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
