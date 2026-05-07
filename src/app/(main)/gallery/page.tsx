"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const galleryImages = [
  { src: "/images/congregation.jpg", category: "Worship", title: "Sunday Service" },
  { src: "/images/choir .JPG", category: "Ministries", title: "Church Choir" },
  { src: "/images/choir 1.jpeg", category: "Ministries", title: "Choir in Session" },
  { src: "/images/choir 3.jpg", category: "Ministries", title: "Choir Performance" },
  { src: "/images/band 1.jpg", category: "Worship", title: "Praise & Worship Team" },
  { src: "/images/MU 2.jpeg", category: "Ministries", title: "Mothers' Union" },
  { src: "/images/bishop 1.JPG", category: "Events", title: "Bishop's Visit" },
  { src: "/images/bishop 2.JPG", category: "Events", title: "Episcopal Service" },
  { src: "/images/vicar.jpg", category: "Leadership", title: "The Vicar" },
  { src: "/images/children 1.jpeg", category: "Children", title: "Sunday School" },
  { src: "/images/children 3.jpeg", category: "Children", title: "Children's Ministry" },
  { src: "/images/brigade 1.JPG", category: "Children", title: "Boys & Girls Brigade" },
  { src: "/images/youth.jpg", category: "Youth", title: "Youth Xplosion" },
  { src: "/images/youths bible study hang out .jpeg", category: "Youth", title: "Youth Fellowship" },
  { src: "/images/communion.jpg", category: "Worship", title: "Holy Communion" },
  { src: "/images/dinner .jpeg", category: "Events", title: "Church Dinner" },
  { src: "/images/missions.jpeg", category: "Ministries", title: "Missions & Outreach" },
  { src: "/images/sisters keeper .jpeg", category: "Ministries", title: "Sisters' Keeper" },
];

const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages = filter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const handlePrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
    }
  }, [selectedIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
    }
  }, [selectedIndex, filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrevious, handleNext]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-6"
          >
            Our <span className="text-accent">Gallery</span>
          </motion.h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Capturing the moments of faith, fellowship, and service at ACK St. Paul's South C.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setSelectedIndex(null);
              }}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === cat 
                ? "bg-secondary text-white shadow-lg" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 pb-24">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredImages.map((image, i) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-muted cursor-pointer"
                onClick={() => setSelectedIndex(i)}
              >
                <Image src={image.src} alt={image.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                  <Maximize2 className="h-8 w-8 mb-2" />
                  <h3 className="text-lg font-bold text-center">{image.title}</h3>
                  <Badge variant="secondary" className="mt-2">{image.category}</Badge>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Swipeable Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 touch-none"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 z-[110] text-white hover:text-accent transition-colors" onClick={() => setSelectedIndex(null)}>
              <X className="h-10 w-10" />
            </button>

            {/* Navigation Arrows */}
            <button 
              className="absolute left-6 z-[110] p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hidden md:block"
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button 
              className="absolute right-6 z-[110] p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hidden md:block"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            {/* Image Container with Swipe Support */}
            <motion.div
              key={selectedIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -100) handleNext();
                else if (swipe > 100) handlePrevious();
              }}
              className="relative max-w-5xl w-full h-full max-h-[80vh] cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={filteredImages[selectedIndex].src} alt="Gallery Image" fill className="object-contain pointer-events-none" />
              
              {/* Image Info Overlay */}
              <div className="absolute -bottom-16 left-0 right-0 text-center text-white">
                <h3 className="text-2xl font-bold">{filteredImages[selectedIndex].title}</h3>
                <p className="text-slate-400">{filteredImages[selectedIndex].category} • {selectedIndex + 1} of {filteredImages.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
