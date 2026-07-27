import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Vision } from "@/components/Vision";
import { Team } from "@/components/Team";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <Vision />
        <Team />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
