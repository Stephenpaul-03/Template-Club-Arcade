import React from "react";
import { projectImage } from "./images";

export type ProjectData = {
  id: string;
  title: string;
  src: string;
  ctaGithubLink?: string;
  badges?: string[];
  content: React.ReactNode | (() => React.ReactNode);
};

export const projectsData: ProjectData[] = [
  {
    id: "1",
    title: "Instant Restart Loop",
    src: projectImage[0],
    ctaGithubLink: "",
    badges: ["UX", "Flow"],
    content:
      "Flow over friction — instant retries that drop you back into gameplay without menus or downtime, keeping sessions continuous and improvement-focused.",
  },
  {
    id: "2",
    title: "Feel-First Timing",
    src: projectImage[1],
    ctaGithubLink: "",
    badges: ["Gameplay", "Precision"],
    content:
      "Consistency you can trust — timing and collision rules tuned to respond predictably so outcomes feel fair and repeatable across devices.",
  },
  {
    id: "3",
    title: "Modern Readability Pass",
    src: projectImage[2],
    ctaGithubLink: "",
    badges: ["UI", "Clarity"],
    content:
      "Clarity under pressure — cleaner effects, better contrast, and reduced visual noise so the important signals stand out during fast play.",
  },
  {
    id: "4",
    title: "Practice Tools",
    src: projectImage[3],
    ctaGithubLink: "",
    badges: ["Training", "Speedrun"],
    content:
      "Learn without breaking flow — ghosts, checkpoints, and targeted drills integrated into gameplay so players improve specific skills without restarting entire runs.",
  },
  {
    id: "5",
    title: "Input & Remap Layer",
    src: projectImage[4],
    ctaGithubLink: "",
    badges: ["Controls", "Accessibility"],
    content:
      "Control that adapts to you — full remapping and adaptive layouts across controller/keyboard/touch, with accessibility options that remove barriers without changing the challenge.",
  },
  {
    id: "6",
    title: "Style-Safe Visual Upgrade",
    src: projectImage[5],
    ctaGithubLink: "",
    badges: ["Art", "Polish"],
    content:
      "New polish, same identity — modernized lighting, animation, and effects that boost clarity while preserving classic silhouettes and pacing.",
  },
  {
    id: "7",
    title: "Local Party First",
    src: projectImage[6],
    ctaGithubLink: "",
    badges: ["Co-op", "Versus"],
    content:
      "Designed for real-world play — quick co-op and versus with minimal setup and clear UI so multiplayer is immediate and social.",
  },
  {
    id: "8",
    title: "Smart Difficulty Options",
    src: projectImage[7],
    ctaGithubLink: "",
    badges: ["Assist", "Challenge"],
    content:
      "Challenge that scales with you — assist toggles and scalable curves that welcome new players while preserving a true mode for purists.",
  },
  {
    id: "9",
    title: "Community Hooks",
    src: projectImage[8],
    ctaGithubLink: "",
    badges: ["Mods", "UGC"],
    content:
      "Extend the experience — shareable challenges and seeds plus light customization that boosts replayability without breaking the intended feel.",
  },
  {
    id: "10",
    title: "Cross-Device Profile",
    src: projectImage[9],
    ctaGithubLink: "",
    badges: ["Cloud", "Progress"],
    content:
      "Your progress, everywhere — a unified profile that carries unlocks and best runs across devices for seamless continuity.",
  },
];
