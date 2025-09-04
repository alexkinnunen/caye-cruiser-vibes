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
        <div className="text-right mb-16">
          <h2 className="text-4xl font-bold mb-4 font-serif">How It Works</h2>
          <p className="text-xl text-muted-foreground text-right">
            Getting a ride with Caye Cruiser is as easy as sending a text.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-right opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-end gap-4 mb-4">
                <h3 className="text-6xl font-bold text-primary/20">
                  0{index + 1}
                </h3>
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h4 className="text-2xl font-semibold mb-2 font-serif">
                {step.title}
              </h4>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
