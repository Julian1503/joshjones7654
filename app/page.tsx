import type { Metadata } from 'next';
import TheBetterDaySection from '@/components/the-better-day/TheBetterDaySection';
import ParallaxHeroSection from '@/components/parallax-hero/ParallaxHeroSection';
import LiveBanner from '@/components/live-banner/LiveBanner';
import YoutubeSection from '@/components/youtube-section/YoutubeSection';
import AboutJoshuaSection from '@/components/about-joshua/AboutJoshuaSection';
import { Footer } from '@/components/footer/Footer';
import { PageIndex } from '@/components/page-index/PageIndex';
import { FloatingSocials } from '@/components/floating-socials/FloatingSocials';
import GamesJoshPlaysSection from '@/components/games-josh-plays/GamesJoshPlaysSection';
import { MusicSection } from '@/components/music-section/MusicSection';
import { SITE_DEFAULT_TITLE } from '@/lib/seo/site';
import {SiteMenu} from "@/components/site-menu/SiteMenu";
import {useLoadingScreen} from "@/components/loading-screen/hooks/useLoadingScreen";
import {LoadingScreen} from "@/components/loading-screen/LoadingScreen";
import {LoadingScreenWrapper} from "@/components/loading-screen/LoadingScreenWrapper";

export const metadata: Metadata = {
  title: 'Home',
  description:
    "Joshua's official site: his story, latest videos, games he plays, music projects, and The Better Day support community.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_DEFAULT_TITLE,
    description:
      "Explore Joshua's journey, videos, games, and music, plus the team that supports him through The Better Day.",
    url: '/',
  },
  twitter: {
    title: SITE_DEFAULT_TITLE,
    description:
      "Follow Joshua's story through videos, games, and music, supported by The Better Day.",
  },
};

export default function Home() {
    return (
    <>
        <LoadingScreenWrapper/>

        <nav aria-label='Primary site menu'>
        <SiteMenu />
      </nav>

      <aside aria-label='Joshua social links'>
        <FloatingSocials />
      </aside>

      <main id='main-content'>
        <ParallaxHeroSection />
        <PageIndex />
        <AboutJoshuaSection />
        <YoutubeSection />
        <GamesJoshPlaysSection />
        <MusicSection />
        <LiveBanner />
        <TheBetterDaySection />
      </main>

      <Footer />
    </>
  );
}
