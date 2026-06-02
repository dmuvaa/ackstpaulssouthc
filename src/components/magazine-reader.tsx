"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, PointerEvent, ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Maximize2,
  Minimize2,
  Move,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type MagazineReaderProps = {
  title: string;
  pdfUrl: string;
  downloadUrl: string;
  expiresAt: string;
  canDownload: boolean;
};

type FitMode = "page" | "width";

type FlipEvent = {
  data?: number;
};

type FlipBookRef = {
  pageFlip: () =>
    | {
        flip: (page: number) => void;
        flipNext: () => void;
        flipPrev: () => void;
      }
    | undefined;
};

type MagazinePageProps = {
  children: ReactNode;
  pageNumber: number;
};

type DragState = {
  active: boolean;
  x: number;
  y: number;
  scrollLeft: number;
  scrollTop: number;
};

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2.5;
const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 800 };

const MagazinePage = forwardRef<HTMLDivElement, MagazinePageProps>(
  ({ children, pageNumber }, ref) => (
    <div
      ref={ref}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white shadow-2xl ring-1 ring-black/10"
    >
      {children}
      <span className="absolute bottom-3 right-4 rounded bg-white/85 px-2 py-1 text-xs font-medium text-zinc-500 shadow-sm">
        {pageNumber}
      </span>
    </div>
  )
);
MagazinePage.displayName = "MagazinePage";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getViewportSize() {
  if (typeof window === "undefined") {
    return DEFAULT_VIEWPORT_SIZE;
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function getReaderSize(
  aspectRatio: number,
  fitMode: FitMode,
  zoom: number,
  viewport: { width: number; height: number }
) {
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const horizontalPadding = viewportWidth >= 1024 ? 96 : 24;
  const verticalChrome = viewportWidth >= 768 ? 168 : 210;
  const maxWidth = Math.max(280, viewportWidth - horizontalPadding);
  const maxHeight = Math.max(360, viewportHeight - verticalChrome);

  const baseWidth = fitMode === "width"
    ? maxWidth
    : Math.min(maxWidth, maxHeight * aspectRatio);
  const width = Math.round(baseWidth * zoom);

  return {
    width,
    height: Math.round((baseWidth / aspectRatio) * zoom),
  };
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function MagazineReader({
  title,
  pdfUrl,
  downloadUrl,
  expiresAt,
  canDownload,
}: MagazineReaderProps) {
  const bookRef = useRef<FlipBookRef>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState>({
    active: false,
    x: 0,
    y: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInput, setPageInput] = useState("1");
  const [loadError, setLoadError] = useState(false);
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [fitMode, setFitMode] = useState<FitMode>("page");
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1.414);
  const [viewportSize, setViewportSize] = useState(getViewportSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pages = useMemo(() => {
    return Array.from({ length: numPages }, (_, index) => index + 1);
  }, [numPages]);

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl: string | null = null;

    async function loadPdf() {
      try {
        const response = await fetch(pdfUrl, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load magazine PDF");
        }

        const blob = await response.blob();
        if (!controller.signal.aborted) {
          objectUrl = URL.createObjectURL(blob);
          setPdfObjectUrl(objectUrl);
          setPdfLoading(false);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Magazine PDF fetch error:", error);
          setLoadError(true);
          setPdfLoading(false);
        }
      }
    }

    loadPdf();
    return () => {
      controller.abort();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [pdfUrl]);

  const readerSize = useMemo(
    () => getReaderSize(aspectRatio, fitMode, zoom, viewportSize),
    [aspectRatio, fitMode, zoom, viewportSize]
  );

  useEffect(() => {
    function handleResize() {
      setViewportSize(getViewportSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  function handleFlip(event: FlipEvent) {
    if (typeof event.data === "number") {
      const nextPage = event.data;
      setCurrentPage(nextPage);
      setPageInput(String(nextPage + 1));
    }
  }

  async function setDominantAspectRatio(pdf: { numPages: number; getPage: (pageNumber: number) => Promise<{ getViewport: (options: { scale: number }) => { width: number; height: number } }> }) {
    const samplePageNumber = Math.min(2, pdf.numPages);
    const page = await pdf.getPage(samplePageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const nextAspectRatio = clamp(viewport.width / viewport.height, 0.65, 1.8);
    setAspectRatio(nextAspectRatio);
  }

  function goToPage(pageNumber: number) {
    const nextPage = clamp(pageNumber, 1, numPages);
    bookRef.current?.pageFlip()?.flip(nextPage - 1);
    setCurrentPage(nextPage - 1);
    setPageInput(String(nextPage));
  }

  function handlePageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goToPage(Number(pageInput));
  }

  function changeZoom(nextZoom: number) {
    setZoom(clamp(nextZoom, MIN_ZOOM, MAX_ZOOM));
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await document.documentElement.requestFullscreen();
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (zoom <= 1 && fitMode === "page") return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    dragRef.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag.active || !viewport) return;

    viewport.scrollLeft = drag.scrollLeft - (event.clientX - drag.x);
    viewport.scrollTop = drag.scrollTop - (event.clientY - drag.y);
  }

  function stopDragging() {
    dragRef.current.active = false;
    setIsDragging(false);
  }

  return (
    <main className="min-h-screen bg-[#0c0d10] text-white">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-white/10 bg-[#15171d]/95 px-4 py-3 shadow-lg backdrop-blur md:px-6">
          <div className="mx-auto flex max-w-[1800px] flex-col gap-3">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
                <p className="mt-1 text-xs text-white/55 md:text-sm">
                  Lifetime reader access. {canDownload
                    ? `PDF download available until ${new Date(expiresAt).toLocaleDateString()}.`
                    : "PDF download period has ended."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  title="Previous page"
                  onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  title="Next page"
                  onClick={() => bookRef.current?.pageFlip()?.flipNext()}
                  disabled={numPages === 0 || currentPage >= numPages - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <form onSubmit={handlePageSubmit} className="flex items-center gap-2 rounded-md bg-white/8 px-2 py-1">
                  <Input
                    value={pageInput}
                    onChange={(event) => setPageInput(event.target.value.replace(/[^0-9]/g, ""))}
                    className="h-8 w-14 border-white/15 bg-black/20 text-center text-white"
                    aria-label="Page number"
                  />
                  <span className="text-xs text-white/50">/ {numPages || "..."}</span>
                </form>
                <Button
                  type="button"
                  variant={fitMode === "page" ? "default" : "secondary"}
                  size="sm"
                  onClick={() => {
                    setFitMode("page");
                    setZoom(1);
                  }}
                >
                  Fit Page
                </Button>
                <Button
                  type="button"
                  variant={fitMode === "width" ? "default" : "secondary"}
                  size="sm"
                  onClick={() => {
                    setFitMode("width");
                    setZoom(1);
                  }}
                >
                  Fit Width
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  title="Zoom out"
                  onClick={() => changeZoom(zoom - 0.15)}
                  disabled={zoom <= MIN_ZOOM}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="min-w-12 text-center text-xs text-white/55">{formatPercent(zoom)}</span>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  title="Zoom in"
                  onClick={() => changeZoom(zoom + 0.15)}
                  disabled={zoom >= MAX_ZOOM}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                {canDownload ? (
                  <Button asChild type="button" variant="outline" size="sm" className="gap-2 bg-white text-zinc-950">
                    <a href={downloadUrl}>
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </Button>
                ) : (
                  <Button type="button" variant="outline" size="sm" disabled>
                    Download expired
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <section
          ref={viewportRef}
          className={`relative flex flex-1 overflow-auto bg-[radial-gradient(circle_at_center,#22252d_0,#0c0d10_58%)] p-3 md:p-6 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onPointerLeave={stopDragging}
        >
          <div className="m-auto">
            {loadError ? (
              <div className="max-w-md rounded-lg border border-white/10 bg-white/5 p-6 text-center">
                <h2 className="text-lg font-semibold">Reader could not load this magazine</h2>
                <p className="mt-2 text-sm text-white/60">
                  You can still use the secure download option while the download window is open.
                </p>
              </div>
            ) : pdfLoading || !pdfObjectUrl ? (
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading magazine pages...
              </div>
            ) : (
              <Document
                file={pdfObjectUrl}
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
                onLoadSuccess={(pdf) => {
                  setNumPages(pdf.numPages);
                  setDominantAspectRatio(pdf);
                }}
                onLoadError={() => setLoadError(true)}
              >
                {numPages > 0 && (
                  <HTMLFlipBook
                    ref={bookRef}
                    className="reader-flipbook"
                    style={{}}
                    startPage={0}
                    size="fixed"
                    width={readerSize.width}
                    height={readerSize.height}
                    minWidth={readerSize.width}
                    maxWidth={readerSize.width}
                    minHeight={readerSize.height}
                    maxHeight={readerSize.height}
                    drawShadow
                    flippingTime={850}
                    usePortrait
                    startZIndex={0}
                    autoSize
                    maxShadowOpacity={0.35}
                    showCover
                    mobileScrollSupport
                    clickEventForward
                    useMouseEvents={zoom <= 1.05 && fitMode === "page"}
                    swipeDistance={30}
                    showPageCorners={zoom <= 1.05}
                    disableFlipByClick={zoom > 1.05 || fitMode === "width"}
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
          </div>
          {(zoom > 1 || fitMode === "width") && (
            <div className="pointer-events-none fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/65 px-4 py-2 text-xs text-white/70 shadow-lg backdrop-blur">
              <Move className="h-4 w-4" />
              Drag to pan
            </div>
          )}
        </section>

        <footer className="border-t border-white/10 bg-[#15171d] px-4 py-2 text-center text-sm text-white/50">
          Page {Math.min(currentPage + 1, numPages || 1)} of {numPages || "..."}
        </footer>
      </div>
    </main>
  );
}
