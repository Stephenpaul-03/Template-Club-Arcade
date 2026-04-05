"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./theme/mode-toggle";
import { motion, AnimatePresence } from "framer-motion";

import { LuMail, LuGithub, LuLinkedin } from "react-icons/lu";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [forcedExpand, setForcedExpand] = useState(false);
  const collapseTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!forcedExpand) {
        setCollapsed(window.scrollY > 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forcedExpand]);

  useEffect(() => {
    if (forcedExpand) {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
      collapseTimer.current = setTimeout(() => {
        setForcedExpand(false);
        setCollapsed(true);
      }, 5000);
    }
  }, [forcedExpand]);

  const handleMenuClick = () => {
    setForcedExpand(true);
    setCollapsed(false);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex w-full px-4 md:px-6 justify-between pointer-events-none">
      <AnimatePresence mode="wait">
        {!collapsed ? (
          <motion.div
            key="expanded-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 md:gap-3 rounded-full border border-white/20 bg-white/10 px-3 py-2 md:px-4 md:py-2 backdrop-blur-lg shadow-lg dark:border-white/10 dark:bg-black/30 pointer-events-auto"
          >
            <Button
              asChild
              variant="link"
              size="icon"
              className="rounded-full hover:text-red-500 hover:scale-110 transition-all"
            >
              <a
href="mailto:Stephenpaul4040@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuMail className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </Button>

            <Button
              asChild
              variant="link"
              size="icon"
              className="rounded-full hover:text-blue-500 hover:scale-110 transition-all"
            >
              <a
href="https://www.linkedin.com/in/stephen-paul-i/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuLinkedin className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </Button>

            <Button
              asChild
              variant="link"
              size="icon"
              className="rounded-full hover:text-gray-500 hover:scale-110 transition-all"
            >
              <a
href="https://github.com/Stephenpaul-03"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuGithub className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ scale: 0.5, opacity: 0, x: -20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.5, opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 md:p-3 backdrop-blur-lg shadow-lg dark:border-white/10 dark:bg-black/30 pointer-events-auto cursor-pointer"
            onClick={handleMenuClick}
          >
            <Menu className="h-4 w-4 md:h-5 md:w-5 dark:text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {!collapsed && (
        <motion.div
          key="expanded-right"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex items-center rounded-full border border-white/20 bg-white/10 px-2 py-1 md:px-3 md:py-2 backdrop-blur-lg shadow-lg dark:border-white/10 dark:bg-black/30 pointer-events-auto"
        >
          <ModeToggle />
        </motion.div>
      )}
    </div>
  );
}
