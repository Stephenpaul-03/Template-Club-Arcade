import { PHMan, PHWoman, PH_Man, PH_Woman } from "./images";
import { type JSX } from "react";
import {
  Users,
  Palette,
  Code,
  Crown,
  Image,
  Music,
  Check,
  Heart,
  Search,
} from "lucide-react";

// --- Tab Color Type ---
export type TabColor =
  | "blue"
  | "yellow"
  | "cyan"
  | "green"
  | "purple"
  | "pink"
  | "orange"
  | "red";

// --- Tabs ---
export const tabs: {
  key: string;
  title: string;
  icon: JSX.Element;
  color: TabColor;
}[] = [
  { key: "directors", title: "Directors", icon: <Crown className="w-4 h-4" />, color: "blue" },
  { key: "design", title: "Design", icon: <Palette className="w-4 h-4" />, color: "purple" },
  { key: "dev", title: "Development", icon: <Code className="w-4 h-4" />, color: "green" },
  { key: "art", title: "Art", icon: <Image className="w-4 h-4" />, color: "yellow" },
  { key: "audio", title: "Audio", icon: <Music className="w-4 h-4" />, color: "cyan" },
  { key: "qa", title: "QA", icon: <Check className="w-4 h-4" />, color: "orange" },
  { key: "producers", title: "Producers", icon: <Users className="w-4 h-4" />, color: "pink" },
  { key: "community", title: "Community", icon: <Heart className="w-4 h-4" />, color: "red" },
  { key: "accessibility", title: "Accessibility", icon: <Search className="w-4 h-4" />, color: "cyan" },
];


// --- Color Map ---
export const colorMap: Record<
  TabColor,
  {
    background: string;
    text: string;
    icon: string;
    heading: string;
    backgroundDark: string;
    textDark: string;
    headingDark: string;
  }
> = {
  blue: {
    background: "bg-blue-600/50",
    text: "text-white",
    icon: "text-blue-300",
    heading: "text-blue-600",
    backgroundDark: "bg-blue-800/50",
    textDark: "text-gray-100",
    headingDark: "text-blue-400",
  },
  yellow: {
    background: "bg-yellow-600/50",
    text: "text-white",
    icon: "text-yellow-300",
    heading: "text-yellow-600",
    backgroundDark: "bg-yellow-700/50",
    textDark: "text-gray-100",
    headingDark: "text-yellow-400",
  },
  cyan: {
    background: "bg-cyan-600/50",
    text: "text-white",
    icon: "text-cyan-300",
    heading: "text-cyan-600",
    backgroundDark: "bg-cyan-800/50",
    textDark: "text-gray-100",
    headingDark: "text-cyan-400",
  },
  green: {
    background: "bg-green-600/50",
    text: "text-white",
    icon: "text-green-300",
    heading: "text-green-600",
    backgroundDark: "bg-green-800/50",
    textDark: "text-gray-100",
    headingDark: "text-green-400",
  },
  purple: {
    background: "bg-purple-600/50",
    text: "text-white",
    icon: "text-purple-300",
    heading: "text-purple-600",
    backgroundDark: "bg-purple-800/50",
    textDark: "text-gray-100",
    headingDark: "text-purple-400",
  },
  pink: {
    background: "bg-pink-600/50",
    text: "text-white",
    icon: "text-pink-300",
    heading: "text-pink-600",
    backgroundDark: "bg-pink-800/50",
    textDark: "text-gray-100",
    headingDark: "text-pink-400",
  },
  orange: {
    background: "bg-orange-600/50",
    text: "text-white",
    icon: "text-orange-300",
    heading: "text-orange-600",
    backgroundDark: "bg-orange-800/50",
    textDark: "text-gray-100",
    headingDark: "text-orange-400",
  },
  red: {
    background: "bg-red-600/50",
    text: "text-white",
    icon: "text-red-300",
    heading: "text-red-600",
    backgroundDark: "bg-red-800/50",
    textDark: "text-gray-100",
    headingDark: "text-red-400",
  },
};

// --- Team Cards ---
export const teamCards: Record<
  string,
  {
    src: string;
    alt: string;
    name: string;
    role: string;
    githubUrl?: string;
    linkedinUrl?: string;
  }[]
> = {
  directors: [
    {
      src: PHMan,
      alt: "Studio Director",
      name: "Avery Cole",
      role: "Creative Director",
      githubUrl: "",
      linkedinUrl: "",
    },
    {
      src: PHWoman,
      alt: "Studio Director",
      name: "Sienna Brooks",
      role: "Studio Director",
      githubUrl: "",
      linkedinUrl: "",
    },
  ],
  design: [
    {
      src: PH_Woman,
      alt: "Lead Designer",
      name: "Mina Park",
      role: "Lead Designer",
      githubUrl: "",
      linkedinUrl: "",
    },
    {
      src: PH_Man,
      alt: "Systems Designer",
      name: "Eli Navarro",
      role: "Systems Designer",
      githubUrl: "",
      linkedinUrl: "",
    },
  ],
  dev: [
    {
      src: PHMan,
      alt: "Technical Lead",
      name: "Rowan Tate",
      role: "Technical Lead",
      githubUrl: "",
      linkedinUrl: "",
    },
    {
      src: PHWoman,
      alt: "Gameplay Engineer",
      name: "Priya Singh",
      role: "Gameplay Engineer",
      githubUrl: "",
      linkedinUrl: "",
    },
  ],
  art: [
    {
      src: PH_Woman,
      alt: "Art Director",
      name: "Nora Wren",
      role: "Art Director",
      githubUrl: "",
      linkedinUrl: "",
    },
    {
      src: PH_Man,
      alt: "UI Artist",
      name: "Lucas Reed",
      role: "UI Artist",
      githubUrl: "",
      linkedinUrl: "",
    },
  ],
  audio: [
    {
      src: PHMan,
      alt: "Audio Lead",
      name: "Jules Hart",
      role: "Audio Lead",
      githubUrl: "",
      linkedinUrl: "",
    },
    {
      src: PHWoman,
      alt: "Sound Designer",
      name: "Maya Chen",
      role: "Sound Designer",
      githubUrl: "",
      linkedinUrl: "",
    },
  ],
  qa: [
    {
      src: PH_Woman,
      alt: "QA Lead",
      name: "Samira Lane",
      role: "QA Lead",
      githubUrl: "",
      linkedinUrl: "",
    },
    {
      src: PH_Man,
      alt: "QA Engineer",
      name: "Owen Pierce",
      role: "QA Engineer",
      githubUrl: "",
      linkedinUrl: "",
    },
  ],
  producers: [
    {
      src: PHMan,
      alt: "Producer",
      name: "Kai Morgan",
      role: "Producer",
      githubUrl: "",
      linkedinUrl: "",
    },
    {
      src: PHWoman,
      alt: "Associate Producer",
      name: "Lena Ortiz",
      role: "Associate Producer",
      githubUrl: "",
      linkedinUrl: "",
    },
  ],
  community: [
    {
      src: PH_Woman,
      alt: "Community Lead",
      name: "Iris Vega",
      role: "Community Lead",
      githubUrl: "",
      linkedinUrl: "",
    },
    {
      src: PH_Man,
      alt: "Community Manager",
      name: "Jordan Blake",
      role: "Community Manager",
      githubUrl: "",
      linkedinUrl: "",
    },
  ],
  accessibility: [
    {
      src: PHMan,
      alt: "Accessibility Lead",
      name: "Devon Grey",
      role: "Accessibility Lead",
      githubUrl: "",
      linkedinUrl: "",
    },
    {
      src: PHWoman,
      alt: "Accessibility Designer",
      name: "Amara Patel",
      role: "Accessibility Designer",
      githubUrl: "",
      linkedinUrl: "",
    },
  ],
};


// --- Content ---
export const content: Record<
  string,
  {
    title: string;
    description: JSX.Element;
    mobile_description: JSX.Element;
  }
> = {
  directors: {
    title: "DIRECTORS",
    description: (
      <p>
        <span className="italic font-medium">Setting the direction, protecting the vision</span>
        <br />
        <br />
        Directors define what each recoat should preserve and what can evolve. They focus on maintaining the original gameplay identity while guiding decisions around design, pacing, and overall experience.
        <br />
        <br />
        Their role is to make sure every project feels intentional. If something improves clarity or flow without breaking the core, it stays. If it drifts too far from the original feel, it gets cut.
      </p>
    ),
    mobile_description: (
      <p>
        Protect the vision.<br />
        Keep the feel.<br />
        Cut the drift.
      </p>
    ),
  },
  design: {
    title: "DESIGN",
    description: (
      <p>
        <span className="italic font-medium">Shaping how it plays</span>
        <br />
        <br />
        The design team focuses on gameplay structure, balance, and player interaction. They break down classic systems and rebuild them in ways that feel intuitive without losing depth.
        <br />
        <br />
        Their work ensures that every decision the player makes feels meaningful, readable, and consistent from start to finish.
      </p>
    ),
    mobile_description: (
      <p>
        Balance & flow.<br />
        Intuitive systems.<br />
        Meaningful choices.
      </p>
    ),
  },
  dev: {
    title: "DEVELOPMENT",
    description: (
      <p>
        <span className="italic font-medium">Making it responsive</span>
        <br />
        <br />
        Development is responsible for turning design into something that feels smooth and reliable. Input handling, performance, and system behavior are all tuned to make sure the game responds exactly when and how it should.
        <br />
        <br />
        The focus is on consistency across devices, ensuring that the experience feels the same whether you’re on desktop, console, or mobile.
      </p>
    ),
    mobile_description: (
      <p>
        Low latency.<br />
        Consistent behavior.<br />
        Smooth everywhere.
      </p>
    ),
  },
  art: {
    title: "ART",
    description: (
      <p>
        <span className="italic font-medium">Clarity over noise</span>
        <br />
        <br />
        The art team works on modernizing visuals without overwhelming the player. Every element is designed to be readable, with attention to contrast, motion, and hierarchy.
        <br />
        <br />
        The goal is not to make things flashy, but to make them understandable at a glance — especially during fast gameplay.
      </p>
    ),
    mobile_description: (
      <p>
        Readable visuals.<br />
        Strong hierarchy.<br />
        Clean motion.
      </p>
    ),
  },
  audio: {
    title: "AUDIO",
    description: (
      <p>
        <span className="italic font-medium">Feedback you can feel</span>
        <br />
        <br />
        Audio design reinforces player actions through clear and responsive feedback. Every sound is tuned to match timing and impact, helping players understand what’s happening without relying only on visuals.
        <br />
        <br />
        It’s subtle, but essential — good audio makes the game feel alive and responsive.
      </p>
    ),
    mobile_description: (
      <p>
        Timing-first cues.<br />
        Clear feedback.<br />
        Alive feel.
      </p>
    ),
  },
  qa: {
    title: "QA",
    description: (
      <p>
        <span className="italic font-medium">Nothing feels “off”</span>
        <br />
        <br />
        QA focuses on identifying inconsistencies in gameplay feel, timing, and behavior. They test how systems hold up under real play conditions and make sure everything behaves as expected.
        <br />
        <br />
        Their job is to catch the small issues that can break immersion, ensuring the final experience feels polished and reliable.
      </p>
    ),
    mobile_description: (
      <p>
        Catch the off.<br />
        Keep it fair.<br />
        Ship polish.
      </p>
    ),
  },
  producers: {
    title: "PRODUCERS",
    description: (
      <p>
        <span className="italic font-medium">Keeping things moving</span>
        <br />
        <br />
        Producers coordinate across teams to keep projects on track and aligned. They balance timelines, priorities, and scope to make sure ideas actually turn into finished experiences.
        <br />
        <br />
        They make sure nothing gets stuck and everything moves forward with purpose.
      </p>
    ),
    mobile_description: (
      <p>
        Align teams.<br />
        Manage scope.<br />
        Ship on time.
      </p>
    ),
  },
  community: {
    title: "COMMUNITY",
    description: (
      <p>
        <span className="italic font-medium">Connecting players and ideas</span>
        <br />
        <br />
        The community team focuses on how players interact with the experience beyond gameplay. They gather feedback, observe behavior, and help shape future improvements based on real usage.
        <br />
        <br />
        Their role keeps the work grounded in how people actually play, not just how it’s designed.
      </p>
    ),
    mobile_description: (
      <p>
        Listen & learn.<br />
        Share challenges.<br />
        Shape updates.
      </p>
    ),
  },
  accessibility: {
    title: "ACCESSIBILITY",
    description: (
      <p>
        <span className="italic font-medium">Designed for everyone</span>
        <br />
        <br />
        Accessibility ensures that systems can be experienced by as many players as possible. From control customization to visual adjustments, this team works to remove barriers without compromising gameplay.
        <br />
        <br />
        Their focus is on inclusion — making sure the experience remains playable, flexible, and fair.
      </p>
    ),
    mobile_description: (
      <p>
        Remap & adjust.<br />
        Remove barriers.<br />
        Fair for all.
      </p>
    ),
  },
};
