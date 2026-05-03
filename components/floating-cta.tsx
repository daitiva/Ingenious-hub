"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall } from "lucide-react";

export function FloatingCTA() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="fixed bottom-5 right-5 z-40 md:bottom-7 md:right-7"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-3 text-sm font-medium text-white shadow-[0_18px_40px_-12px_rgba(13,148,136,0.7)] transition-transform hover:scale-[1.02] active:scale-[0.98] md:px-5"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              <PhoneCall className="h-3.5 w-3.5" />
              <span className="absolute inset-0 rounded-full ring-2 ring-white/40 animate-pulse-ring" />
            </span>
            <span className="hidden sm:inline">Book Free Strategy Call</span>
            <span className="sm:hidden">Book Call</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
