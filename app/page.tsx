import TheBetterDaySection from "@/components/the-better-day/TheBetterDaySection";
import ParallaxHeroSection from "@/components/parallax-hero/ParallaxHeroSection";
import LiveBanner from "@/components/live-banner/LiveBanner";
import YoutubeSection from "@/components/youtube-section/YoutubeSection";
import AboutJoshuaSection from "@/components/about-joshua/AboutJoshuaSection";

export default function Home() {
  return (
      <>
        <ParallaxHeroSection/>
        <AboutJoshuaSection/>
        <YoutubeSection/>
        <LiveBanner/>
        <TheBetterDaySection/>
      </>
  );
}
