export const dynamic = "force-dynamic";

import { fetchSanity } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Calendar, User, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-xl md:text-3xl font-bold text-primary mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-lg md:text-2xl font-bold text-primary mt-6 mb-3">{children}</h3>,
    p: ({ children }: any) => <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>,
  },
};

interface BlogPost {
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  content: any; // Portable Text content
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Next.js 16 async params

  const post = await fetchSanity<BlogPost>(`*[_type == "blog" && slug.current == $slug][0] {
    title,
    date,
    author,
    category,
    "image": image.asset->url,
    content
  }`, { slug });

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-muted-foreground">Post not found</h1>
        <Button asChild className="mt-4">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button asChild variant="ghost" className="mb-4 md:mb-8 gap-2">
          <Link href="/blog"><ChevronLeft className="h-4 w-4" /> Back to Blog</Link>
        </Button>

        <article className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 md:p-12 pb-6">
            <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            
            <h1 className="text-2xl md:text-4xl font-bold text-primary mt-2 mb-4">{post.title}</h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
            </div>
          </div>

          {post.image && (
            <div className="relative h-96 w-full">
              <Image
                src={`${post.image}?w=1200&auto=format`}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized={true}
              />
            </div>
          )}

          <div className="p-8 md:p-12 pt-6">
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.content} components={portableTextComponents} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
