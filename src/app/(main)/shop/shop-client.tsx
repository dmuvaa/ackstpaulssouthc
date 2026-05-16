"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Book, Package, Info } from "lucide-react";
import { Product, Merchandise } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopClientProps {
  magazines: Product[];
  merchandise: Merchandise[];
  imageUrls: Record<string, string>;
}

const ITEMS_PER_PAGE = 6;

export function ShopClient({ magazines, merchandise, imageUrls }: ShopClientProps) {
  const [merchPage, setMerchPage] = useState(1);
  const [magPage, setMagPage] = useState(1);

  // Helper to get image URL
  const getImageUrl = (imagePath?: string) => {
    if (!imagePath || !imageUrls[imagePath]) return "/images/communion.jpg"; // fallback image
    return imageUrls[imagePath];
  };

  // Pagination Logic
  const totalMerchPages = Math.ceil(merchandise.length / ITEMS_PER_PAGE);
  const paginatedMerch = merchandise.slice((merchPage - 1) * ITEMS_PER_PAGE, merchPage * ITEMS_PER_PAGE);

  const totalMagPages = Math.ceil(magazines.length / ITEMS_PER_PAGE);
  const paginatedMag = magazines.slice((magPage - 1) * ITEMS_PER_PAGE, magPage * ITEMS_PER_PAGE);

  const PaginationControls = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (p: number) => void }) => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex justify-center items-center gap-2 mt-16">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded-xl border-2 h-12 w-12"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            variant={currentPage === p ? "default" : "outline"}
            onClick={() => onPageChange(p)}
            className={cn(
              "h-12 w-12 rounded-xl border-2 font-black text-lg transition-all",
              currentPage === p ? "shadow-lg scale-110" : "hover:border-primary hover:text-primary"
            )}
          >
            {p}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="rounded-xl border-2 h-12 w-12"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <section className="bg-secondary py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">ACK St Paul&apos;s Parish Shop</h1>
          <p className="text-lg text-slate-100 max-w-2xl mx-auto opacity-90">
            Get your parish magazines, T-shirts, and branded merchandise. All proceeds go to supporting our ministries.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="merchandise" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white p-1 h-14 rounded-full shadow-lg border">
              <TabsTrigger 
                value="merchandise" 
                className="rounded-full px-8 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-lg font-bold"
              >
                Merchandise
              </TabsTrigger>
              <TabsTrigger 
                value="magazines" 
                className="rounded-full px-8 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-lg font-bold"
              >
                Magazines
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="merchandise">
            {merchandise.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-muted-foreground/30">
                <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-2xl font-semibold text-muted-foreground">No merchandise available yet.</h3>
                <p className="text-muted-foreground mt-2">Check back later for new items.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedMerch.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link href={`/shop/merchandise/${item.id}`} className="block h-full group">
                        <Card className="h-full flex flex-col overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 border-none shadow-md bg-white rounded-[2.5rem]">
                          <div className="relative h-80 w-full bg-muted/20 p-8 flex items-center justify-center overflow-hidden">
                            <Image
                              src={getImageUrl(item.image_path)}
                              alt={item.title}
                              fill
                              unoptimized
                              priority={i < 3}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-6 left-6">
                              <Badge variant="secondary" className="bg-white/95 text-primary font-black uppercase tracking-widest text-[10px] px-3 py-1 shadow-sm border-none">
                                {item.category}
                              </Badge>
                            </div>
                            {!item.in_stock && (
                              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                                <Badge variant="destructive" className="text-sm font-black uppercase px-4 py-2 rounded-full">Out of Stock</Badge>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <div className="bg-white text-primary font-bold px-6 py-3 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform">
                                 View Details
                               </div>
                            </div>
                          </div>
                          <CardHeader className="pb-2 px-8 pt-8">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">{item.category}</span>
                              <span className="text-2xl font-black text-primary tracking-tighter">KES {item.price}</span>
                            </div>
                            <CardTitle className="text-2xl font-black text-primary leading-tight group-hover:text-secondary transition-colors uppercase tracking-tight">
                              {item.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-base text-muted-foreground font-medium mt-2">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1 px-8" />
                          <CardFooter className="px-8 pb-8">
                            <Button 
                              className="w-full h-14 text-lg font-black uppercase tracking-tighter rounded-2xl gap-3 shadow-lg group-hover:bg-secondary group-hover:scale-[1.02] transition-all" 
                              disabled={!item.in_stock}
                            >
                              <ShoppingCart className="h-5 w-5" />
                              Order Now
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <PaginationControls 
                  currentPage={merchPage} 
                  totalPages={totalMerchPages} 
                  onPageChange={setMerchPage} 
                />
              </>
            )}
          </TabsContent>

          <TabsContent value="magazines">
            {magazines.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-muted-foreground/30">
                <Book className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-2xl font-semibold text-muted-foreground">No magazines available yet.</h3>
                <p className="text-muted-foreground mt-2">Check back later for new releases.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedMag.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link href={`/shop/${item.id}`} className="block h-full group">
                        <Card className="h-full flex flex-col overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 border-none shadow-md bg-white rounded-[2.5rem]">
                          <div className="relative h-80 w-full bg-muted/20 p-8 flex items-center justify-center overflow-hidden">
                            <Image
                              src={getImageUrl(item.image_path)}
                              alt={item.title}
                              fill
                              unoptimized
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-6 left-6 flex gap-2">
                              <Badge variant="secondary" className="bg-white/95 text-primary font-black uppercase tracking-widest text-[10px] px-3 py-1 shadow-sm border-none">
                                {item.type}
                              </Badge>
                              {new Date(item.created_at) > new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) && (
                                <Badge className="bg-gold text-white font-black uppercase tracking-widest text-[10px] px-3 py-1 shadow-sm border-none">
                                  New
                                </Badge>
                              )}
                            </div>
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <div className="bg-white text-primary font-bold px-6 py-3 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform">
                                 Read Details
                               </div>
                            </div>
                          </div>
                          <CardHeader className="pb-2 px-8 pt-8">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">{item.type}</span>
                              <span className="text-2xl font-black text-primary tracking-tighter">KES {item.price}</span>
                            </div>
                            <CardTitle className="text-2xl font-black text-primary leading-tight group-hover:text-secondary transition-colors uppercase tracking-tight">
                              {item.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-base text-muted-foreground font-medium mt-2">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1 px-8" />
                          <CardFooter className="px-8 pb-8">
                            <Button className="w-full h-14 text-lg font-black uppercase tracking-tighter rounded-2xl gap-3 shadow-lg group-hover:bg-secondary group-hover:scale-[1.02] transition-all">
                              <ShoppingCart className="h-5 w-5" />
                              Order Now
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <PaginationControls 
                  currentPage={magPage} 
                  totalPages={totalMagPages} 
                  onPageChange={setMagPage} 
                />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
