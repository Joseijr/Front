// MainCityWeather Component
// This component displays detailed weather information for the main city
// It shows: temperature, feels like, wind speed, and UV index

// Define the props (properties) that this component will receive
interface MainCityWeatherProps {
  cityName: string;
  temperature: number;
  feelsLike: number;
  wind: number;
  uvIndex: number;
}

function MainCityWeather(props: MainCityWeatherProps) {
  return (
    <div className="mb-12">
      {/* City name as the main heading */}
      <h1 className="text-5xl font-bold mb-8">{props.cityName}</h1>
      
      {/* Grid layout for weather information cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Temperature card */}
        <div className="border border-white p-6">
          <p className="text-sm mb-2 opacity-70">Temperature</p>
          <p className="text-4xl font-bold">{props.temperature}°C</p>
        </div>
        
        {/* Feels like card */}
        <div className="border border-white p-6">
          <p className="text-sm mb-2 opacity-70">Feels Like</p>
          <p className="text-4xl font-bold">{props.feelsLike}°C</p>
        </div>
        
        {/* Wind speed card */}
        <div className="border border-white p-6">
          <p className="text-sm mb-2 opacity-70">Wind</p>
          <p className="text-4xl font-bold">{props.wind} km/h</p>
        </div>
        
        {/* UV Index card */}
        <div className="border border-white p-6">
          <p className="text-sm mb-2 opacity-70">UV Index</p>
          <p className="text-4xl font-bold">{props.uvIndex}</p>
        </div>
      </div>
    </div>
  );
}

// Export the component so it can be used in other files
export default MainCityWeather;
