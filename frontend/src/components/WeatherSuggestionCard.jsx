export default function WeatherSuggestionCard({ weather, suggestion }) {
  return (
    <div className="p-6 bg-blue-50 border border-blue-300 rounded-2xl">
      <h2 className="text-xl font-bold text-blue-700">🌦 Live Weather</h2>

      <p className="text-lg text-gray-700 mt-2">
        <strong>Temperature:</strong> {weather.temperature}°C
      </p>
      <p className="text-lg text-gray-700">
        <strong>Humidity:</strong> {weather.humidity}%
      </p>
      <p className="text-lg text-gray-700">
        <strong>Condition:</strong> {weather.condition}
      </p>
      <p className="text-lg text-gray-700">
        <strong>Wind:</strong> {weather.wind} m/s
      </p>

      <hr className="my-4" />

      <h3 className="text-xl font-bold text-green-700">
        🌱 Suggested Crops Based on Weather
      </h3>

      <p className="text-gray-900 text-lg mt-2">{suggestion}</p>
    </div>
  );
}