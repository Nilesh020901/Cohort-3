const destinations = [
  // Left template
  { name: "Spain", image: "/images/spain.jpg", className: "row-span-3" },
  { name: "London", image: "/images/london.jpg" },
  { name: "Lisbon", image: "/images/lisbon.jpg", className: "row-span-2" },

  // Right template
  { name: "Croatia", image: "/images/crotia.jpg", className: "row-span-3" },
  { name: "Bratislava", image: "/images/bratislava.jpg", className: "row-span-2" },
  { name: "Copenhagen", image: "/images/copenhagen.jpg" },
];

const PopularDestinations = () => {
  return (
    <section className="py-6">
      <h2 className="text-2xl font-semibold mb-4">Popular destinations</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* left */}
        <div className="grid grid-flow-col grid-rows-3 gap-4 h-[450px]">
          {destinations.slice(0,3).map((des,idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden shadow-md ${des.className}`}>
              <img 
                src={des.image} 
                alt={des.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-4 left-4 bg-white/50 px-3 py-1 rounded-full text-sm font-medium shadow">
                {des.name}
              </div>
            </div>
          ))}
        </div>
        {/* right */}
        <div className="grid grid-flow-col grid-rows-3 gap-4 h-[450px]">
          {destinations.slice(3,6).map((des,idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden shadow-md ${des.className}`}>
              <img
                src={des.image} 
                alt={des.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-4 left-4 bg-white/50 px-3 py-1 rounded-full text-sm font-medium shadow">
                {des.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default PopularDestinations;