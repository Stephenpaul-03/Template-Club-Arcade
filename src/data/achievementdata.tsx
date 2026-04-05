import { achievementImagesByTitle } from "./images";

type AchievementTitle = keyof typeof achievementImagesByTitle;

type AchievementItem = {
  src: string;
  alt: string;
  title: AchievementTitle;
  desc: string;
  badge1: string;
  badge2: string;
};

const achievementItems: Omit<AchievementItem, "src">[] = [
  {
    alt: "Pac-Man",
    title: "Pac-Man",
    desc: "A maze-chaser recoat — a readability-first Pac-Man modernization that keeps the iconic chase rhythm intact while improving responsiveness, cleaner UI, and faster restarts so decisions stay clear under pressure.",
    badge1: "Maze",
    badge2: "Recoat #01",
  },
  {
    alt: "Tetris",
    title: "Tetris",
    desc: "A falling-block puzzle rework — tighter input, clearer previews, and smoother stacking feedback to keep players in flow, with optional practice tools that help learning without losing the original’s simplicity.",
    badge1: "Puzzle",
    badge2: "Recoat #02",
  },
  {
    alt: "Space Invaders",
    title: "Space Invaders",
    desc: "A single-screen shooter recoat — improved visual hierarchy and responsiveness so patterns and projectiles stay readable as intensity rises, with subtle assists that broaden accessibility without changing pacing.",
    badge1: "Shooter",
    badge2: "Recoat #03",
  },
  {
    alt: "Breakout",
    title: "Breakout",
    desc: "A physics-driven arcade rework — refined paddle response, collisions, and feedback for predictable, satisfying angles, backed by clearer visuals so speed and impact are easy to read.",
    badge1: "Arcade",
    badge2: "Recoat #04",
  },
  {
    alt: "Snake",
    title: "Snake",
    desc: "A minimalist survival loop recoat — tighter controls and clearer spatial cues that improve planning as pace ramps up, with small QoL tweaks that help readability without removing tension.",
    badge1: "Survival",
    badge2: "Recoat #05",
  },
  {
    alt: "Pong",
    title: "Pong",
    desc: "A foundational system recoat — precision-focused tuning to paddle movement, ball physics, and feedback so each hit feels intentional and consistent, with modern display clarity while keeping mechanics unchanged.",
    badge1: "Classic",
    badge2: "Recoat #06",
  },
];

export const Achievementdata: AchievementItem[] = achievementItems.map((item) => ({
  ...item,
  src: achievementImagesByTitle[item.title],
}));
