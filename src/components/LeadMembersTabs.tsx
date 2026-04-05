import { motion, AnimatePresence, type Transition } from "framer-motion";
import { type ReactNode } from "react";
import { colorMap } from "@/data/leadmembersdata";

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  animate: (selected: boolean) => ({
    gap: selected ? ".5rem" : 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition: Transition = {
  delay: 0.1,
  type: "spring",
  bounce: 0,
  duration: 0.35,
};

export interface TabItem {
  key: string;
  title: string;
  icon?: ReactNode;
  color?: keyof typeof colorMap;
}

interface TabProps {
  tab: TabItem;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ tab, isActive, onClick }: TabProps) => {
  const inactiveClasses = {
    background: "",
    text: "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
    icon: "text-gray-500",
  };

  const color = tab.color || "red";
  const colorClasses = isActive ? colorMap[color] : inactiveClasses;

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      custom={isActive}
      onClick={onClick}
      transition={transition}
      className={`
        ${colorClasses.background} ${colorClasses.text}
        relative flex items-center gap-2 p-2 text-sm font-medium cursor-pointer rounded-full
        border
        transition-colors duration-300
        h-8
      `}
    >
      {/* icon */}
      {tab.icon && (
        <span className={`flex-shrink-0 ${colorClasses.icon}`}>{tab.icon}</span>
      )}

      {/* label */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="overflow-hidden font-bold whitespace-nowrap hidden sm:inline-block"
          >
            {tab.title}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default function IconTabs({
  tabs,
  activeTab,
  onTabChange,
  center,
}: {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  center?: boolean;
}) {
  return (
    <div
      className={`${
        center ? "justify-center" : ""
      } font-extrabold font-heading py-4 flex flex-wrap items-center gap-1`}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          tab={tab}
          isActive={activeTab === tab.key}
          onClick={() => onTabChange(tab.key)}
        />
      ))}
    </div>
  );
}
