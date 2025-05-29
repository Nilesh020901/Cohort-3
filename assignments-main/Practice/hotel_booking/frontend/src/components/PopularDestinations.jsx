const destinations = [
    { name: "Spain", image: "../public/images/spain.jpg" },
    { name: "London", image: "../public/images/london.jpg" },
    { name: "Lisbon", image: "../public/images/lisbon.jpg" },
    { name: "Croatia", image: "../public/images/croatia.jpg" },
    { name: "Croatia", image: "../public/images/croatia.jpg" },
    { name: "Copenhagen", image: "../public/images/copenhagen.jpg" }
];

const PopularDestinations = () => {
    return (
        <section className="py-12 px-4">
            <h2 className="text-2xl font-semibold mb-6">Popular Destinations</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 xl:grid-cols-5">
                {destinations.map((destination, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                            <img src={destination.image} alt={destination.name} />
                            <div className="absolute bottom-3 left-3 bg-white/80 text-gray-800 text-sm font-medium px-3 py-1 rounded-full shadow">
                                {destination.name}
                            </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default PopularDestinations;