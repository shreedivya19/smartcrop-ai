// frontend/src/pages/CropDetails.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function CropDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [crop, setCrop] = useState(null);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/crops/${id}/details?horizon=14`
        );
        const data = await res.json();

        const currentCrop = data.crop || data;
        setCrop(currentCrop);

        if (data.forecast) {
          setLabels(data.forecast.labels || []);
          setValues(data.forecast.values || []);
        }

        const allRes = await fetch("http://localhost:4000/api/crops");
        const all = await allRes.json();
        setSimilar(
          all.filter(
            (c) => c.category === currentCrop.category && c._id !== currentCrop._id
          )
        );
      } catch (err) {
        console.error("Error loading crop details", err);
      }
    }

    load();
  }, [id]);

  if (!crop)
    return (
      <div className="pt-28 px-6 min-h-screen bg-[#f8fafc]">
        <p>Loading…</p>
      </div>
    );

  // ==================== LOCALIZED VALUES ====================

  const localizedName = getLocalizedCropName(crop.name, i18n.language);

  const localizedCategory =
    i18n.language === "kn"
      ? t(`category.${crop.category}`, crop.category)
      : crop.category;

  // ⭐⭐ FIXED — yield now correctly reads from multiple possible fields
  const rawYield =
    crop.yieldLevel ||
    crop.yieldPotential ||
    crop.yield ||
    "High";

  const localizedYield =
    i18n.language === "kn"
      ? t(`yield.${rawYield}`, rawYield)
      : rawYield;

  const localizedDistricts = getLocalizedDistrictList(
    crop.districts || [],
    i18n.language
  );

  const primaryDistrict =
    crop.districts && crop.districts[0]
      ? getLocalizedDistrictList(crop.districts[0], i18n.language)
      : null;

  return (
    <div className="pt-28 px-6 min-h-screen bg-[#f8fafc]">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">{localizedName}</h1>

          <p className="text-gray-600 mt-1">
            {localizedCategory} · {t("cropDetails.grownInPrefix")}{" "}
            {localizedDistricts}
          </p>
        </div>

        <div className="text-right">
          <button
            onClick={() => navigate("/crops")}
            className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow"
          >
            ← {t("cropDetails.backButton")}
          </button>

          <div className="mt-4 text-right">
            <p className="text-sm text-gray-500">{t("cropDetails.currentPrice")}</p>
            <div className="text-2xl font-bold">₹{crop.currentPrice}</div>
            <div className="text-green-600 mt-1">
              {t("cropDetails.demandIndex")}: {crop.demandIndex}%
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid sm:grid-cols-2 gap-6 mt-8">

        {/* FORECAST CARD */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{t("cropDetails.priceForecastTitle")}</h3>
            {labels.length > 0 && (
              <span className="text-sm text-gray-500">
                {labels.length} {t("cropDetails.daysSuffix")}
              </span>
            )}
          </div>

          {labels.length > 0 ? (
            <div className="mt-4">
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: localizedName,
                      data: values,
                      borderColor: "rgb(34,197,94)",
                      backgroundColor: "rgba(34,197,94,0.2)",
                      fill: true,
                    },
                  ],
                }}
                options={{
                  plugins: { tooltip: { enabled: true } },
                  scales: {
                    y: { title: { display: true, text: t("cropDetails.yAxisPrice") }},
                    x: { title: { display: true, text: t("cropDetails.xAxisDate") }},
                  },
                }}
              />
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              {t("cropDetails.noForecast")}
            </p>
          )}
        </div>

        {/* SUMMARY CARD */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold">{t("cropDetails.summaryTitle")}</h3>

          <p className="mt-3">
            <strong>{t("cropDetails.categoryLabel")}:</strong>{" "}
            {localizedCategory}
          </p>

          {primaryDistrict && (
            <p className="mt-2">
              <strong>{t("cropDetails.primaryDistrict")}:</strong>{" "}
              {primaryDistrict}
            </p>
          )}

          <p className="mt-2">
            <strong>{t("cropDetails.yieldPotential")}:</strong>{" "}
            {localizedYield}
          </p>

          <p className="mt-3 text-gray-700">
            <strong>{t("cropDetails.recommendedActions")}:</strong>{" "}
            {i18n.language === "kn"
              ? t("cropDetails.recommendedActionsText")
              : crop.recommendedActions ||
                t("cropDetails.recommendedActionsText")}
          </p>
        </div>
      </div>

      {/* SIMILAR CROPS */}
      {similar && similar.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">
            {t("cropDetails.similarTitle")}
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((s) => {
              const localizedSimilarName = getLocalizedCropName(
                s.name,
                i18n.language
              );

              return (
                <div
                  key={s._id}
                  className="bg-white p-4 rounded-2xl shadow hover:shadow-xl cursor-pointer transition transform hover:-translate-y-1"
                  onClick={() => navigate(`/crop/${s._id}`)}
                >
                  <h4 className="font-semibold">{localizedSimilarName}</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    ₹{s.currentPrice} — {s.demandIndex}%
                  </p>
                  <button className="mt-3 text-green-600 font-semibold text-sm">
                    {t("cropDetails.viewDetails")} →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}