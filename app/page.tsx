import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import LeadMagnet from "@/components/home/LeadMagnet";
import ValueSection from "@/components/home/ValueSection";
// import SocialProof from "@/components/home/SocialProof";
import Authority from "@/components/home/Authority";
import Pricing from "@/components/home/Pricing";
import Guarantee from "@/components/home/Guarantee";
import VideoSection from "@/components/home/VideoSection";
import Footer from "@/components/layout/Footer";
import CommunitySection from "@/components/home/CommunitySection";

export default function Page() {
  return (
    <main className="home-page min-h-screen bg-white">
      <Navbar />
      <div>
        <Hero />
        <ValueSection />
        <VideoSection />
        <LeadMagnet />
        {/* <SocialProof /> */}
        <CommunitySection />
        <Authority />
        <Pricing />
        <Guarantee />

        <Footer />
      </div>
    </main>
  );
}
