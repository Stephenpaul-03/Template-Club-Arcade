"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { type EmblaCarouselType } from "embla-carousel";
import TextHighlighter, {
  type TextHighlighterRef,
} from "@/components/fancy/text/text-highlighter";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { partnersData } from "@/data/partnerdata";
import { LinkPreview } from "@/components/ui/link-preview";

const PartnerSlide = ({
  floatingImages,
  showcaseimages,
  CompanyName,
  Description,
  highlightColor,
  partnerLink,
  fontClass,
}: {
  floatingImages: {
    url: string;
    sizeClass: string;
    depth: number;
    className: string;
  }[];
  CompanyName: string;
  Description: string;
  highlightColor: string;
  fontClass?: string;
  partnerLink?: string;
  showcaseimages: string[];
}) => {
  const [scope, animate] = useAnimate();
  const highlightRef = useRef<TextHighlighterRef>(null);

  // --- simplified tap-vs-swipe tracking ---
  const tapStartRef = useRef<{ x: number; y: number } | null>(null);
  const didMoveRef = useRef(false);

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const openRafRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const bodyOverflowRef = useRef<string | null>(null);

  const closePreview = useCallback(() => {
    if (openRafRef.current) window.cancelAnimationFrame(openRafRef.current);
    setIsPreviewOpen(false);
    if (bodyOverflowRef.current !== null) {
      document.body.style.overflow = bodyOverflowRef.current;
      bodyOverflowRef.current = null;
    }
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setPreviewSrc(null);
    }, 200);
  }, []);

  useEffect(() => {
    if (!scope.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            animate(
              "img",
              { opacity: [0, 1] },
              { duration: 0.5, delay: stagger(0.15) }
            );
            animate(
              ".partner-text",
              { opacity: [0, 1], y: [20, 0] },
              { duration: 0.8, delay: 0.3 }
            );

            const timeout = setTimeout(() => {
              highlightRef.current?.animate();
            }, 1000);

            observer.disconnect();
            return () => clearTimeout(timeout);
          }
        });
      },
      { threshold: [0.9] }
    );

    observer.observe(scope.current);
    return () => observer.disconnect();
  }, [animate, scope]);

  useEffect(() => {
    if (!previewSrc) return;

    const previousOverflow = document.body.style.overflow;
    bodyOverflowRef.current = previousOverflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (bodyOverflowRef.current !== null) {
        document.body.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      } else {
        document.body.style.overflow = previousOverflow;
      }
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closePreview, previewSrc]);

  useEffect(() => {
    return () => {
      if (openRafRef.current) window.cancelAnimationFrame(openRafRef.current);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!previewSrc) return;

    if (openRafRef.current) window.cancelAnimationFrame(openRafRef.current);
    openRafRef.current = window.requestAnimationFrame(() => {
      setIsPreviewOpen(true);
    });

    return () => {
      if (openRafRef.current) window.cancelAnimationFrame(openRafRef.current);
      openRafRef.current = null;
    };
  }, [previewSrc]);

  const openPreview = useCallback(
    (src: string) => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      if (!previewSrc) {
        setIsPreviewOpen(false);
        setPreviewSrc(src);
      } else {
        setPreviewSrc(src);
        setIsPreviewOpen(true);
      }
    },
    [previewSrc]
  );

  // Unified pointer handlers — replace the old pointerUp/pointerCancel/suppressClick approach
  const onPointerDown = (e: React.PointerEvent) => {
    tapStartRef.current = { x: e.clientX, y: e.clientY };
    didMoveRef.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!tapStartRef.current) return;
    const dx = e.clientX - tapStartRef.current.x;
    const dy = e.clientY - tapStartRef.current.y;
    if (Math.hypot(dx, dy) > 8) {
      didMoveRef.current = true;
    }
  };

  const onImageClick = (src: string) => () => {
    if (didMoveRef.current) return; // swipe, not a tap — ignore
    openPreview(src);
  };

  return (
    <div
      ref={scope}
      className={`relative h-[80vh] w-full flex justify-center items-center overflow-hidden select-none ${fontClass || ""}`}
    >
      {/* Invisible, auto-sizing center box + images that cling to it */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-6 px-6 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-12 md:gap-y-0 lg:px-12">
        {/* Mobile: top row images */}
        <div className="mx-auto grid w-full max-w-md grid-cols-3 place-items-center gap-3 md:hidden">
          {floatingImages.slice(8, 11).map((img, index) => (
            <button
              key={`mobile-top-${index}`}
              type="button"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onClick={onImageClick(img.url)}
              aria-label="Open image preview"
              className="bg-transparent border-0 p-0 touch-none"
            >
              <img
                src={img.url}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="h-20 w-28 shrink-0 rounded-none object-cover opacity-0 transition-transform duration-200 ease-out will-change-transform hover:-translate-y-2 hover:-rotate-[2deg] sm:h-24 sm:w-36"
              />
            </button>
          ))}
        </div>

        {/* Desktop: left column */}
        <div className="hidden md:flex md:justify-self-end flex-col items-end gap-4">
          {floatingImages.slice(0, 4).map((img, index) => (
            <button
              key={`desktop-left-${index}`}
              type="button"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onClick={onImageClick(img.url)}
              aria-label="Open image preview"
              className="bg-transparent border-0 p-0"
            >
              <img
                src={img.url}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="h-40 w-60 shrink-0 rounded-none object-cover opacity-0 transition-transform duration-200 ease-out will-change-transform hover:-translate-y-2 hover:-rotate-[2deg] lg:h-44 lg:w-64"
              />
            </button>
          ))}
        </div>

        {/* Center content (invisible box that sizes to content) */}
        <motion.div className="partner-text z-20 md:justify-self-center flex w-fit flex-col items-center justify-center text-center opacity-0 pointer-events-none select-none">
          <div className="pointer-events-auto flex w-fit flex-col items-center justify-center px-4 py-2 md:px-10 md:py-6 select-none">
            {/* Showcase images */}
            {showcaseimages && showcaseimages.length >= 2 && (
              <div className="flex gap-3 md:gap-6 justify-center items-center">
                {showcaseimages.slice(0, 2).map((src, index) => (
                  <button
                    key={index}
                    type="button"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onClick={onImageClick(src)}
                    aria-label="Open image preview"
                    className="bg-transparent border-0 p-0 touch-none"
                  >
                    <img
                      src={src}
                      alt={`showcase-${index}`}
                      draggable={false}
                      className={`w-20 h-20 md:w-32 md:h-32 object-cover rounded-xl shadow-md transition-all 
                        ${
                          index === 0
                            ? "hover:-translate-y-2 hover:scale-115 hover:-rotate-3"
                            : "hover:-translate-y-2 hover:scale-115 hover:rotate-3"
                        }`}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Heading */}
            <div className="mt-4 md:mt-6 text-3xl md:text-5xl lg:text-7xl font-extrabold font-heading">
              <div className="text-center">Meet</div>
              <div className="relative mx-auto w-fit">
                <TextHighlighter
                  ref={highlightRef}
                  highlightColor={highlightColor}
                  triggerType="ref"
                >
                  {CompanyName}
                </TextHighlighter>
                {partnerLink && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 md:-right-10">
                    <LinkPreview url={partnerLink} className="w-fit">
                      <Button
                        variant="link"
                        size="icon"
                        className="transition-all hover:scale-115"
                        style={{ color: highlightColor }}
                        aria-label="Open partner link"
                      >
                        <ExternalLink className="size-4 md:size-6" />
                      </Button>
                    </LinkPreview>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm md:text-base lg:text-lg font-body max-w-xs md:max-w-md text-center">
              {Description}
            </p>
          </div>
        </motion.div>

        {/* Desktop: right column */}
        <div className="hidden md:flex md:justify-self-start flex-col items-start gap-4">
          {floatingImages.slice(4, 8).map((img, index) => (
            <button
              key={`desktop-right-${index}`}
              type="button"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onClick={onImageClick(img.url)}
              aria-label="Open image preview"
              className="bg-transparent border-0 p-0"
            >
              <img
                src={img.url}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="h-40 w-60 shrink-0 rounded-none object-cover opacity-0 transition-transform duration-200 ease-out will-change-transform hover:-translate-y-2 hover:rotate-[2deg] lg:h-44 lg:w-64"
              />
            </button>
          ))}
        </div>

        {/* Mobile: bottom row images */}
        <div className="mx-auto grid w-full max-w-md grid-cols-3 place-items-center gap-3 md:hidden">
          {floatingImages.slice(12, 15).map((img, index) => (
            <button
              key={`mobile-bottom-${index}`}
              type="button"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onClick={onImageClick(img.url)}
              aria-label="Open image preview"
              className="bg-transparent border-0 p-0 touch-none"
            >
              <img
                src={img.url}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="h-20 w-28 shrink-0 rounded-none object-cover opacity-0 transition-transform duration-200 ease-out will-change-transform hover:-translate-y-2 hover:rotate-[2deg] sm:h-24 sm:w-36"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Preview modal */}
      {previewSrc && (
        <div
          className={[
            "fixed inset-0 z-[99998] flex items-center justify-center bg-black/75 p-4",
            "transition-opacity duration-200 ease-out will-change-[opacity] motion-reduce:transition-none",
            isPreviewOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closePreview}
          onWheelCapture={closePreview}
          onTouchMoveCapture={closePreview}
        >
          <div
            className={[
              "relative transition-[opacity,transform] duration-200 ease-out will-change-[opacity,transform] motion-reduce:transition-none",
              isPreviewOpen ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]",
            ].join(" ")}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewSrc}
              alt="Preview"
              className="max-h-[85svh] max-w-[92vw] rounded-none object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={closePreview}
              aria-label="Close preview"
              className="absolute -right-3 -top-3 rounded-full bg-white/85 px-3 py-1 text-sm font-semibold text-black shadow-lg backdrop-blur-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PartnerCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!api) return;

    onScroll(api);
    api
      .on("reInit", onScroll)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);
  }, [api, onScroll]);

  return (
    <div className="relative h-[80vh] w-screen border-y-2 overflow-hidden">
      <Carousel
        setApi={setApi}
        className="h-full w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="h-full w-full">
          {partnersData.map((partner, i) => (
            <CarouselItem key={i} className="h-full w-full overflow-hidden">
              <PartnerSlide {...partner} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Desktop nav buttons */}
        <CarouselPrevious className="absolute bottom-0 left-0 h-[80vh] w-16 backdrop-blur-md border-none shadow-none z-20 items-center justify-center rounded-none hidden md:flex" />
        <CarouselNext className="absolute bottom-0 right-0 h-[80vh] w-16 backdrop-blur-md border-none shadow-none z-20 items-center justify-center rounded-none hidden md:flex" />

        {/* Mobile progress bar */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full overflow-hidden z-30 md:hidden">
          <div
            className="h-full bg-white rounded-full transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${scrollProgress - 100}%, 0px, 0px)`,
              width: "100%",
            }}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default PartnerCarousel;
