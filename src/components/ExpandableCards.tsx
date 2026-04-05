"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Badge } from "@/components/ui/badge";
import { GridPattern } from "./magicui/grid-pattern";
import { Github } from "lucide-react";

export type ExpandableCard = {
  id: string;
  title: string;
  src: string;
  ctaGithubLink?: string;
  badges?: string[];
  content: React.ReactNode | (() => React.ReactNode);
};

type ExpandableCardsProps = {
  cards: ExpandableCard[];
};

export function Expandable_Cards({ cards }: ExpandableCardsProps) {
  const [active, setActive] = useState<ExpandableCard | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }

    document.body.style.overflow = active ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Background overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-[90vw] max-h-[85vh] md:w-full md:max-w-[400px]  flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-lg"
            >
              {/* Image */}
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-48 md:h-80 object-cover object-top"
                />
              </motion.div>

              <div className="flex-1 min-h-0 overflow-y-auto">
                {/* Title + CTA Buttons */}
                <div className="flex justify-between items-start gap-4 px-4 pt-4">
                  <motion.h3
                    layoutId={`title-${active.id}-${id}`}
                    className="font-extrabold text-neutral-700 dark:text-white text-lg font-heading"
                  >
                    {active.title}
                  </motion.h3>

                  {/* Icon Buttons */}
                  <motion.div
                    layout
                    className="flex gap-2 shrink-0"
                  >
                    {/* GitHub Button */}
                    {active.ctaGithubLink && (
                      <motion.a
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={active.ctaGithubLink}
                        target="_blank"
                        title="View on GitHub"
                        className="p-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Badges */}
                {active.badges && active.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 px-4 pb-2">
                    {active.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="font-heading">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="pt-2 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base flex flex-col items-start gap-4 dark:text-neutral-400 font-body pb-6 md:pb-10"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="relative w-full overflow-hidden">
        <GridPattern className="absolute inset-0 -z-10" />
        <ul className="relative grid grid-cols-2 md:grid-cols-5 gap-5 w-full items-start bg-transparent p-10">
          {cards.map((card) => (
            <motion.div
              layoutId={`card-${card.id}-${id}`}
              key={card.id}
              onClick={() => setActive(card)}
              whileHover={{ scale: 1.025 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="flex flex-col border-2 border-transparent rounded-lg cursor-pointer shadow-sm bg-white dark:bg-neutral-500 h-[250px] md:h-[350px] overflow-hidden"
            >
              <div className="flex flex-col h-full rounded-lg">
                <motion.div
                  layoutId={`image-${card.id}-${id}`}
                  className="flex-1 min-h-0"
                >
                  <img
                    src={card.src}
                    alt={card.title}
                    className="h-full w-full object-cover object-top"
                  />
                </motion.div>

                <div className="flex flex-col items-center text-center py-3 gap-2 shrink-0">
                  <motion.h3
                    layoutId={`title-${card.id}-${id}`}
                    className="font-extrabold font-heading text-neutral-800 dark:text-white uppercase text-sm md:text-md whitespace-break-spaces overflow-hidden line-clamp-2 md:line-clamp-1"
                  >
                    {card.title}
                  </motion.h3>
                  {/* Badges in grid card */}
                  {card.badges && card.badges.length > 0 && (
                    <div className="flex gap-1 justify-center px-1">
                      {card.badges.slice(0, 1).map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs font-extrabold px-1 py-0 md:text-xs md:px-2 md:py-0.5 font-heading">
                          {badge}
                        </Badge>
                      ))}
                      {card.badges.length > 1 && (
                        <Badge variant="secondary" className="text-xs font-extrabold px-2 py-0.5 font-heading">
                          +{card.badges.length - 1}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </ul>
      </div>
    </>
  );
}
