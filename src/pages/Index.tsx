// src/pages/index.js or a similar file

// All imports are consolidated at the top of the file
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import ExploreAndFeatures from "@/components/ExploreAndFeatures";
import InteractiveMap from "@/components/InteractiveMap";
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
