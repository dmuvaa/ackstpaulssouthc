"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type MagazineReaderProps = {
  title: string;
  pdfUrl: string;
  downloadUrl: string;
  expiresAt: string;
};

type FlipEvent = {
  data?: number;
};

type FlipBookRef = {
  pageFlip: () =>
    | {
        flipNext: () => void;
        flipPrev: () => void;
      }
    | undefined;
};

type MagazinePageProps = {
  children: ReactNode;
  pageNumber: number;
};

const MagazinePage = forwardRef<HTMLDivElement, MagazinePageProps>(
  ({ children, pageNumber }, ref) => (
    <div
      ref={ref}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white shadow-xl"
    >
      {children}
      <span className="absolute bottom-3 right-4 rounded bg-white/80 px-2 py-1 text-xs font-medium text-zinc-500">
        {pageNumber}
      </span>
    </div>
  )
);
MagazinePage.displayName = "MagazinePage";

function getReaderSize() {
  if (typeof window === "undefined") {
    return { width: 420, height: 594 };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const maxPageWidth = viewportWidth >= 1024 ? 500 : viewportWidth - 32;
  const maxPageHeight = viewportHeight - 210;
  const width = Math.max(280, Math.min(maxPageWidth, Math.floor(maxPageHeight / 1.414)));

  return {
    width,
    height: Math.round(width * 1.414),
  };
}

export function MagazineReader({ title, pdfUrl, downloadUrl, expiresAt }: MagazineReaderProps) {
  const bookRef = useRef<FlipBookRef>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const [readerSize, setReaderSize] = useState(getReaderSize);

  const pages = useMemo(() => {
    return Array.from({ length: numPages }, (_, index) => index + 1);
  }, [numPages]);

  useEffect(() => {
    function handleResize() {
      setReaderSize(getReaderSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleFlip(event: FlipEvent) {
    if (typeof event.data === "number") {
      setCurrentPage(event.data);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5">
        <header className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
            <p className="mt-1 text-sm text-white/60">
              Reader link expires {new Date(expiresAt).toLocaleDateString()}.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="gap-2"
              onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="gap-2"
              onClick={() => bookRef.current?.pageFlip()?.flipNext()}
              disabled={numPages === 0 || currentPage >= numPages - 1}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button asChild type="button" variant="outline" size="sm" className="gap-2 bg-white text-zinc-950">
              <a href={downloadUrl}>
                <Download className="h-4 w-4" />
                Download
              </a>
            </Button>
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center py-6">
          {loadError ? (
            <div className="max-w-md rounded-lg border border-white/10 bg-white/5 p-6 text-center">
              <h2 className="text-lg font-semibold">Reader could not load this magazine</h2>
              <p className="mt-2 text-sm text-white/60">
                You can still use the secure download button above.
              </p>
            </div>
          ) : (
            <Document
              file={pdfUrl}
              loading={
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading magazine pages...
                </div>
              }
              error={
                <div className="text-sm text-white/70">
                  Unable to load the magazine PDF.
                </div>
              }
              onLoadSuccess={({ numPages: nextNumPages }) => {
                setNumPages(nextNumPages);
                setReaderSize(getReaderSize());
              }}
              onLoadError={() => setLoadError(true)}
            >
              {numPages > 0 && (
                <HTMLFlipBook
                  ref={bookRef}
                  className="reader-flipbook"
                  style={{}}
                  startPage={0}
                  size="stretch"
                  width={readerSize.width}
                  height={readerSize.height}
                  minWidth={280}
                  maxWidth={520}
                  minHeight={396}
                  maxHeight={736}
                  drawShadow
                  flippingTime={850}
                  usePortrait
                  startZIndex={0}
                  autoSize
                  maxShadowOpacity={0.35}
                  showCover
                  mobileScrollSupport
                  clickEventForward
                  useMouseEvents
                  swipeDistance={30}
                  showPageCorners
                  disableFlipByClick={false}
                  onFlip={handleFlip}
                  renderOnlyPageLengthChange
                >
                  {pages.map((pageNumber) => (
                    <MagazinePage key={pageNumber} pageNumber={pageNumber}>
                      <Page
                        pageNumber={pageNumber}
                        width={readerSize.width}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        loading={
                          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                            Rendering page {pageNumber}...
                          </div>
                        }
                      />
                    </MagazinePage>
                  ))}
                </HTMLFlipBook>
              )}
            </Document>
          )}
        </section>

        <footer className="pb-3 text-center text-sm text-white/50">
          Page {Math.min(currentPage + 1, numPages || 1)} of {numPages || "..."}
        </footer>
      </div>
    </main>
  );
}
