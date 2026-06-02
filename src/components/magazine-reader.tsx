"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
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
};

type FlipEvent = {
  data?: number | { page?: number };
};

type PageFlipController = {
  flipNext?: () => void;
  flipPrev?: () => void;
  turnToNextPage?: () => void;
  turnToPrevPage?: () => void;
  turnToPage?: (page: number) => void;
  getCurrentPageIndex?: () => number;
};

type FlipBookRef = {
  pageFlip: () => PageFlipController | undefined;
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

const MIN_ZOOM = 0.85;
const MAX_ZOOM = 2.25;
const DEFAULT_ASPECT_RATIO = 1.414;

const MagazinePage = forwardRef<HTMLDivElement, MagazinePageProps>(
  ({ children, pageNumber }, ref) => (
    <div
      ref={ref}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white shadow-2xl ring-1 ring-black/15"
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
    return { width: 1280, height: 800 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function getReaderSize(aspectRatio: number, zoom: number, viewport: { width: number; height: number }) {
  const headerHeight = viewport.width >= 768 ? 118 : 156;
  const footerHeight = 42;
  const horizontalPadding = viewport.width >= 1024 ? 88 : 24;
  const availableWidth = Math.max(320, viewport.width - horizontalPadding);
  const availableHeight = Math.max(360, viewport.height - headerHeight - footerHeight);
  const baseWidth = Math.min(availableWidth, availableHeight * aspectRatio);

  return {
    width: Math.round(baseWidth * zoom),
    height: Math.round((baseWidth / aspectRatio) * zoom),
  };
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function MagazineReader({ title, pdfUrl }: MagazineReaderProps) {
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
  const [loadError, setLoadError] = useState(false);
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(DEFAULT_ASPECT_RATIO);
  const [viewportSize, setViewportSize] = useState(getViewportSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pages = useMemo(() => {
    return Array.from({ length: numPages }, (_, index) => index + 1);
  }, [numPages]);

  const readerSize = useMemo(
    () => getReaderSize(aspectRatio, zoom, viewportSize),
    [aspectRatio, zoom, viewportSize]
  );
  const isPanEnabled = zoom > 1.05;
  const bookKey = `${readerSize.width}x${readerSize.height}:${isPanEnabled ? "pan" : "flip"}`;

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

  function syncCurrentPage(pageFlip = bookRef.current?.pageFlip()) {
    const pageIndex = pageFlip?.getCurrentPageIndex?.();
    if (typeof pageIndex === "number") {
      setCurrentPage(pageIndex);
    }
  }

  function getEventPage(event: FlipEvent) {
    if (typeof event.data === "number") {
      return event.data;
    }

    if (typeof event.data?.page === "number") {
      return event.data.page;
    }

    return null;
  }

  function handleFlip(event: FlipEvent) {
    const pageIndex = getEventPage(event);
    if (typeof pageIndex === "number") {
      setCurrentPage(pageIndex);
    }
  }

  async function detectMagazineShape(pdf: {
    numPages: number;
    getPage: (pageNumber: number) => Promise<{
      getViewport: (options: { scale: number }) => { width: number; height: number };
    }>;
  }) {
    const samplePageNumber = Math.min(2, pdf.numPages);
    const page = await pdf.getPage(samplePageNumber);
    const viewport = page.getViewport({ scale: 1 });
    setAspectRatio(clamp(viewport.width / viewport.height, 0.7, 1.8));
  }

  function changeZoom(nextZoom: number) {
    setZoom(clamp(nextZoom, MIN_ZOOM, MAX_ZOOM));
  }

  function flipPreviousPage() {
    const pageFlip = bookRef.current?.pageFlip();
    if (!pageFlip) return;

    if (typeof pageFlip.flipPrev === "function") {
      pageFlip.flipPrev();
    } else {
      pageFlip.turnToPrevPage?.();
      syncCurrentPage(pageFlip);
    }
  }

  function flipNextPage() {
    const pageFlip = bookRef.current?.pageFlip();
    if (!pageFlip) return;

    if (typeof pageFlip.flipNext === "function") {
      pageFlip.flipNext();
    } else {
      pageFlip.turnToNextPage?.();
      syncCurrentPage(pageFlip);
    }
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await document.documentElement.requestFullscreen();
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!isPanEnabled) return;
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
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-white/10 bg-zinc-950/95 px-4 py-4 backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-[1800px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
              <p className="mt-1 text-sm text-white/55">
                Swipe or use the arrows to turn pages. Zoom in to drag and pan.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="gap-2"
                onClick={flipPreviousPage}
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
                onClick={flipNextPage}
                disabled={numPages === 0 || currentPage >= numPages - 1}
              >
                Next
                <ChevronRight className="h-4 w-4" />
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
            </div>
          </div>
        </header>

        <section
          ref={viewportRef}
          className={`relative flex flex-1 overflow-auto bg-[radial-gradient(circle_at_center,#1d2028_0,#090a0d_62%)] p-4 md:p-6 ${
            isPanEnabled ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
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
                  Please refresh the page and try again.
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
                  detectMagazineShape(pdf);
                }}
                onLoadError={() => setLoadError(true)}
              >
                {numPages > 0 && (
                  <div
                    className="mx-auto"
                    style={{
                      width: readerSize.width,
                      height: readerSize.height,
                    }}
                  >
                    <HTMLFlipBook
                      key={bookKey}
                      ref={bookRef}
                      className="reader-flipbook"
                      style={{
                        width: readerSize.width,
                        maxWidth: readerSize.width,
                        height: readerSize.height,
                      }}
                      startPage={currentPage}
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
                      autoSize={false}
                      maxShadowOpacity={0.35}
                      showCover
                      mobileScrollSupport
                      clickEventForward
                      useMouseEvents={!isPanEnabled}
                      swipeDistance={30}
                      showPageCorners={!isPanEnabled}
                      disableFlipByClick={isPanEnabled}
                      onFlip={handleFlip}
                      onInit={(event: FlipEvent) => {
                        const pageIndex = getEventPage(event);
                        if (typeof pageIndex === "number") {
                          setCurrentPage(pageIndex);
                        } else {
                          syncCurrentPage();
                        }
                      }}
                      onUpdate={(event: FlipEvent) => {
                        const pageIndex = getEventPage(event);
                        if (typeof pageIndex === "number") {
                          setCurrentPage(pageIndex);
                        }
                      }}
                    >
                      {pages.map((pageNumber) => (
                        <MagazinePage key={pageNumber} pageNumber={pageNumber}>
                          <Page
                            pageNumber={pageNumber}
                            height={readerSize.height}
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
                  </div>
                )}
              </Document>
            )}
          </div>
          {isPanEnabled && (
            <div className="pointer-events-none fixed bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/65 px-4 py-2 text-xs text-white/70 shadow-lg backdrop-blur">
              <Move className="h-4 w-4" />
              Drag to pan
            </div>
          )}
        </section>

        <footer className="border-t border-white/10 bg-zinc-950 px-4 py-2 text-center text-sm text-white/50">
          Page {Math.min(currentPage + 1, numPages || 1)} of {numPages || "..."}
        </footer>
      </div>
    </main>
  );
}
