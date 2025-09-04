export interface PointOfInterest {
  id: string;
  title: string;
  category: "Eat & Drink" | "Adventure" | "Relax";
  description: string;
  image: string; // Path to a new image in your assets folder
}

export const PointsOfInterest: PointOfInterest[] = [
  {
    id: "secret-beach",
    title: "Secret Beach",
    category: "Relax",
    description:
      "The worst-kept secret on the island. Crystal clear water and bustling beach bars. The perfect spot to waste a day.",
    image: "/src/assets/poi/secret-beach.jpg",
  },
  {
    id: "truck-stop",
    title: "The Truck Stop",
    category: "Eat & Drink",
    description:
      "A must-visit food truck park with a lively beer garden, swimming pool, and sunset views over the lagoon.",
    image: "/src/assets/poi/truck-stop.jpg",
  },
  {
    id: "palapa-bar",
    title: "Palapa Bar & Grill",
    category: "Eat & Drink",
    description:
      "An iconic over-the-water bar. Grab a bucket of Belikin beers, float in an inner tube, and enjoy the live music.",
    image: "/src/assets/poi/palapa-bar.jpg",
  },
  // ...add more locations
];
