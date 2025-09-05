// src/pages/Index.tsx

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import ExploreAndFeatures from "@/components/ExploreAndFeatures";
import InteractiveMap from "@/components/InteractiveMap";

import fullBg from "@/assets/full-bg.svg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="relative overflow-hidden bg-muted/50">
          <div
            aria-hidden="true"
            className="absolute -top-40 w-[140%] -left-[20%] h-full bg-no-repeat opacity-5"
            style={{ backgroundImage: `url(${fullBg})` }}
          />
          <HowItWorks />
          <InteractiveMap />
          <ExploreAndFeatures />
        </div>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
