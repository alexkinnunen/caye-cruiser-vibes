import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Map, MessageSquare, Zap } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "1. Pick A Spot",
      description:
        "Choose your location and destination. Not sure? Explore our adventures below!",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "2. Get Matched",
      description:
        "We'll instantly connect you with the nearest available Caye Cruiser driver via WhatsApp.",
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "3. Enjoy the Ride",
      description:
        "Your friendly local driver will pick you up in minutes. It's that simple!",
    },
  ];

  return (
    // REMOVED: <section> wrapper and background color
    // ADDED: Padding (py-20) and z-index to ensure content is on top
    <div className="container mx-auto px-4 py-10 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="bg-background/80 backdrop-blur-sm border-border/50 text-center"
          >
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green/10 rounded-full flex items-center justify-center text-green mb-4">
                {step.icon}
              </div>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardDescription className="px-6 pb-6">
              {step.description}
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
