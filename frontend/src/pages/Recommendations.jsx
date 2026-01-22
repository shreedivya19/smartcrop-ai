// src/pages/Recommendations.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedDistrictList } from "../utils/districtNames";
import { getLocalizedCropName } from "../utils/cropNames";
import LoadingScreen from "../components/LoadingScreen";
import WaterAvailabilityCard from "../components/WaterAvailabilityCard";

const DISTRICTS = [
  "Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban","Bidar",
  "Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Dakshina Kannada",
  "Davangere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kodagu","Kolar",
  "Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru",
  "Udupi","Uttara Kannada","Vijayanagara","Vijayapura","Yadgir"
];

export default function Recommendations() {
  const { t, i18n } = useTranslation();

  // ---------- FORM STATE ----------
  const [district, setDistrict] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [ph, setPh] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  // ---------- API & OUTPUT ----------
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cropResult, setCropResult] = useState(null);
  const [waterData, setWaterData] = useState(null);
  const [fertData, setFertData] = useState(null);

  const localizedDistrict = (d) =>
    getLocalizedDistrictList([d], i18n.language);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setLoading(true);
    setCropResult(null);
    setWaterData(null);
    setFertData(null);

    try {
      // 🔥 1 — CROP RECOMMENDATION
      const res = await fetch("http://localhost:4000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          district,
          temperature: Number(temperature),
          humidity: Number(humidity),
          rainfall: Number(rainfall),
          ph: Number(ph),
          nitrogen: Number(nitrogen),
          phosphorus: Number(phosphorus),
          potassium: Number(potassium),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Recommendation error");
        setLoading(false);
        return;
      }

      const finalCrop =
        data.recommended_crop ||
        data.recommendedCrop ||
        data.crop ||
        data.prediction ||
        data.result ||
        null;

      setCropResult(finalCrop);

      // 🌧 2 — WATER API
      try {
        const waterRes = await fetch("http://localhost:4000/api/water");
        if (waterRes.ok) {
          const waterJson = await waterRes.json();
          setWaterData(waterJson);
        }
      } catch (err) {
        console.error("Water API error:", err);
      }

      // 🧪 3 — FERTILIZER API
      if (finalCrop) {
        try {
          const fertRes = await fetch("http://localhost:4000/api/fertilizer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              crop: finalCrop,
              ph: Number(ph),
              nitrogen: Number(nitrogen),
              phosphorus: Number(phosphorus),
              potassium: Number(potassium),
            }),
          });

          if (fertRes.ok) {
            const fertJson = await fertRes.json();
            setFertData(fertJson);
          }
        } catch (err) {
          console.error("Fertilizer API error:", err);
        }
      }
    } catch (err) {
      console.error("Recommend API failed", err);
      setErrorMsg("Backend offline");
    }

    setLoading(false);
  };

  return (
    <div className="pt-28 px-6 min-h-screen bg-[#f8fafc]">
      {loading && <LoadingScreen />}

      {/* 🔥 FIXED — heading title key */}
      <h1 className="text-4xl font-bold">
        {t("recommendations.title")}
      </h1>

      <p className="text-gray-600 mt-2 max-w-2xl">
        {t("recommendations.subtitle")}
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-white rounded-2xl shadow p-8 max-w-4xl mx-auto"
      >
        {/* DISTRICT */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            {t("recommendations.form.districtLabel")}
          </label>
          <select
            className="w-full border rounded-xl p-3"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">
              {t("recommendations.form.districtPlaceholder")}
            </option>

            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {localizedDistrict(d)}
              </option>
            ))}
          </select>
        </div>

        {/* 2 COLUMN GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Temperature */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("recommendations.form.temperatureLabel")}
            </label>
            <input
              type="number"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder={t("recommendations.form.temperaturePlaceholder")}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Humidity */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("recommendations.form.humidityLabel")}
            </label>
            <input
              type="number"
              step="0.1"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              placeholder={t("recommendations.form.humidityPlaceholder")}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Rainfall */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("recommendations.form.rainfallLabel")}
            </label>
            <input
              type="number"
              step="0.1"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              placeholder={t("recommendations.form.rainfallPlaceholder")}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* pH */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("recommendations.form.phLabel")}
            </label>
            <input
              type="number"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
              placeholder={t("recommendations.form.phPlaceholder")}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Nitrogen */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("recommendations.form.nitrogenLabel")}
            </label>
            <input
              type="number"
              step="0.1"
              value={nitrogen}
              onChange={(e) => setNitrogen(e.target.value)}
              placeholder={t("recommendations.form.nitrogenPlaceholder")}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Phosphorus */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("recommendations.form.phosphorusLabel")}
            </label>
            <input
              type="number"
              step="0.1"
              value={phosphorus}
              onChange={(e) => setPhosphorus(e.target.value)}
              placeholder={t("recommendations.form.phosphorusPlaceholder")}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Potassium */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("recommendations.form.potassiumLabel")}
            </label>
            <input
              type="number"
              step="0.1"
              value={potassium}
              onChange={(e) => setPotassium(e.target.value)}
              placeholder={t("recommendations.form.potassiumPlaceholder")}
              className="w-full border rounded-xl p-3"
            />
          </div>
        </div>

        {/* ERROR */}
        {errorMsg && (
          <p className="mt-4 text-sm text-red-500">{errorMsg}</p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold"
        >
          {loading ? t("loading") : t("recommendations.form.button")}
        </button>
      </form>

      {/* RESULTS */}
      <div className="mt-10 max-w-4xl mx-auto space-y-8">

        {/* CROP RESULT */}
        {cropResult && (
          <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
            <h2 className="text-xl font-bold text-green-700">
              {t("recommendations.result.title")}
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {getLocalizedCropName(cropResult, i18n.language)}
            </p>
          </div>
        )}

        {/* WATER */}
        {waterData && <WaterAvailabilityCard data={waterData} />}

        {/* FERTILIZER */}
        {fertData && (
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <h2 className="text-xl font-bold text-yellow-800">
              {t("recommendations.result.fertilizerAdvice")}
            </h2>

            {fertData?.npkDeficiency && (
              <>
                <p>
                  <strong>{t("recommendations.fertilizer.soilPHLabel")}:</strong> {fertData.npkDeficiency.pH}
                </p>
                <p>
                  <strong>{t("recommendations.fertilizer.npkLabel")}:</strong>{" "}
                  N: {fertData.npkDeficiency.N} • P: {fertData.npkDeficiency.P} • K: {fertData.npkDeficiency.K}
                </p>
              </>
            )}

            <div className="mt-4 space-y-3">
              {fertData.recommendations?.map((r, i) => (
                <div
                  key={i}
                  className="p-3 bg-white border rounded-lg flex justify-between"
                >
                  <div>
                    <div className="text-lg font-semibold">{r.name}</div>
                    <div className="text-sm text-gray-600">{r.notes}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{r.doseKgPerHa} kg/ha</div>
                    <div className="text-xs text-gray-500">{t("recommendations.fertilizer.approx")}</div>
                  </div>
                </div>
              ))}
            </div>

            {fertData.pHAdvice && (
              <p className="mt-4 text-sm text-gray-700">
                <strong>{t("recommendations.fertilizer.phAdviceLabel")}:</strong> {fertData.pHAdvice}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}