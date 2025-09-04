import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import InteractiveMap from "@/components/InteractiveMap";
import IslandExplorer from "@/components/IslandExplorer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <InteractiveMap />
        <HowItWorks />
        <IslandExplorer />
        <Features />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
