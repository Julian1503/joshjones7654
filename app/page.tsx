import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ParallaxHeroSection from '@/components/parallax-hero/ParallaxHeroSection';
import AboutJoshuaSection from '@/components/about-joshua/AboutJoshuaSection';
import { Footer } from '@/components/footer/Footer';
import { PageIndex } from '@/components/page-index/PageIndex';
import { FloatingSocials } from '@/components/floating-socials/FloatingSocials';
import { SITE_DEFAULT_TITLE } from '@/lib/seo/site';
import {SiteMenu} from "@/components/site-menu/SiteMenu";

const YoutubeSectionDeferred = dynamic(() => import('@/components/youtube-section/YoutubeSection'))
const GamesJoshPlaysSectionDeferred = dynamic(() => import('@/components/games-josh-plays/GamesJoshPlaysSection'))
const MusicSectionDeferred = dynamic(() => import('@/components/music-section/MusicSection').then((module) => module.MusicSection))
const LiveBannerDeferred = dynamic(() => import('@/components/live-banner/LiveBanner'))
const TheBetterDaySectionDeferred = dynamic(() => import('@/components/the-better-day/TheBetterDaySection'))

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
        <YoutubeSectionDeferred />
        <GamesJoshPlaysSectionDeferred />
        <MusicSectionDeferred />
        <LiveBannerDeferred />
        <TheBetterDaySectionDeferred />
      </main>

      <Footer />
    </>
  );
}
