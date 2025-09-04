import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // You already have this component
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pointsOfInterest } from "@/data/PointsOfInterest"; // Import your data

const IslandExplorer = () => {
  const WHATSAPP_NUMBER = "5016252086"; // Centralize your number

  const handleRequestRide = (locationTitle: string) => {
    const message = `Hi Caye Cruiser! I'd like a ride to ${locationTitle}.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="explore" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-serif">
            Discover the <span className="text-primary">Island's Vibe</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't know where to start? We've picked out a few of our favorite
            spots for you.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {pointsOfInterest.map((poi) => (
              <CarouselItem key={poi.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden h-full flex flex-col">
                    <img
                      src={poi.image}
                      alt={poi.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6 flex-grow">
                      <Badge variant="secondary" className="mb-2">
                        {poi.category}
                      </Badge>
                      <h3 className="text-xl font-bold font-serif mb-2">
                        {poi.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {poi.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => handleRequestRide(poi.title)}
                        className="w-full"
                        variant="hero"
                      >
                        Cruise There
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default IslandExplorer;
