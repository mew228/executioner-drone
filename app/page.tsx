'use client';

import Navbar from '@/components/Navbar';
import HeroSectionVideo from '@/components/HeroSectionVideo';
import CloseupGalleryVideo from '@/components/CloseupGalleryVideo';
import PricingTiers from '@/components/PricingTiers';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import TacticalCursor from '@/components/TacticalCursor';
import TechSpecs from '@/components/TechSpecs';
import MissionControl from '@/components/MissionControl';
import TelemetryHUD from '@/components/TelemetryHUD';
import MissionReadiness from '@/components/MissionReadiness';
import PayloadConfigurator from '@/components/PayloadConfigurator';
import DeploymentMap from '@/components/DeploymentMap';
import SecureTerminal from '@/components/SecureTerminal';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-black text-white min-h-screen cursor-none selection:bg-exec-blue selection:text-white">
      <Preloader />
      <TacticalCursor />
      <Navbar />

      <HeroSectionVideo />

      <MissionReadiness />

      <TechSpecs />

      <PayloadConfigurator />

      <MissionControl />

      <DeploymentMap />

      <CloseupGalleryVideo />

      <PricingTiers />

      <SecureTerminal />

      <Footer />
    </main>
  );
}
