import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrivacySection } from "@/components/sections/PrivacySection";

export const metadata = {
  title: "隐私政策 — BlinkLife",
  description:
    "BlinkLife 隐私政策：了解我们如何收集、使用和保护您的个人信息。",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <PrivacySection />
      </main>
      <Footer />
    </>
  );
}
