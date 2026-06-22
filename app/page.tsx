import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LeadMagnet from "../components/LeadMagnet";
import ValueSection from "../components/ValueSection";
import SocialProof from "../components/SocialProof";
import Authority from "../components/Authority";
import Pricing from "../components/Pricing";
import Guarantee from "../components/Guarantee";
import VideoSection from "@/components/VideoSection";
import Footer from "../components/Footer";
import CommunitySection from "@/components/CommunitySection";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <VideoSection />
        <LeadMagnet />
        <ValueSection />
        <SocialProof />
        <CommunitySection />
        <Authority />
        <Pricing />
        <Guarantee />

        <Footer />
      </div>
    </main>
  );
}
