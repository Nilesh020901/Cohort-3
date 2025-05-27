import hotelRoom from "../assets/hotel_room.jpg";

const Landing = () => {
  return (
    <div className="space-y-16">
      {/* Banner Section */}
      <div className="bg-cover bg-center rounded-3xl p-32" style={{ backgroundImage: `url(${hotelRoom})`}}></div>
    </div>
  );
}

export default Landing;