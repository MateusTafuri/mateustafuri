import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CasesSection from "@/components/CasesSection";
import ServicesSection from "@/components/ServicesSection";
import StorySection from "@/components/StorySection";
import TimelineSection from "@/components/TimelineSection";
import FeedbackSection from "@/components/FeedbackSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="bg-secondary">
        <TimelineSection />
      </div>
      <StorySection />
      <div className="bg-secondary">
        <CasesSection />
      </div>
      <FeedbackSection />
      <ServicesSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
