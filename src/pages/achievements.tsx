import { Achieve_Carousel } from "../components/AchievementCarousel";
import { Achievementdata } from "@/data/achievementdata";

export default function Achievement() {
  return (
    <div className="w-screen flex items-center justify-center">
      <Achieve_Carousel
        images={Achievementdata}
        autoplay={true}
        loop={true}
        showNavigation={true}
        showPagination={true}
      />
    </div>
  );
}
