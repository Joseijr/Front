// CityCard Component
// This is a simple component that displays a city name and its temperature
// It's used to show quick weather info for other cities

// Define the props (properties) that this component will receive
interface CityCardProps {
  cityName: string;
  temperature: number;
}

function CityCard(props: CityCardProps) {
  return (
    <div className="border border-white p-6">
      {/* City name */}
      <p className="text-lg mb-2 opacity-70">{props.cityName}</p>
      
      {/* Temperature */}
      <p className="text-3xl font-bold">{props.temperature}°C</p>
    </div>
  );
}

// Export the component so it can be used in other files
export default CityCard;
