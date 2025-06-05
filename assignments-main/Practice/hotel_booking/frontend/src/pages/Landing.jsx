import hotelRoom from "../assets/hotel_room.jpg";
import LovedHotels from "../components/LovedHotels";
import PopularDestinations from "../components/PopularDestinations";

const Landing = () => {
  return (
    <div className="space-y-16">
      {/* Banner Section */}
      <div className="bg-cover bg-center rounded-3xl p-32 text-white flex flex-col items-center justify-center text-center relative" style={{ backgroundImage: `url(${hotelRoom})`, height: "300px" }}>
        <h1 className="text-4xl font-bold">Book your stay with Booking.com</h1>
        <p className="text-lg font-bold mt-2">1,480,086 rooms around the world are waiting for you!</p>
        <div className="absolute" style={{ bottom: "-36px"}}>
          <div className="bg-white rounded-full shadow-lg p-4 flex gap-4 items-center justify-center">
            <button className="bg-blue-600 hover:bg-blue-800 px-5 py-2 rounded-full text-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
              Sign Up
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-full text-gray-800 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
              Log In
            </button>
          </div>
        </div>
      </div>
      <div>
        <PopularDestinations />
      </div>
      <div>
        <LovedHotels />
      </div>
    </div>
  );
}

export default Landing;
