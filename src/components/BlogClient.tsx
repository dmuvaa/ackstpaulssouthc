"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

interface BlogClientProps {
  posts: Post[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <section className="bg-primary py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog & Parish News</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Stay informed with the latest updates, stories of impact, and spiritual reflections from our community.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-muted-foreground">No Blogs Published yet</h2>
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden group hover:shadow-2xl transition-all duration-300 relative">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized={true}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button variant="link" className="p-0 text-primary font-bold gap-2 group/btn" asChild>
                      <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                        Read More <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-24 bg-primary rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="text-slate-300">Get weekly updates, sermon notes, and event reminders delivered straight to your inbox.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed!"); }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 h-12 rounded-lg bg-white/10 border border-white/20 px-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
              <Button variant="gold" className="h-12 px-8 font-bold">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
