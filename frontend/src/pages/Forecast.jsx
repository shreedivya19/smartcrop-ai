// frontend/src/pages/Forecast.jsx

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { useTranslation } from "react-i18next";
import { getLocalizedCropName } from "../utils/cropNames";
import { getLocalizedDistrictList } from "../utils/districtNames";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const CROPS = [
  "Rice","Jowar","Ragi","Maize","Bajra","Wheat",
  "Groundnut","Sunflower","Sesame","Safflower","Castor","Soybean","Niger",
  "Tur (Pigeon Pea)","Green Gram","Black Gram","Bengal Gram (Chickpea)",
  "Horse Gram","Cowpea (Lobia)","Field Pea",
  "Coffee","Pepper","Arecanut","Coconut",
  "Mango","Banana","Papaya","Sapota (Chikoo)","Pomegranate",
  "Grapes","Guava","Orange","Lemon","Watermelon",
  "Jackfruit","Dragon Fruit","Avocado","Custard Apple (Sitaphal)","Litchi",
  "Tomato","Onion","Brinjal","Cabbage","Cauliflower",
  "Beans","Carrot","Beetroot","Leafy Greens (Soppu)"
];

const DISTRICTS = [
  "Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban","Bidar",
  "Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Dakshina Kannada",
  "Davangere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kodagu","Kolar",
  "Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru",
  "Udupi","Uttara Kannada","Vijayanagara","Vijayapura","Yadgir"
];

export default function Forecast() {
  const { t, i18n } = useTranslation();

  const [district, setDistrict] = useState("Mysuru");
  const [crop, setCrop] = useState("Ragi");
  const [horizon, setHorizon] = useState(7);
  const [weather, setWeather] = useState(null);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  const localizedCrop = (c) => getLocalizedCropName(c, i18n.language);
  const localizedDistrict = (d) => getLocalizedDistrictList(d, i18n.language);

  useEffect(() => {
    fetch(`http://localhost:4000/api/weather?district=${district}`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.log("weather error", err));
  }, [district]);

  const getForecast = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ district, crop, horizon }),
      });
      const data = await res.json();

      setLabels(data.labels || []);
      setValues(data.values || []);
    } catch (err) {
      console.log("forecast fetch failed", err);
    }
  };

  return (
    <div className="pt-28 px-6 min-h-screen bg-[#f8fafc]">
      
      <h1 className="text-4xl font-bold">{t("forecast.title")}</h1>
      <p className="text-gray-600 mt-2">{t("forecast.subtitle")}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

        <div className="lg:col-span-2">

          <div className="bg-white p-6 rounded-2xl shadow">

            <div className="grid sm:grid-cols-3 gap-4">

              <select className="border rounded-xl p-3"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}>
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {localizedDistrict(d)}
                  </option>
                ))}
              </select>

              <select className="border rounded-xl p-3"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}>
                {CROPS.map((c) => (
                  <option key={c} value={c}>
                    {localizedCrop(c)}
                  </option>
                ))}
              </select>

              <select className="border rounded-xl p-3"
                value={horizon}
                onChange={(e) => setHorizon(Number(e.target.value))}>
                <option value={7}>{t("forecast.horizon7")}</option>
                <option value={14}>{t("forecast.horizon14")}</option>
                <option value={30}>{t("forecast.horizon30")}</option>
              </select>

            </div>

            <button
              onClick={getForecast}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-bold"
            >
              {t("forecast.button")}
            </button>
          </div>

          {/* ================= GRAPH ================== */}
          {labels.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow mt-6">

              <h2 className="text-xl font-semibold mb-3">
                {t("forecast.graphTitle")}
              </h2>

              <Line
                data={{
                  labels,
                  datasets: [{
                    label: `${localizedCrop(crop)} — ${t("cropDetails.yAxisPrice")}`,
                    data: values,
                    borderColor: "rgb(34,197,94)",
                    backgroundColor: "rgba(34,197,94,0.25)",
                    fill: true
                  }]
                }}
                options={{
                  plugins: { tooltip: { enabled: true }},
                  scales: {
                    y: { title: { display: true, text: t("cropDetails.yAxisPrice") }},
                    x: { title: { display: true, text: t("cropDetails.xAxisDate") }},
                  },
                }}
              />

            </div>
          )}

        </div>

        {/* ================= WEATHER ================== */}
        <div>
          {weather?.current && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold text-lg mb-3">
                🌦 {t("forecast.weatherTitle")} — {localizedDistrict(district)}
              </h3>
              <p><strong>{t("forecast.temp")}:</strong> {weather.current.temp}°C</p>
              <p><strong>{t("forecast.humidity")}:</strong> {weather.current.humidity}%</p>
              <p><strong>{t("forecast.wind")}:</strong> {weather.current.wind} km/h</p>
              <p><strong>{t("forecast.condition")}:</strong> {weather.current.condition}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}