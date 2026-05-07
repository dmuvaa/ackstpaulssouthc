"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play, Headset, Calendar, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const sermons = [
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

export default function SermonsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <section className="bg-primary py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Sermon Archive</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Missed a service? Catch up on our latest teachings and be nourished by the Word.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title, preacher or topic..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Latest</Button>
            <Button variant="outline" size="sm">Audio</Button>
            <Button variant="outline" size="sm">Video</Button>
          </div>
        </div>

        <div className="grid gap-8">
          {sermons.map((sermon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-hidden hover:border-primary/30 transition-colors group">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-muted relative flex items-center justify-center p-12 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 transition-colors group-hover:bg-primary/10" />
                    {sermon.type === "Video" ? (
                      <div className="bg-white rounded-full p-6 shadow-lg text-primary relative z-10 group-hover:scale-110 transition-transform">
                        <Play className="h-10 w-10 fill-current" />
                      </div>
                    ) : (
                      <div className="bg-white rounded-full p-6 shadow-lg text-secondary relative z-10 group-hover:scale-110 transition-transform">
                        <Headset className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="md:w-2/3 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {sermon.date}</span>
                        <span className="flex items-center gap-1"><User className="h-4 w-4" /> {sermon.preacher}</span>
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">{sermon.type}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-primary">{sermon.title}</h3>
                      <p className="text-muted-foreground mb-6">{sermon.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Duration: {sermon.duration}</span>
                      <Button variant="secondary" className="gap-2">
                        {sermon.type === "Video" ? <Play className="h-4 w-4" /> : <Headset className="h-4 w-4" />}
                        Listen Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
