import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Shield, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Community First",
      description:
        "We partner with local taxi drivers and cart owners, creating economic opportunities while preserving the authentic San Pedro experience.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Safety & Trust",
      description:
        "All our drivers are verified locals with extensive island knowledge. Every trip includes real-time tracking and 24/7 support.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Island Expertise",
      description:
        "Our drivers are your connection to authentic Belize. Ask about the best fishing spots, hidden beaches, or local favorites.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-brand-red text-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* Ensure heading text is light */}
          <h2 className="text-4xl font-bold mb-4 font-serif text-white">
            <span className="text-primary">For the Island,</span> By the Island
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {/* ... */}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            // Make card backgrounds slightly transparent for depth on the dark background
            <Card
              key={index}
              className="text-center bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                {/* Set title color to white for readability */}
                <CardTitle className="text-white">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed text-muted-foreground">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* ... The contact cards section would also need similar text/icon color adjustments ... */}
      </div>
    </section>
  );
};

export default About;
