import React from "react";

export interface AboutSection {
  id: string;
  title: string;
  heading: string;
  description: string;
}

export interface MenuItem {
  id: string;
  label: string;
  description: React.ReactNode;
}

export const menuItems: MenuItem[] = [
  {
    id: "who-we-are",
    label: "WHO WE ARE",
    description: (
      <>
        RetroByte Studio exists because we couldn’t let the good stuff fade out. The kind of games you don’t really “learn”, you just{" "}
        <em>get</em> — the ones your hands remember before your brain does. We’re a small team chasing that exact feeling, not trying to reinvent classics or strip them down, but bringing them forward in a way that actually fits today.
        <br />
        <br />
        We’re not here to redesign the soul out of these games. The rules, pacing, and rhythm stay intact — that’s the whole point. What we do is refine everything around it so it feels natural on modern hardware. Same experience at the core, just without the rough edges that used to get in the way.
      </>
    ),
  },
  {
    id: "what-we-do",
    label: "WHAT WE DO",
    description: (
      <>
        We take classic game ideas — maze chasers, block puzzlers, arcade shooters, platformers — and rebuild them so they hit instantly. No confusion, no friction, no awkward onboarding. You launch the game and you’re already playing, with everything behaving exactly the way you expect it to.
        <br />
        <br />
        At the same time, we layer in modern improvements where they actually make sense. Leaderboards, co-op modes, ghost runs, accessibility options — features that enhance the experience without overwhelming it. The focus is always on clarity and replayability, not complexity for the sake of it.
      </>
    ),
  },
  {
    id: "how-we-build",
    label: "HOW WE BUILD",
    description: (
      <>
        Everything starts with feel. Movement timing, hit windows, camera rhythm — all the small details that make a game satisfying to play. That’s the part we protect above everything else, because once that’s off, nothing else matters.
        <br />
        <br />
        From there, we rebuild the surrounding systems — visuals, UI, controls, tutorials, and performance. These are the parts that should evolve with time, and we treat them like a proper upgrade layer. If something makes the experience smoother without changing its core identity, it stays. If it doesn’t, it goes.
      </>
    ),
  },
  {
    id: "why-started",
    label: "WHY WE STARTED",
    description: (
      <>
        A lot of classic games are stuck behind unnecessary friction — old hardware, awkward ports, and menus that fight you before the fun even starts. You end up spending more time adjusting than actually playing, and that takes away from what made those games special in the first place.
        <br />
        <br />
        We started RetroByte Studio to fix that. For us, it’s about respect — respecting the original design, respecting the player’s time, and respecting modern expectations like accessibility and smooth performance. A visual upgrade isn’t enough; the real improvement is removing friction while keeping the same heartbeat.
      </>
    ),
  },
  {
    id: "where-headed",
    label: "WHERE WE'RE HEADED",
    description: (
      <>
        Right now, we’re building what we call the Arcade Shelf — a collection of small, focused games designed for quick sessions, clean gameplay loops, and instant restarts. The kind of games that fit easily into your time but are hard to put down once you start.
        <br />
        <br />
        Alongside that, we’re working on better practice tools like ghost runs, checkpoints, and drills that help players improve naturally. Long-term, the goal is to create a shared experience across platforms, where your progress, unlocks, and best runs follow you everywhere without interruption.
      </>
    ),
  },
];


export const aboutSections: Record<string, AboutSection> = {
  "who-we-are": {
    id: "who-we-are",
    title: "Who We Are",
    heading: "The feel you remember",
    description:
      "We bring classic games forward without losing the rhythm — so they fit modern devices without losing what made them great.",
  },
  "what-we-do": {
    id: "what-we-do",
    title: "What We Do",
    heading: "Instantly playable",
    description:
      "Recoats of classic genres with fast starts, clean onboarding, and modern features that enhance the experience without complicating it.",
  },
  "how-we-build": {
    id: "how-we-build",
    title: "How We Build",
    heading: "Feel-first process",
    description:
      "We protect timing and feedback first, then rebuild the surrounding systems — visuals, UI, controls, tutorials, and performance.",
  },
  "why-started": {
    id: "why-started",
    title: "Why We Started",
    heading: "Remove friction",
    description:
      "Classic fun shouldn’t be locked behind awkward ports or clunky menus — we remove the rough edges while keeping the same heartbeat.",
  },
  "where-headed": {
    id: "where-headed",
    title: "Where We're Headed",
    heading: "Arcade Shelf",
    description:
      "A collection of small, focused games with practice tools — and one shared profile that keeps your progress and best runs everywhere.",
  },
};
