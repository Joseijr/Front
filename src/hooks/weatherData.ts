import { useState, useEffect } from 'react';

// ─── React Topic: Custom Hook ─────────────────────────────────────────────────
// A custom hook is just a regular function whose name starts with "use".
// It can call other hooks (useState, useEffect) and encapsulates reusable
// stateful logic so components stay clean.
//
// useWeatherData hides ALL fetch mechanics behind a simple interface:
//   const { weatherData, loading, error } = useWeatherData();
// The component doesn't need to know where or how the data is fetched.

// ─── TypeScript: Interface Definitions ────────────────────────────────────────
// Define the structure of our weather data to match the API response
interface MainCity {
  name: string;
  temperature: number;
  feelsLike: number;
  wind: number;
  uvIndex: number;
}

interface City {
  name: string;
  temperature: number;
}

interface WeatherData {
  main_city: MainCity;
  cities: City[];
}

interface UseWeatherDataResult {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

// ─── React Topic: useEffect + fetch ──────────────────────────────────────────
// useEffect runs AFTER the component renders. Passing an empty dependency
// array [] means "run this effect only once — when the component first mounts".
// This is the standard pattern for fetching data on load.
//
// fetch() returns a Promise. We create an async inner function and call it
// immediately, because useEffect's callback itself cannot be async.
export function useWeatherData(): UseWeatherDataResult {
  /*
    This line creates a React state variable using the useState hook to store weather data fetched from your API.

    The useState<WeatherData | null>(null) is a generic type parameter that tells TypeScript exactly what types of values this state can hold. In this case, it can be either a WeatherData object (containing your main_city and cities array) or null.

    The initial value is set to null because when your component first renders, you haven't fetched the data yet. This is a common pattern for handling asynchronous data - you start with null, then update it once the fetch completes. This allows you to check if (weatherData) to determine whether data has loaded.

    The useState hook returns an array with two elements, which are destructured into:

    weatherData - the current state value (read-only)
    setWeatherData - a function to update the state

    By typing this as WeatherData | null, TypeScript will warn you if you try to access weatherData.main_city without first checking if weatherData is not null. This prevents the dreaded "Cannot read property of null" runtime error!
  */
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ── React Topic: Abort Controller ──────────────────────────────────────
    // AbortController lets us cancel the fetch if the component unmounts
    // before the response arrives. This prevents a "state update on unmounted
    // component" warning — a common pitfall with useEffect + fetch.
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        // TODO: Replace with your actual API endpoint
        const response = await fetch('http://localhost:3000/weather', { signal: controller.signal });

        // ── React Topic: Error handling for HTTP responses ──────────────
        // fetch() only rejects on network failure, NOT on HTTP error codes
        // (e.g. 404, 500). We must check response.ok ourselves.
        if (!response.ok) {
          throw new Error(`Failed to load weather data (HTTP ${response.status})`);
        }

        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (err) {
        // ── React Topic: Ignoring abort errors ─────────────────────────
        // When the AbortController cancels the fetch, it throws a DOMException
        // with name "AbortError". We should NOT treat that as a real error.
        if (err instanceof DOMException && err.name === 'AbortError') return;

        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();

    // ── React Topic: Cleanup function ──────────────────────────────────────
    // The function returned from useEffect is the "cleanup". React calls it
    // when the component unmounts. Here we abort any in-flight fetch.
    return () => controller.abort();
  }, []); // ← empty array: run once on mount

  return { weatherData, loading, error };
}
