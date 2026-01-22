export async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    temperature: data.current_weather.temperature,
    wind: data.current_weather.windspeed,
    code: data.current_weather.weathercode,
  };
}