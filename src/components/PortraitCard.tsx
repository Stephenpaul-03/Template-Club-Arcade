"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

interface PortraitCardProps {
  src: string;
  alt: string;
  name?: string;
  role?: string;
  displayName?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  mailUrl?: string;
}

export default function PortraitCard({
  src,
  alt,
  name = "Member Name",
  role = "Department / Role",
  displayName = "Display Name",
  githubUrl,
  linkedinUrl,
  mailUrl,
}: PortraitCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [tapLocked, setTapLocked] = useState(false);

  /* -----------------------------
     FIX 2: Safe URL handling
  ------------------------------ */
  const handleIconClick = (e: React.MouseEvent, url?: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!url || url === "#") return;

    const finalUrl =
      url.startsWith("http") || url.startsWith("mailto:")
        ? url
        : `https://${url}`;

    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  /* -----------------------------
     FIX 3: Mobile tap guard
  ------------------------------ */
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isActive) {
      setIsActive(true);
      setTapLocked(true);

      // Prevent same tap from triggering buttons
      setTimeout(() => setTapLocked(false), 300);
    }
  };

  return (
    <div
      className="p-2 sm:p-4 w-full sm:max-w-xs mx-auto"
      onClick={handleCardClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="relative overflow-hidden rounded-xl shadow-md bg-black/5 border border-black/10 transition-transform duration-300 hover:scale-105">
        <div className="relative w-full h-75 md:h-100">
          {/* Image */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/60 transition-all duration-300 flex items-center justify-center
    ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
          >

            {/* Icons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {linkedinUrl && linkedinUrl !== "#" && (
                <button
                  onClick={(e) => {
                    if (tapLocked) return;
                    handleIconClick(e, linkedinUrl);
                  }}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </button>
              )}

              {githubUrl && githubUrl !== "#" && (
                <button
                  onClick={(e) => {
                    if (tapLocked) return;
                    handleIconClick(e, githubUrl);
                  }}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full"
                >
                  <Github className="w-6 h-6 text-white" />
                </button>
              )}

              {mailUrl && mailUrl !== "#" && (
                <button
                  onClick={(e) => {
                    if (tapLocked) return;
                    handleIconClick(e, mailUrl);
                  }}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full"
                >
                  <Mail className="w-6 h-6 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Name gradient */}
          <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <div className="text-white font-extrabold text-lg whitespace-pre-line font-heading">
              {name}
            </div>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-2 text-xs sm:text-sm text-gray-600 font-body">{role}</div>
      <div className="text-sm sm:text-base mt-1 font-extrabold font-heading">{displayName}</div>
    </div>
  );
}
