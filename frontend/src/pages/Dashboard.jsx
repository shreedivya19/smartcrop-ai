// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { t } = useTranslation();

  const [crops, setCrops] = useState([]);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  /* ------------ FETCH CROPS (PUBLIC) ------------- */
  useEffect(() => {
    fetch("http://localhost:4000/api/crops")
      .then((res) => res.json())
      .then((data) => setCrops(data))
      .catch((err) => console.error("Crops fetch failed", err));
  }, []);

  /* ------------ PROTECTED DASHBOARD (JWT) -------- */
  useEffect(() => {
    const token = localStorage.getItem("cropai_token");
    if (!token) {
      setAuthError(t("dashboard.loginRequired"));
      return;
    }

    fetch("http://localhost:4000/api/dashboard", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setAuthError(t("dashboard.invalidToken"));
          setUser(null);
          return;
        }
        setUser(data.user);
        setAuthError("");
      })
      .catch(() => setAuthError(t("dashboard.backendError")));
  }, [t]);

  /* ---------- METRICS ---------- */
  const totalCrops = crops.length;
  const avgPrice =
    crops.reduce((sum, c) => sum + (c.currentPrice || 0), 0) / (crops.length || 1);
  const topDemandCrop =
    crops.reduce((max, c) => (c.demandIndex > max.demandIndex ? c : max), crops[0]) || {};

  /* ---------- GROUPING ---------- */
  const categories = {};
  crops.forEach((crop) => {
    if (!categories[crop.category]) categories[crop.category] = [];
    categories[crop.category].push(crop);
  });

  /* ---------- PRICE CHART ---------- */
  const priceChartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: t("dashboard.chartPrice"),
        data: Object.keys(categories).map((cat) => {
          const list = categories[cat];
          const avg =
            list.reduce((s, c) => s + (c.currentPrice || 0), 0) / list.length;
          return Math.round(avg);
        }),
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  /* ---------- DEMAND CHART ---------- */
  const demandChartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: t("dashboard.chartDemand"),
        data: Object.keys(categories).map((cat) => {
          const list = categories[cat];
          const avg =
            list.reduce((s, c) => s + (c.demandIndex || 0), 0) / list.length;
          return Math.round(avg);
        }),
        backgroundColor: [
          "#16A34A", "#0284C7", "#F59E0B", "#8B5CF6",
          "#EF4444", "#14B8A6",
        ],
      },
    ],
  };

  return (
    <div className="pt-28 px-6 min-h-screen bg-[#f8fafc]">

      {authError && (
        <p className="text-red-500 text-sm mb-2">
          {authError}
        </p>
      )}

      {user && (
        <p className="text-sm text-gray-600 mb-2">
          {t("dashboard.loggedInAs")} <span className="font-semibold">{user.name || user.email}</span>
        </p>
      )}

      <h1 className="text-4xl font-bold">{t("dashboard.title")}</h1>
      <p className="text-gray-600 mt-2">{t("dashboard.subtitle")}</p>

      {/* METRICS */}
      <div className="grid sm:grid-cols-3 gap-6 mt-10">
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">{t("dashboard.totalCrops")}</h3>
          <p className="text-3xl font-bold mt-2">{totalCrops}</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">{t("dashboard.avgPrice")}</h3>
          <p className="text-3xl font-bold mt-2">₹{Math.round(avgPrice)}</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">{t("dashboard.topCrop")}</h3>
          <p className="text-xl font-semibold mt-2">{topDemandCrop?.name}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-10 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">{t("dashboard.priceTrend")}</h3>
          <Bar data={priceChartData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">{t("dashboard.demandTrend")}</h3>
          <Pie data={demandChartData} />
        </div>
      </div>

      <p className="mt-12 text-gray-500 text-sm">
        {t("dashboard.tip")}
      </p>
    </div>
  );
}