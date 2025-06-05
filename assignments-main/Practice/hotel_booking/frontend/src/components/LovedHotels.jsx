import { Heart, ChevronRight } from "lucide-react";

const hotels = [
  {
    name: "Soho Hotel London",
    location: "London",
    price: "$130/night",
    rating: "9.6",
    image: "/images/soho.jpg",
  },
  {
    name: "Hotel Norrebro",
    location: "Copenhagen",
    price: "$180/night",
    rating: "9.6",
    image: "/images/norrebro.jpg",
  },
  {
    name: "Sunset Plaza Hotel",
    location: "Barcelona",
    price: "$210/night",
    rating: "9.8",
    image: "/images/sunset.jpg",
  },
  {
    name: "Three Quarters Hotel",
    location: "Stockholm",
    price: "$130/night",
    rating: "9.5",
    image: "/images/three.jpg",
  },
  {
    name: "Surf’n’Turf Suites",
    location: "Lisbon",
    price: "$70/night",
    rating: "9.5",
    image: "/images/surf.jpg",
  },
];

const LovedHotels = () => {
    return (
        <section className="py-6 px-4">
            <h2 className="text-2xl font-semibold md-6">Hotels loved by guests</h2>
        </section>
    )
};

export default LovedHotels;
