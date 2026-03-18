import TheBetterDaySection from "@/components/the-better-day/TheBetterDaySection";
import ParallaxHeroSection from "@/components/parallax-hero/ParallaxHeroSection";
import LiveBanner from "@/components/live-banner/LiveBanner";
import YoutubeSection from "@/components/youtube-section/YoutubeSection";
import AboutJoshuaSection from "@/components/about-joshua/AboutJoshuaSection";
import {Footer} from "@/components/footer/Footer";
import {PageIndex} from "@/components/page-index/PageIndex";
import {FloatingSocials} from "@/components/floating-socials/FloatingSocials";
import GamesJoshPlaysSection from "@/components/games-josh-plays/GamesJoshPlaysSection";
import {MusicSection} from "@/components/music-section/MusicSection";

export default function Home() {
  return (
      <>
        <ParallaxHeroSection/>
        <PageIndex/>
        <FloatingSocials/>
        <AboutJoshuaSection/>
        <YoutubeSection/>
        <GamesJoshPlaysSection/>
        <MusicSection/>
        <LiveBanner/>
        <TheBetterDaySection/>
        <Footer/>
      </>
  );
}
