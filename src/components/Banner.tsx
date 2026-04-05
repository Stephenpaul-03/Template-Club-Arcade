"use client";

import { BoxReveal, type BoxRevealPosition } from "./magicui/box-reveal";
import { motion } from "framer-motion";

interface BannerProps {
  titleLine1: string;
  titleLine2: string;
  shapeColor?: string;
  shapeCount?: number;
  justify?: string;
  nextpage?: string;
  boxColor?: string;
  time?: number;
  boxRevealPosition?: BoxRevealPosition;
  boxRevealPositionLine1?: BoxRevealPosition;
  boxRevealPositionLine2?: BoxRevealPosition;
}

export default function Banner({
  titleLine1,
  titleLine2,
  nextpage,
  boxColor,
  time,
  boxRevealPosition = "left",
  boxRevealPositionLine1,
  boxRevealPositionLine2
}: BannerProps) {

  // Default to boxRevealPosition if individual positions not specified
  const line1Position = boxRevealPositionLine1 ?? boxRevealPosition
  const line2Position = boxRevealPositionLine2 ?? boxRevealPosition

  return (
    <div className="relative w-full h-[20vh] md:h-[25vh] border-y-2 overflow-hidden">
      {/* Centered Titles */}
      <div className="absolute inset-0 flex items-center justify-center px-2">
        <div className="text-center space-y-2">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="font-extrabold font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
          >
            <BoxReveal boxColor={boxColor} duration={time} position={line1Position}>
              <span>{titleLine1}</span>
            </BoxReveal>
          </motion.h2>
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-extrabold font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
          >
            <BoxReveal boxColor={boxColor} position={line2Position}>
              <span>{titleLine2}</span>
            </BoxReveal>
          </motion.h2>
        </div>
      </div>

      {/* Bottom Right Nextpage */}
      {nextpage && (
        <div className="absolute bottom-2 right-2 md:bottom-1 md:right-5 z-10">
          <div className="font-extrabold font-heading text-xs sm:text-sm">
            {nextpage}
          </div>
        </div>
      )}
    </div>
  );
}
