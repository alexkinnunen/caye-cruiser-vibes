import { MessageSquare, Car, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Pick a Spot",
      description:
        "Simply use the map above to select your pickup and drop-off locations.",
    },
    {
      icon: <Car className="w-8 h-8 text-primary" />,
      title: "Nearest Match",
      description:
        "You'll be matched with the nearest available driver in minutes.",
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Enjoy the Adventure",
      description:
        "Your friendly, local driver will take you to your destination safely.",
    },
  ];

  return (
    <section id="how-it-works" className=" my-5 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <h3 className="text-6xl font-bold text-primary/20">
                  0{index + 1}
                </h3>
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
