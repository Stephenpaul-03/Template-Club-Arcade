"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Achieve_CarouselProps {
  images: {
    badge2: ReactNode;
    desc: ReactNode;
    badge1: ReactNode;
    src: string;
    alt: string;
    title: string;
  }[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const Achieve_Carousel = ({
  images,
  className,
  autoplay = false,
  loop = true,
  showNavigation = true,
}: Achieve_CarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [autoplayInstance, setAutoplayInstance] = useState<
    ReturnType<typeof Autoplay> | null
  >(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (autoplay) {
      const plugin = Autoplay({
        delay: 2000,
        stopOnInteraction: true,
        stopOnMouseEnter: false,
        playOnInit: true,
      });
      setAutoplayInstance(plugin);
    }
  }, [autoplay]);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleMouseEnter = () => {
    if (!isMobile && autoplayInstance) {
      autoplayInstance.stop();
      setOverlayVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && autoplayInstance) {
      autoplayInstance.play();
      setOverlayVisible(false);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      if (overlayVisible) {
        setOverlayVisible(false);
        if (autoplayInstance) {
          autoplayInstance.play();
        }
      } else {
        setOverlayVisible(true);
        if (autoplayInstance) {
          autoplayInstance.stop();
        }
      }
    }
  };

  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      const carouselElement = document.querySelector('.carousel-container');
      if (carouselElement && !carouselElement.contains(event.target as Node) && overlayVisible) {
        setOverlayVisible(false);
        if (autoplayInstance) {
          autoplayInstance.play();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, overlayVisible, autoplayInstance]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full carousel-container", className)}
      opts={{
        loop,
        slidesToScroll: 1,
      }}
      plugins={autoplayInstance ? [autoplayInstance] : []}
    >
      <CarouselContent className="flex items-center h-[500px] w-full">
        {images.map((img, index) => (
          <CarouselItem
            key={index}
            className="relative flex h-[81.5%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
          >
            <motion.div
              initial={false}
              animate={{
                clipPath:
                  current !== index ? "inset(15% 0 15% 0)" : "inset(0 0 0 0)",
                y:
                  current === index && overlayVisible
                    ? -10
                    : 0,
                boxShadow:
                  current === index && overlayVisible
                    ? "0px 24px 60px rgba(0,0,0,0.35)"
                    : "0px 10px 30px rgba(0,0,0,0.18)",
              }}
              transition={{
                clipPath: { duration: 0.4, ease: "easeInOut" },
                y: { type: "spring", stiffness: 350, damping: 30 },
                boxShadow: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={current === index ? { y: -12 } : undefined}
              className="h-full w-full relative overflow-hidden rounded-3xl border will-change-transform"
              onMouseEnter={current === index ? handleMouseEnter : undefined}
              onMouseLeave={current === index ? handleMouseLeave : undefined}
              onClick={current === index && isMobile ? handleClick : undefined}
              style={{ cursor: current === index && isMobile ? 'pointer' : 'default' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full scale-105 object-cover"
              />

              {current === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isMobile ? (overlayVisible ? 1 : 0) : (overlayVisible ? 1 : 0)
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl p-4 text-center backdrop-blur-md",
                    "bg-black/50 text-white dark:bg-white/60 dark:text-black"
                  )}
                >
                  <h3 className="text-2xl font-extrabold font-heading tracking-tight">
                    {img.title}
                  </h3>
                  <p className="text-sm font-normal font-body leading-relaxed">
                    {img.desc}
                  </p>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="border-white/30 bg-black/20 text-white dark:border-black/20 dark:bg-white/50 dark:text-black"
                    >
                      {img.badge1}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-white/30 bg-black/20 text-white dark:border-black/20 dark:bg-white/50 dark:text-black"
                    >
                      {img.badge2}
                    </Badge>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence mode="wait">
              {current === index && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-2 flex h-[14%] w-full translate-y-full items-center justify-center p-2 text-center text-lg tracking-tight text-black/80 dark:text-white/80 font-heading font-medium"
                >
                  {img.title}
                </motion.div>
              )}
            </AnimatePresence>
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && !isMobile && (
        <div className="absolute inset-0 z-50 flex items-center justify-between px-4 pointer-events-none">
          <button
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            className="pointer-events-auto rounded-full bg-black/30 p-2 border-2 border-black dark:border-white"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            className="pointer-events-auto rounded-full bg-black/30 p-2 border-2 border-black dark:border-white"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      )}
    </Carousel>
  );
};

export { Achieve_Carousel };
