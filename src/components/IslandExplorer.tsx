import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PointsOfInterest } from "@/data/PointsOfInterest"; // Corrected casing for consistency

const IslandExplorer = () => {
  const WHATSAPP_NUMBER = "5016252086";

  const handleRequestRide = (locationTitle: string) => {
    const message = `Hi Caye Cruiser! I'd like a ride to ${locationTitle}.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="explore" className="py-20 bg-med-purple">
      <div className="container mx-auto px-4">
        {/* Grouped header text for better structure */}
        <div className="text-center mb-10">
          <h2 className="text-popover text-4xl font-bold mb-4 font-serif">
            Discover the <span className="text-green">Island's Vibe</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto pb-5">
            Don't know where to start? We've picked out a few of our favorite
            spots for you.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          // Added `relative` for positioning context
          className="w-full max-w-6xl mx-auto relative"
        >
          <CarouselContent>
            {PointsOfInterest.map((poi) => (
              <CarouselItem key={poi.id} className="md:basis-1/2 lg:basis-1/3">
                {/* Added h-full to ensure consistent card height */}
                <div className="p-1 h-full">
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
                        variant="outline2"
                      >
                        Cruise There
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows with 3-stage responsive positioning to prevent overflow */}
          <CarouselPrevious className="hidden md:inline-flex absolute top-1/2 -translate-y-1/2 left-4 lg:-left-12" />
          <CarouselNext className="hidden md:inline-flex absolute top-1/2 -translate-y-1/2 right-4 lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default IslandExplorer;
