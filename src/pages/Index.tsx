// src/pages/Index.tsx

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import ExploreAndFeatures from "@/components/ExploreAndFeatures"; // <-- 1. Import new component
import InteractiveMap from "@/components/InteractiveMap";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <ExploreAndFeatures /> {/* <-- 2. Use the new component here */}
        <InteractiveMap />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
