import { PageBackdrop } from "@/components/PageBackdrop";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Divisions } from "@/components/Divisions";
import { Labs } from "@/components/Labs";
import { Ventures } from "@/components/Ventures";
import { GlobeExpansion } from "@/components/GlobeExpansion";
import { Team } from "@/components/Team";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Hairline } from "@/components/ui/Hairline";

export default function Home() {
  return (
    <>
      <PageBackdrop />
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Divisions />
        <Hairline />
        <Labs />
        <Hairline />
        <Ventures />
        <GlobeExpansion />
        <Team />
        <Hairline />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
