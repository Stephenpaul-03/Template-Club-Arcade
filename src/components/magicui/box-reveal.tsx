"use client";

import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef, type JSX } from "react";

export type BoxRevealPosition = "left" | "right" | "top" | "bottom";

interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  boxColor?: string; // Can pass Tailwind class instead if preferred
  duration?: number;
  position?: BoxRevealPosition;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor,
  duration = 0.75,
  position = "left",
}: BoxRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Get slide direction variants based on position
  const getSlideVariants = () => {
    switch (position) {
      case "right":
        return {
          hidden: { x: "0%" },
          visible: { x: "-100%" },
        };
      case "top":
        return {
          hidden: { y: "0%" },
          visible: { y: "-100%" },
        };
      case "bottom":
        return {
          hidden: { y: "0%" },
          visible: { y: "100%" },
        };
      case "left":
      default:
        return {
          hidden: { x: "-100%" },
          visible: { x: "100%" },
        };
    }
  };

  // Get content animation variants based on position
  const getContentVariants = () => {
    switch (position) {
      case "right":
        return {
          hidden: { opacity: 0, x: -75 },
          visible: { opacity: 1, x: 0 },
        };
      case "top":
        return {
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        };
      case "bottom":
        return {
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 },
        };
      case "left":
      default:
        return {
          hidden: { opacity: 0, x: 75 },
          visible: { opacity: 1, x: 0 },
        };
    }
  };

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  const slideVariants = getSlideVariants();
  const contentVariants = getContentVariants();

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        overflow: "hidden",
        display: width === "100%" ? "block" : "inline-block",
      }}
    >
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={contentVariants}
        transition={{ duration, delay: 0.25 }}
      >
        {children}
      </motion.div>

      <motion.div
        initial="hidden"
        animate={slideControls}
        variants={slideVariants}
        transition={{ duration, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          background: boxColor,
        }}
      />
    </div>
  );
};
