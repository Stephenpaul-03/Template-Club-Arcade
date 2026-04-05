"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PortraitCard from "@/components/PortraitCard";
import { tabs, teamCards, content, colorMap } from "@/data/leadmembersdata";
import IconTabs from "@/components/LeadMembersTabs";
import { Badge } from "@/components/ui/badge";

export default function LeadMembers() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const activeTabObj = tabs.find((t) => t.key === activeTab);
  const activeColor = activeTabObj ? colorMap[activeTabObj.color] : null;

  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplay = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));
  const infoVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: 50 },
  };

  const carouselVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <main className="w-screen flex flex-col">
      {/* ================= MOBILE ================= */}
      <div className="lg:hidden flex flex-col">
        {/* Tabs */}
        <div className="w-full flex justify-center items-center border-b-2 p-2">
          <IconTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={infoVariants}
            className="flex flex-col"
          >
            <div className="px-4 pb-4">
              {/* Title */}
              <div
                className={`py-4 font-heading font-extrabold text-4xl text-center ${activeColor?.heading} dark:${activeColor?.headingDark}`}
              >
                {content[activeTab].title}
              </div>
              {/* Description */}
              <div className="font-body text-sm text-center mb-4 px-2">
                {content[activeTab].mobile_description}
              </div>

              {/* Carousel */}
              <motion.div variants={carouselVariants}>
                <Carousel
                  plugins={[autoplay.current]}
                  className="w-full"
                  onMouseEnter={() => autoplay.current.stop()}
                  onMouseLeave={() => autoplay.current.play()}
                  opts={{ align: "start", loop: true, dragFree: true }}
                  ref={carouselRef}
                >
                  <CarouselContent>
                    {teamCards[activeTab]?.map((card, i) => (
                      <CarouselItem key={i} className="basis-1/2 sm:basis-1/3">
                        <PortraitCard
                          src={card.src}
                          alt={card.alt}
                          name={card.name}
                          role={card.role}
                          displayName={card.name}
                          githubUrl={card.githubUrl}
                          linkedinUrl={card.linkedinUrl}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </motion.div>
            </div>
            {/* Mobile Badges  */}
            <div className="px-4 border-t-2 py-3 shrink-0">
              <div className="flex flex-wrap gap-2 justify-center">
                <AnimatePresence>
                  {teamCards[activeTab]?.slice(0, 3).map(
                    (member, index) =>
                      member.role && (
                        <motion.span
                          key={member.role + index}
                          variants={badgeVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          <Badge
                            className={`${activeColor?.background} ${activeColor?.text} dark:${activeColor?.backgroundDark} dark:${activeColor?.textDark} h-6 px-2 text-xs font-extrabold font-heading rounded-full border transition-colors duration-300`}
                          >
                            {member.role}
                          </Badge>
                        </motion.span>
                      )
                  )}
                  {teamCards[activeTab].length > 3 && (
                    <motion.span
                      key="mobile-overflow"
                      variants={badgeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Badge
                        className={`${activeColor?.background} ${activeColor?.text} dark:${activeColor?.backgroundDark} dark:${activeColor?.textDark} h-6 px-2 text-xs font-extrabold font-heading rounded-full border transition-colors duration-300`}
                      >
                        +{teamCards[activeTab].length - 3}
                      </Badge>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {/* Desktop Carousel Area */}
        <div className="col-span-2 flex flex-col space-y-6 px-8 relative justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={carouselVariants}
            >
              <Carousel
                plugins={[autoplay.current]}
                className="w-full max-w-6xl"
                onMouseEnter={() => autoplay.current.stop()}
                onMouseLeave={() => autoplay.current.play()}
                opts={{ align: "start", loop: true, dragFree: true }}
              >
                <CarouselContent>
                  {teamCards[activeTab]?.map((card, i) => (
                    <CarouselItem key={i} className="basis-1/2 md:basis-1/3">
                      <PortraitCard
                        src={card.src}
                        alt={card.alt}
                        name={card.name}
                        role={card.role}
                        displayName={card.name}
                        githubUrl={card.githubUrl}
                        linkedinUrl={card.linkedinUrl}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Info Area */}
        <div className="col-span-1 border-l-2 flex flex-col">
          <div className="w-full h-fit flex justify-end items-center border-b-2 px-2">
            <IconTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={infoVariants}
              className="flex flex-col px-4 flex-1"
            >
              <div
                className={`py-4 font-heading font-extrabold text-6xl text-end ${activeColor?.heading} dark:${activeColor?.headingDark}`}
              >
                {content[activeTab].title}
              </div>
              <div className="font-body text-md leading-relaxed text-end">
                {content[activeTab].description}
              </div>
            </motion.div>

            {/* Desktop Badges  */}
            <div className="border-t-2 px-4 py-3 shrink-0">
              <div className="flex flex-wrap gap-2 justify-end">
                <AnimatePresence>
                  {teamCards[activeTab].slice(0, 5).map(
                    (member, index) =>
                      member.role && (
                        <motion.span
                          key={member.role + index}
                          variants={badgeVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          <Badge
                            className={`${activeColor?.background} ${activeColor?.text} dark:${activeColor?.backgroundDark} dark:${activeColor?.textDark} h-8 px-3 text-sm font-extrabold font-heading rounded-full border transition-colors duration-300`}
                          >
                            {member.role}
                          </Badge>
                        </motion.span>
                      )
                  )}
                  {teamCards[activeTab].length > 5 && (
                    <motion.span
                      key="desktop-overflow"
                      variants={badgeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Badge
                        className={`${activeColor?.background} ${activeColor?.text} dark:${activeColor?.backgroundDark} dark:${activeColor?.textDark} h-8 px-3 text-sm font-extrabold font-heading rounded-full border transition-colors duration-300`}
                      >
                        +{teamCards[activeTab].length - 5}
                      </Badge>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
