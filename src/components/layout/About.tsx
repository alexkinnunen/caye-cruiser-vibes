import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import aboutImage from "@/assets/golf-carts-on-san-pedro-beach.jpg";

const About = () => {
  const testimonials = [
    {
      name: "Sarah L.",
      title: "Frequent Visitor",
      avatar: "https://i.pravatar.cc/150?img=1",
      quote:
        "Caye Cruiser is my go-to every time I'm in San Pedro. The drivers are incredibly friendly and know all the best local spots. It feels less like a taxi and more like getting a ride from a friend.",
    },
    {
      name: "David & Maria R.",
      title: "First-Time Tourists",
      avatar: "https://i.pravatar.cc/150?img=2",
      quote:
        "As first-timers, we were a bit lost. Our driver, Carlos, was a lifesaver! He was so patient, gave us a mini-tour, and made us feel completely safe and welcome. Highly recommended!",
    },
    {
      name: "John P.",
      title: "Local Business Owner",
      avatar: "https://i.pravatar.cc/150?img=3",
      quote:
        "I recommend Caye Cruiser to all my guests. They're reliable, professional, and truly represent the best of our island's hospitality. They support local, and that's important to me.",
    },
  ];

  return (
    <section id="about" className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-foreground">
            Trusted by Locals and Travelers Alike
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hear directly from our riders about their experiences exploring San
            Pedro with a service that's truly part of the island.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between bg-background shadow-lg transform hover:-translate-y-2 transition-all duration-300"
            >
              <CardHeader className="relative">
                <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10" />
                <p className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integrated About Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-16 border-t">
          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-foreground">
              <span className="text-primary">For the Island,</span>{" "}
              By the Island.
            </h3>
            <p className="text-lg text-muted-foreground mb-4">
              Caye Cruiser Vibes was born from a love for San Pedro. We're not
              just a service; we're a commitment to our community, our local
              drivers, and the visitors who make our island vibrant.
            </p>
            <p className="text-muted-foreground">
              By partnering with the island's best local drivers, we ensure
              every ride is safe, authentic, and supports the local economy.
            </p>
          </div>
          <div>
            <img
              src={aboutImage}
              alt="Golf carts lined up on a sunny San Pedro beach"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
