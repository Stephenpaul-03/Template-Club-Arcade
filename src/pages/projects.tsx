"use client";
import { Expandable_Cards } from "@/components/ExpandableCards";
import { projectsData, type ProjectData } from "@/data/projectdata";

interface ProjectsProps {
  projects?: ProjectData[];
}

export default function Projects({ projects = projectsData }: ProjectsProps) {
  return (
    <div className="w-screen flex items-start justify-center">
      <div className="w-full">
        <Expandable_Cards
          cards={projects}
        />
      </div>
    </div>
  );
}
