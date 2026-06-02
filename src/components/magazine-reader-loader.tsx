"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const MagazineReader = dynamic(
  () => import("@/components/magazine-reader").then((mod) => mod.MagazineReader),
  {
    ssr: false,
    loading: () => (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="flex items-center gap-3 text-sm text-white/70">
          <Loader2 className="h-5 w-5 animate-spin" />
          Opening magazine reader...
        </div>
      </main>
    ),
  }
);

type MagazineReaderLoaderProps = {
  title: string;
  pdfUrl: string;
  downloadUrl: string;
  expiresAt: string;
};

export function MagazineReaderLoader(props: MagazineReaderLoaderProps) {
  return <MagazineReader {...props} />;
}
