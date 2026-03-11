import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TermsSection } from "@/components/sections/TermsSection";

export const metadata = {
  title: "使用条款 — BlinkLife",
  description:
    "BlinkLife 使用条款：了解使用 BlinkLife 服务的条款与条件。",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <TermsSection />
      </main>
      <Footer />
    </>
  );
}
