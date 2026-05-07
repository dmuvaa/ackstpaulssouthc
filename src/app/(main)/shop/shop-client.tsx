"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Book } from "lucide-react";
import { Product } from "@/types";

interface ShopClientProps {
  magazines: Product[];
  imageUrls: Record<string, string>;
}

export function ShopClient({ magazines, imageUrls }: ShopClientProps) {
  // Helper to get image URL
  const getImageUrl = (imagePath?: string) => {
    if (!imagePath || !imageUrls[imagePath]) return "/images/communion.jpg"; // fallback image
    return imageUrls[imagePath];
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <section className="bg-secondary py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Church Magazine Store</h1>
          <p className="text-lg text-slate-100 max-w-2xl mx-auto opacity-90">
            Purchase our latest publications to stay spiritually nourished and informed about our parish activities.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {magazines.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-muted-foreground">No magazines available yet.</h3>
            <p className="text-muted-foreground mt-2">Check back later for new releases.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {magazines.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-64 w-full">
                    <Image
                      src={getImageUrl(item.image_path)}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="secondary" className="bg-white/90 text-primary">
                        {item.type}
                      </Badge>
                      {new Date(item.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                        <Badge variant="secondary" className="bg-white/90 text-primary">
                          New Release
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-secondary">{item.type}</span>
                      <span className="text-lg font-bold text-primary">KES {item.price}</span>
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {/* Additional info can go here */}
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button asChild className="w-full gap-2">
                      <Link href={`/shop/${item.id}`}>
                        <Book className="h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
