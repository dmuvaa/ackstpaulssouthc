"use client";

import { FileText, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Blog Management</h2>
        <p className="text-muted-foreground">Publish stories, news, and spiritual reflections.</p>
      </div>

      <Card className="border-dashed border-2 bg-muted/30">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center text-primary">
            <FileText className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Manage Blogs in Sanity CMS</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Blog posts are now managed directly in Sanity CMS. Click the button below to open the studio.
            </p>
          </div>
          <Button asChild className="mt-4">
            <Link href="/studio" target="_blank" className="gap-2">
              Open Sanity Studio <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
