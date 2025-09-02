import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Car, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Send a Message",
      description:
        "Simply send us a message on WhatsApp with your pickup location.",
    },
    {
      icon: <Car className="w-8 h-8 text-primary" />,
      title: "Get Matched",
      description:
        "We'll match you with the nearest available driver in minutes.",
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Enjoy Your Ride",
      description:
        "Your friendly, local driver will take you to your destination safely.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting a ride with Caye Cruiser is as easy as sending a text.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  {step.icon}
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
