"use client";

import { useEffect, useState, useRef, type RefObject } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  useInView,
} from "framer-motion";
import DraggableCard from "@/components/DraggableCard";
import { menuItems } from "@/data/aboutdata";
import { aboutImagesBySectionId } from "@/data/images";
import { TextAnimate } from "@/components/ui/text-animate";

export default function About({ id }: { id?: string }) {
  const [active, setActive] = useState(menuItems[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5, once: true });
  const [cardsReady, setCardsReady] = useState(false);

  // Find the active menu item
  const activeItem = menuItems.find((item) => item.id === active) || menuItems[0];

  useEffect(() => {
    setCardsReady(false);
  }, [active]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 180, damping: 20 },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  const getMobileLabel = (id: string): string => {
    const labels: Record<string, string> = {
      "who-we-are": "WHO",
      "what-we-do": "WHAT",
      "how-we-build": "HOW",
      "why-started": "WHY",
      "where-headed": "NEXT",
    };
    return labels[id] || id;
  };

  const cardsForActiveSection = (
    aboutImagesBySectionId[active as keyof typeof aboutImagesBySectionId] ??
    aboutImagesBySectionId["who-we-are"]
  ).slice(0, 4);

  const renderCards = (
    cards: { imageUrl: string; size: { width: number; height: number } }[],
    parentRef: RefObject<HTMLDivElement | null>
  ) => {
    const positions: {
      top: number;
      left: number;
      width: number;
      height: number;
    }[] = [];

    const container = parentRef.current;
    if (!container) return null;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    if (containerWidth <= 0 || containerHeight <= 0) return null;

    const checkCollision = (
      top: number,
      left: number,
      width: number,
      height: number
    ) => {
      return positions.some((pos) => {
        const overlapX = left < pos.left + pos.width && left + width > pos.left;
        const overlapY = top < pos.top + pos.height && top + height > pos.top;
        return overlapX && overlapY;
      });
    };

    return cards.map((card, index) => {
      const cardWidth = card.size.width;
      const cardHeight = card.size.height;
      let top = 0;
      let left = 0;
      let attempts = 0;

      const maxTop = Math.max(0, containerHeight - cardHeight);
      const maxLeft = Math.max(0, containerWidth - cardWidth);

      do {
        top = Math.random() * maxTop;
        left = Math.random() * maxLeft;
        attempts++;
      } while (checkCollision(top, left, cardWidth, cardHeight) && attempts < 50);

      positions.push({ top, left, width: cardWidth, height: cardHeight });

      return (
        <motion.div
          key={`${card.imageUrl}-${index}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 22,
            delay: index * 0.06,
          }}
          style={{
            position: "absolute",
            top,
            left,
          }}
          className="pointer-events-auto"
        >
          <DraggableCard
            imageUrl={card.imageUrl}
            size={card.size}
            dragConstraints={parentRef}
            className="hover:shadow-xl"
          />
        </motion.div>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className="min-h-fit w-screen flex flex-col justify-center items-center"
    >
      <div className="font-heading w-full flex justify-end font-bold text-sm px-4 sm:px-8">
        02 ABOUT
      </div>

      <main className="flex flex-col sm:grid sm:grid-cols-4 border-t-2 overflow-hidden w-full h-[90vh] sm:h-[50vh]">
        <aside className="sm:col-span-1 border-b sm:border-b-0 sm:border-r p-4 sm:p-8 overflow-x-auto sm:overflow-hidden">
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex sm:flex-col gap-4 sm:gap-6 text-base sm:text-lg"
          >
            {menuItems.map((item) => {
              return (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => setActive(item.id)}
                  className="cursor-pointer origin-left break-words whitespace-normal max-w-full overflow-hidden flex justify-center sm:justify-start"
                >
                  <span className="sm:hidden flex gap-2">
                    <motion.div
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      className={`flex items-center justify-center font-heading h-10 px-3 rounded-full font-extrabold text-sm ${
                        active === item.id
                          ? "bg-yellow-500"
                          : "bg-gray-200 text-gray-600"
                      }`}
                      animate={{
                        scale: active === item.id ? 1.2 : 1,
                      }}
                    >
                      {getMobileLabel(item.id)}
                    </motion.div>
                  </span>

                  <span className="hidden sm:inline-block">
                    <div
                      className={`cursor-pointer transition-all origin-left break-words font-extrabold font-heading ${
                        active === item.id
                          ? "whitespace-normal scale-125 text-yellow-500 font-extrabold"
                          : "whitespace-nowrap font-bold"
                      }`}
                    >
                      <TextAnimate
                        animation="blurInUp"
                        once
                        by="character"
                        startOnView
                        duration={0.5}
                      >
                        {item.label}
                      </TextAnimate>
                    </div>
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        </aside>

        {/* Content */}
        <section className="relative flex-1 sm:col-span-3 overflow-hidden flex border-t-2 sm:border-t-0 sm:border-l-2">
          <AnimatePresence mode="wait">
            {isInView && (
              <motion.div
                key={active}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                className="relative flex-1"
                onAnimationComplete={() => setCardsReady(true)}
              >
                <div
                  ref={descRef}
                  className="flex flex-col p-4 relative w-full h-full"
                >
                  <motion.h2
                    className="font-heading font-extrabold text-3xl sm:text-6xl uppercase tracking-wider"
                    variants={contentVariants}
                  >
                    0{menuItems.findIndex((item) => item.id === active) + 1}{" "}
                    {activeItem.label}
                  </motion.h2>
                  <motion.div
                    className="font-body font-light mt-4 sm:mt-6 max-w-xl sm:max-w-4xl text-md leading-relaxed"
                    variants={contentVariants}
                  >
                    {activeItem.description}
                  </motion.div>

                  {/* Draggable cards (full content box) */}
                  {cardsReady &&
                    renderCards(
                      cardsForActiveSection.map((imageUrl, i) => ({
                        imageUrl,
                        size:
                          i % 4 === 0
                            ? { width: 170, height: 130 }
                            : i % 4 === 1
                              ? { width: 150, height: 110 }
                              : i % 4 === 2
                                ? { width: 160, height: 150 }
                                : { width: 140, height: 160 },
                      })),
                      descRef
                    )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
