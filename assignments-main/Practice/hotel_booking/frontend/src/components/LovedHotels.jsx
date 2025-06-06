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
    <section className="py-6">
      <h2 className="text-2xl font-semibold my-6">Hotels loved by guests</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="bg-slate-50 rounded-2xl overflow-hidden shadow-md hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-in-out"
          >
            <div className="relative m-2 overflow-hidden rounded-2xl">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                {hotel.rating}
              </div>
              <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full">
                <Heart className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-500">{hotel.location}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-bold text-green-800">
                  from {hotel.price}
                </p>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LovedHotels;
