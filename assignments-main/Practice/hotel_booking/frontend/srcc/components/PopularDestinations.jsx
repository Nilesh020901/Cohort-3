const destinations = [
  // Left template
  { name: "Spain", image: "/images/spain.jpg", className: "row-span-3" },
  { name: "London", image: "/images/london.jpg", className: "col-span-2" },
  { name: "Lisbon", image: "/images/lisbon.jpg", className: "col-span-2 row-span-2" },

  // Right template
  { name: "Croatia", image: "/images/croatia.jpg", className: "row-span-3" },
  { name: "Bratislava", image: "/images/bratislava.jpg", className: "col-span-2" },
  { name: "Copenhagen", image: "/images/copenhagen.jpg", className: "col-span-2 row-span-2" },
];

const PopularDestinations = () => {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Popular destinations</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Template */}
        <div className="grid grid-flow-col grid-rows-3 gap-4">
          {destinations.slice(0, 3).map((dest, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden shadow-md ${dest.className}`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium shadow">
                {dest.name}
              </div>
            </div>
          ))}
        </div>

        {/* Right Template */}
        <div className="grid grid-flow-col grid-rows-3 gap-4">
          {destinations.slice(3, 6).map((dest, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden shadow-md ${dest.className}`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium shadow">
                {dest.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
