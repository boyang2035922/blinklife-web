import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata = {
  title: "联系我们 — BlinkLife",
  description: "了解石家庄灵眸光年科技有限公司，以及我们的使命与联系方式。",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
