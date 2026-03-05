import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { PainSolutionSection } from "@/components/sections/PainSolutionSection";
import { FeatureTriptych } from "@/components/sections/FeatureTriptych";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PainSolutionSection />
        <FeatureTriptych />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
