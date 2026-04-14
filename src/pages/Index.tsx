import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CasesSection from "@/components/CasesSection";
import ServicesSection from "@/components/ServicesSection";
import StorySection from "@/components/StorySection";
import FeedbackSection from "@/components/FeedbackSection";
import CtaSection from "@/components/CtaSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <hr className="border-border" />
      <CasesSection />
      <hr className="border-border" />
      <ServicesSection />
      <hr className="border-border" />
      <StorySection />
      <hr className="border-border" />
      <FeedbackSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
