"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play, Headset, Calendar, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

const portableTextComponents = {
  block: {
    p: ({ children }: any) => <p className="mb-2 leading-relaxed">{children}</p>,
  },
};

interface Sermon {
  title: string;
  preacher: string;
  date: string;
  type: string;
  description: any;
  duration: number;
  image?: string;
  youtubeUrl?: string;
  notes?: any;
}

interface SermonsClientProps {
  sermons: Sermon[];
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function SermonsClient({ sermons }: SermonsClientProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredSermons = sermons.filter(sermon =>
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sermon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Input
              placeholder="Search by title, preacher or topic..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Latest</Button>
            <Button variant="outline" size="sm">Audio</Button>
            <Button variant="outline" size="sm">Video</Button>
          </div>
        </div>

        <div className="grid gap-8">
          {filteredSermons.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-muted-foreground">No Sermons Found</h2>
            </div>
          ) : (
            filteredSermons.map((sermon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden hover:border-primary/30 transition-colors group">
                  <div className="flex flex-col md:flex-row">
                    {/* Mobile Header */}
                    <div className="block md:hidden p-6 pb-2">
                      <h3 className="text-xl font-bold text-primary mb-2">{sermon.title}</h3>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {sermon.date}</span>
                        <span className="flex items-center gap-1"><User className="h-4 w-4" /> {sermon.preacher}</span>
                      </div>
                      <div className="flex">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">{sermon.type}</span>
                      </div>
                    </div>

                    <div className="md:w-1/3 bg-muted relative flex items-center justify-center overflow-hidden">
                      {sermon.youtubeUrl && sermon.type === "Video" && getYouTubeId(sermon.youtubeUrl) ? (
                        <div className="relative w-full h-full min-h-[200px] p-4">
                          <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeId(sermon.youtubeUrl)}`}
                            title={sermon.title}
                            className="absolute inset-0 w-full h-full rounded-lg"
                            allowFullScreen
                          />
                        </div>
                      ) : sermon.image ? (
                        <div className="relative w-full h-full min-h-[200px]">
                          <Image
                            src={sermon.image}
                            alt={sermon.title}
                            fill
                            className="object-cover"
                            unoptimized={true}
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white rounded-full p-4 shadow-lg text-secondary">
                              {sermon.type === "Video" ? <Play className="h-6 w-6 fill-current" /> : <Headset className="h-6 w-6" />}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-full p-6 shadow-lg text-secondary relative z-10 group-hover:scale-110 transition-transform">
                          {sermon.type === "Video" ? <Play className="h-10 w-10 fill-current" /> : <Headset className="h-10 w-10" />}
                        </div>
                      )}
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="hidden md:block">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {sermon.date}</span>
                            <span className="flex items-center gap-1"><User className="h-4 w-4" /> {sermon.preacher}</span>
                            <div className="flex">
                              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">{sermon.type}</span>
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold mb-4 text-primary">{sermon.title}</h3>
                        </div>
                        <div className="text-muted-foreground mb-6">
                          {typeof sermon.description === "string" ? (
                            <p>{sermon.description}</p>
                          ) : (
                            <PortableText value={sermon.description} components={portableTextComponents} />
                          )}
                        </div>
                        {sermon.notes && (
                          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                            <h4 className="text-sm font-bold text-primary mb-2">Sermon Notes</h4>
                            <div className="text-sm text-muted-foreground">
                              {typeof sermon.notes === "string" ? (
                                <p>{sermon.notes}</p>
                              ) : (
                                <PortableText value={sermon.notes} components={portableTextComponents} />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <span className="text-sm font-medium text-muted-foreground">Duration: {sermon.duration} mins</span>
                        {sermon.youtubeUrl ? (
                          <Button variant="secondary" className="gap-2" asChild>
                            <a href={sermon.youtubeUrl} target="_blank" rel="noopener noreferrer">
                              <Play className="h-4 w-4" />
                              Watch on YouTube
                            </a>
                          </Button>
                        ) : (
                          <Button variant="secondary" className="gap-2">
                            {sermon.type === "Video" ? <Play className="h-4 w-4" /> : <Headset className="h-4 w-4" />}
                            Listen Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
