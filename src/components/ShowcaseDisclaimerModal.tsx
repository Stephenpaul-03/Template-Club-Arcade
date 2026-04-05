"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "horizon-showcase-disclaimer-dismissed-v1";

export default function ShowcaseDisclaimerModal() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore storage failures
    }
  };

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
      if (!dismissed) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="showcase-disclaimer-title"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-black/35 dark:bg-black/55"
            onClick={close}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: 12, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 12, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border/70 bg-card/90 p-6 shadow-lg backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="showcase-disclaimer-title"
                  className="font-heading text-xl font-extrabold tracking-tight"
                >
                  Quick heads-up
                </h2>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  A few notes before you explore this UI demo.
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <ol className="mt-4 list-decimal space-y-3 pl-5 font-body text-sm leading-relaxed text-foreground/90 marker:text-muted-foreground">
              <li>
                This is a showcase page for the UI — please take everything with
                a grain of salt.
              </li>
              <li>
                The images are AI-generated (I know that’s not ideal, but I
                don’t want to spend an artist’s time on placeholder visuals).
              </li>
              <li>
                If something here is close to real work, contact me at{" "}
                <a
                  href="mailto:stephenpaul4040@gmail.com"
                  className="font-medium underline underline-offset-4 hover:opacity-90"
                >
                  stephenpaul4040@gmail.com
                </a>
                .
              </li>
              <li className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span>Best experienced in dark mode.</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "w-fit",
                    isDark && "pointer-events-none opacity-60"
                  )}
                >
                  Switch to dark
                </Button>
              </li>
              <li>
                The hero section is meant to be adaptable — it can be swapped or
                tuned based on the situation.
              </li>
            </ol>

            <div className="mt-5 flex items-center justify-end gap-2">
              <Button type="button" variant="secondary" onClick={close}>
                Got it
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
