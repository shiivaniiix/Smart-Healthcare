import GroupCard from "./GroupCard"
import HeartRateCard from "./HeartRate"
import OxygenCard from "./OxygenCard"
import TemperatureCard from "./TemperatureCard"

const Homepage = (props) => {
  return (
    <>
      <div className="bg-[#f8f9fc]">
        <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-lg w-full">
          {/* Search Input */}
          <div className="flex flex-grow items-center bg-gray-100 rounded-md px-2 w-4">
            <input 
              type="text" 
              placeholder="Ask our Health Bot...." 
              className="w-full bg-transparent p-2 focus:outline-none"
            />
            <button className="text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1117.5 10.5a7.5 7.5 0 014.85 7.15l4.35 4.35z" />
              </svg>
            </button>
          </div>

          {/* User Avatar */}
          <div className="flex ml-10">
            <h1 className="mr-3 text-lg font-normal p-3">
               {props.name ? `Welcome - ${props.name}` : "User"}
            </h1>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png" 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        <h1 className="mt-5 text-gray-600 text-2xl font-normal m commi">Dashboard</h1>
        <div className="grid grid-cols-4 gap-8">
          <TemperatureCard />
          <OxygenCard />
          <HeartRateCard />
          <GroupCard />
        </div>
      </div>
    </>
  );
}

export default Homepage;
