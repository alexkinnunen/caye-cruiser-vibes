import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import VehicleClasses from "@/components/VehicleClasses";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <VehicleClasses />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
