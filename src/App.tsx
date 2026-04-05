import { ThemeProvider } from "@/components/theme/theme-provider";
import Hero from "./pages/hero";
import ContactBanner from "./pages/contact";
import Banner from "./components/Banner";
import About from "./pages/about";
import LeadMembers from "./pages/lead members";
import Projects from "./pages/projects";
import PartnerCarousel from "./pages/partners";
import Achievement from "./pages/achievements";
import { CustomCursor } from "@/components/ui/custom-cursor"
import ShowcaseDisclaimerModal from "@/components/ShowcaseDisclaimerModal";
import "leaflet/dist/leaflet.css";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CustomCursor />
      <ShowcaseDisclaimerModal />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Hero />
        <About id="about-section" />
        <Banner
          titleLine1="Old games, new coat"
          titleLine2="Same feel — modern polish"
          nextpage="03 Partners"
          boxColor="#F7F7FF"
          boxRevealPosition="top"
        />
        <PartnerCarousel />
        <Banner
          titleLine1="What we’ve recoated"
          titleLine2="Modern takes on timeless play"
          nextpage="04 Achievements"
          boxColor="#F7F7FF"
        />
        <Achievement/>       
        <Banner
          titleLine1="How we modernize"
          titleLine2="QoL, clarity, feel-first timing"
          nextpage="05 Projects"
          boxColor="#F7F7FF"
        />
        <Projects />
        <Banner
          titleLine1="The people behind the feel"
          titleLine2="Design, code, art, audio, QA"
          nextpage="06 Lead Members"
          boxColor="#F7F7FF"
        />
        <LeadMembers />
        <Banner
          titleLine1="Let’s build the next recoat"
          titleLine2="Contact RetroByte Studio"
          nextpage="07 Contact"
          boxColor="#F7F7FF"
        />
        <ContactBanner />
      </div>
    </ThemeProvider>
  );
}

export default App;
