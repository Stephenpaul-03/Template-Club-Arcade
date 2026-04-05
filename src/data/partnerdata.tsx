import {
  consoleEditionsImages,
  consoleEditionsLogos,
  deluxeEditionsImages,
  deluxeEditionsLogos,
  mobileEditionsImages,
  mobileEditionsLogos,
  pcEditionsImages,
  pcEditionsLogos,
} from "./images";

export interface FloatingImage {
  url: string;
  depth: number;
  className: string;
  sizeClass: string;
}

export interface PartnerData {
  CompanyName: string;
  Description: string;
  floatingImages: FloatingImage[];
  showcaseimages: string[];
  highlightColor: string;
  textColor: string;
  backgroundColor: string;
  partnerLink?: string;
}

// Desktop layout arrays (from original)
const desktopLeft = [
  {
    depth: 1,
    className: "hidden md:block",
    sizeClass: "w-65 h-auto rounded-lg",
  },
  {
    depth: 2,
    className: "hidden md:block",
    sizeClass: "w-68 h-auto rounded-xl",
  },
  {
    depth: 3,
    className: "hidden md:block",
    sizeClass: "w-58 h-auto rounded-xl",
  },
  {
    depth: 2,
    className: "hidden md:block",
    sizeClass: "w-59 h-auto rounded-xl",
  },
];

const desktopRight = [
  {
    depth: 1,
    className: "hidden md:block",
    sizeClass: "w-54 h-auto rounded-lg",
  },
  {
    depth: 2,
    className: "hidden md:block",
    sizeClass: "w-56 h-auto rounded-xl",
  },
  {
    depth: 3,
    className: "hidden md:block",
    sizeClass: "w-58 h-auto rounded-xl",
  },
  {
    depth: 2,
    className: "hidden md:block",
    sizeClass: "w-59 h-auto rounded-xl",
  },
];

const mobileLeft = [
  {
    depth: 1,
    className: "md:hidden",
    sizeClass: "w-32 h-auto rounded-lg",
  },
  {
    depth: 2,
    className: "md:hidden",
    sizeClass: "w-24 h-auto rounded-xl",
  },
  {
    depth: 2,
    className: "md:hidden",
    sizeClass: "w-25 h-auto rounded-xl",
  },
  {
    depth: 1,
    className: "md:hidden",
    sizeClass: "w-28 h-auto rounded-lg",
  },
];

const mobileRight = [
  {
    depth: 1,
    className: "md:hidden",
    sizeClass: "w-25 h-auto rounded-lg",
  },
  {
    depth: 2,
    className: "md:hidden",
    sizeClass: "w-24 h-auto rounded-xl",
  },
  {
    depth: 2,
    className: "md:hidden",
    sizeClass: "w-26 h-auto rounded-xl",
  },
  {
    depth: 1,
    className: "md:hidden",
    sizeClass: "w-25 h-auto rounded-lg",
  },
];

const floatingImageLayout = [
  ...desktopLeft,
  ...desktopRight,
  ...mobileLeft,
  ...mobileRight,
];

function assignFloatingImages(images: string[]): FloatingImage[] {
  let index = 0;
  return floatingImageLayout.map((layout) => {
    const url = images[index % images.length];
    index++;
    return { ...layout, url };
  });
}


export const partnersData: PartnerData[] = [
  {
    CompanyName: "PC Editions",
    Description:
      "Precision and performance first — Steam-first builds tuned for responsiveness, full controller support, and ultrawide options, with cloud saves and achievements where they stay friction-free.",
    highlightColor: "#4A6FA5",
    backgroundColor: "#F8F5F1",
    textColor: "#1B1918",
    partnerLink: "https://store.steampowered.com",
    floatingImages: assignFloatingImages(pcEditionsImages),
    showcaseimages: pcEditionsLogos,
  },
  {
    CompanyName: "Console Editions",
    Description:
      "Designed for the couch — optimized for PlayStation and Xbox with instant boot, fast restarts, and intuitive controller layouts for a clear, comfortable living-room arcade feel.",
    highlightColor: "#9B3B3B",
    backgroundColor: "#F8F5F1",
    textColor: "#1B1918",
    partnerLink: "https://www.playstation.com",
    floatingImages: assignFloatingImages(consoleEditionsImages),
    showcaseimages: consoleEditionsLogos,
  },
  {
    CompanyName: "Mobile Ports",
    Description:
      "Built for quick sessions — touch-first mobile versions with responsive input zones, optional one-handed play, haptics, smart scaling, and offline support without compromising clarity.",
    highlightColor: "#3C3C3C",
    backgroundColor: "#F8F5F1",
    textColor: "#1B1918",
    partnerLink: "https://play.google.com",
    floatingImages: assignFloatingImages(mobileEditionsImages),
    showcaseimages: mobileEditionsLogos,
  },
  {
    CompanyName: "Deluxe Editions",
    Description:
      "For the curious players — GOG editions that bundle soundtracks, art packs, and dev notes explaining the feel decisions behind timing, feedback, and visual clarity.",
    highlightColor: "#C2A04D",
    backgroundColor: "#F8F5F1",
    textColor: "#1B1918",
    partnerLink: "https://www.gog.com",
    floatingImages: assignFloatingImages(deluxeEditionsImages),
    showcaseimages: deluxeEditionsLogos,
  },
];
