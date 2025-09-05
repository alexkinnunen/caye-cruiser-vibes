import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import ExploreAndFeatures from "@/components/ExploreAndFeatures";
import InteractiveMap from "@/components/InteractiveMap";

// Use the full background SVG
import fullBg from "@/assets/full-bg.svg";
import fullBgb from "@/assets/full-bg2.svg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="relative overflow-hidden bg-muted/50">
          <div
            aria-hidden="true"
            className="absolute -top-40 w-[140%] -left-[10%] h-full bg-no-repeat opacity-5"
            style={{ backgroundImage: `url(${fullBg})` }}
          />
          <HowItWorks />
          <InteractiveMap />
          <ExploreAndFeatures />
        </div>
        <div className="relative overflow-hidden bg-muted/50">
          <div
            aria-hidden="true"
            // ✅ FIXED: Shifted image right by adjusting the left offset
            className="absolute -bottom-80 w-[160%] right-[-55%] h-full bg-no-repeat opacity-5 scale-150"
            style={{ backgroundImage: `url(${fullBgb})` }}
          />
          <About />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
