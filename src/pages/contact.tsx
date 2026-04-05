"use client";

import { useEffect } from "react";
import SnakeGame from "@/components/Snake";
import { Tree, Folder, File } from "@/components/magicui/file-tree";
import {
  Github,
  Linkedin,
  Mail,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
import { HorizonLogo } from "@/data/images";

export default function ContactBanner() {
  const handleClick = (href: string) => {
    if (href.startsWith("mailto:")) {
      window.location.href = href;
    } else {
      window.open(href, "_blank");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const map = document.getElementById("map") as HTMLIFrameElement | null;
      if (map) {
        map.src = map.src;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <section className="w-full min-h-[25vh]">
        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-12">
          {/* col 1 -> Snake Game */}
          <div className="col-span-2 flex flex-col justify-center items-center border-r-2 min-h-[25vh] py-6 px-8">
            <SnakeGame />
          </div>

          {/* col 2 -> Heading + description */}
          <div className="col-span-6 flex flex-col justify-center px-6 py-8 gap-y-4">
            <h2 className="text-2xl font-extrabold font-heading">RetroByte Studio</h2>
            <p className="font-body">
              We take classic game ideas and rebuild them with the same feel — then add a modern coat of paint, clean UX, and quality-of-life so they’re effortless to play today.
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                {" "}Let’s talk.
              </span>
            </p>
          </div>

          {/* col 3 -> File tree */}
          <div className="col-span-2 flex flex-col justify-center items-center border-x-2 min-h-[25vh] py-6 px-8">
            <Tree
              className="overflow-y-auto w-full border-r-2"
              initialExpandedItems={["socials", "other"]}
              openIcon={
                <FolderOpenIcon className="size-4 text-blue-600 dark:text-blue-400" />
              }
              closeIcon={
                <FolderIcon className="size-4 text-blue-600 dark:text-blue-400" />
              }
            >
              <Folder
                value="socials"
                element="Socials"
                className="font-heading font-extrabold text-blue-300"
              >
                <File
                  value="github"
                  onClick={() =>
                    handleClick("https://github.com/Stephenpaul-03")                  }
                  fileIcon={
                    <Github className="size-4 text-gray-800 dark:text-gray-200" />
                  }
                  className="font-heading font-extrabold"
                >
                  GitHub
                </File>
                <File
                  value="linkedin"
                  onClick={() =>
                    handleClick("https://www.linkedin.com/in/stephen-paul-i/")            }
                  fileIcon={
                    <Linkedin className="size-4 text-blue-700 dark:text-blue-400" />
                  }
                  className="font-heading font-extrabold"
                >
                  LinkedIn
                </File>
                <File
                  value="email"
                  onClick={() =>
                    handleClick("mailto:Stephenpaul4040@gmail.com")               }
                  fileIcon={
                    <Mail className="size-4 text-red-600 dark:text-red-400" />
                  }
                  className="font-heading font-extrabold"
                >
                  Email
                </File>
              </Folder>
            </Tree>
          </div>

          {/* col 4 -> Logo */}
          <div className="col-span-2 flex flex-col justify-center items-center min-h-[25vh] px-8">
            <img 
              src={HorizonLogo} 
              alt="RetroByte Studio" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col w-[100vw] py-4 px-10 gap-y-4">
          {/* Heading + description */}
          <div className="flex flex-row ">
            <div className="w-full flex flex-col mr-4">
              <h2 className="text-lg font-extrabold font-heading">RetroByte Studio</h2>
              <p className="font-body text-sm">
                We take classic game ideas and rebuild them with the same feel — then add a modern coat of paint, clean UX, and quality-of-life so they’re effortless to play today.
                <span className="text-purple-600 dark:text-purple-400 font-semibold">
                  {" "}Let’s talk.
                </span>
              </p>
            </div>
            <div className="flex flex-col min-w-[30vw] border-l-2">
              <Tree
                className="overflow-y-auto w-full ml-2"
                initialExpandedItems={["socials", "other"]}
                openIcon={
                  <FolderOpenIcon className="size-4 text-blue-600 dark:text-blue-400" />
                }
                closeIcon={
                  <FolderIcon className="size-4 text-blue-600 dark:text-blue-400" />
                }
              >
                <Folder
                  value="socials"
                  element="Socials"
                  className="font-heading font-extrabold text-blue-300"
                >
                  <File
                    value="github"
                    onClick={() =>
                      handleClick("https://github.com/Stephenpaul-03")                 }
                    fileIcon={
                      <Github className="size-4 text-gray-800 dark:text-gray-200" />
                    }
                    className="font-heading font-extrabold"
                  >
                    GitHub
                  </File>
                  <File
                    value="linkedin"
                    onClick={() =>
                      handleClick("https://www.linkedin.com/in/stephen-paul-i/")                   }
                    fileIcon={
                      <Linkedin className="size-4 text-blue-700 dark:text-blue-400" />
                    }
                    className="font-heading font-extrabold"
                  >
                    LinkedIn
                  </File>
                  <File
                    value="email"
                    onClick={() =>
                      handleClick("mailto:Stephenpaul4040@gmail.com")                    }
                    fileIcon={
                      <Mail className="size-4 text-red-600 dark:text-red-400" />
                    }
                    className="font-heading font-extrabold"
                  >
                    Email
                  </File>
                </Folder>
              </Tree>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center mt-4">
            <img 
              src={HorizonLogo} 
              alt="RetroByte Studio" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
