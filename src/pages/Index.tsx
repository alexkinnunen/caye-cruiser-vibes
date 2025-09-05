import Hero from "@/components/Hero";
import QuickFeatures from "@/components/QuickFeatures";
import HowItWorks from "@/components/HowItWorks";
import ExploreAndFeatures from "@/components/ExploreAndFeatures";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// Use a standard, static import again
import InteractiveMap from "@/components/InteractiveMap";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <QuickFeatures />
        <HowItWorks />
        <InteractiveMap />
        <ExploreAndFeatures />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
