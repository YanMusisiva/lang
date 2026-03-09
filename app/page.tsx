import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LeadMagnet from "../components/LeadMagnet";
import ValueSection from "../components/ValueSection";
import SocialProof from "../components/SocialProof";
import Authority from "../components/Authority";
import Pricing from "../components/Pricing";
import Guarantee from "../components/Guarantee";

import Footer from "../components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <LeadMagnet />
        <ValueSection />
        <SocialProof />
        <Authority />
        <Pricing />
        <Guarantee />

        <Footer />
      </div>
    </main>
  );
}
