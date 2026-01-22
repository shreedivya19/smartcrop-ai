export default function WeatherCard({ district, weather }) {
  if (!weather) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-6 max-w-md">

      <h3 className="font-semibold text-lg mb-3">
        🌦 Weather — {district}
      </h3>

      <p><strong>Temp:</strong> {weather.temperature}°C</p>
<p><strong>Humidity:</strong> {weather.humidity}%</p>
<p><strong>Condition:</strong> {weather.condition}</p>
      <p><strong>Wind:</strong> {weather.current.wind} m/s</p>
      

      {weather.forecast && (
        <div className="mt-4 grid grid-cols-5 gap-2 text-center">
          {weather.forecast.map((day, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-xl">
              <div className="font-semibold">{day.day}</div>
              <div className="text-sm">{day.temp}°C</div>
              <div className="text-xs text-gray-600">{day.condition}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}