// frontend/src/components/FertilizerAdvisor.jsx
import { useTranslation } from "react-i18next";

export default function FertilizerAdvisor({ data }) {
  const { t } = useTranslation();

  const npk = data?.npkDeficiency || {};
  const rec = data?.recommendations || [];

  // ---- 1. Helper to compute soil health grade (same logic as before) ----
  const soilHealthGrade = ({ N, P, K, pH }) => {
    const score =
      (N === "High" ? 2 : N === "Medium" ? 1 : 0) +
      (P === "High" ? 2 : P === "Medium" ? 1 : 0) +
      (K === "High" ? 2 : K === "Medium" ? 1 : 0) +
      (pH >= 6 && pH <= 7.5 ? 2 : 0);

    if (score >= 7) return "A";
    if (score >= 5) return "B";
    if (score >= 3) return "C";
    return "D";
  };

  const grade = soilHealthGrade(npk);

  // ---- 2. Map backend fertilizer name -> translation key (urea/dap/mop) ----
  const getFertilizerKey = (name = "") => {
    const lower = name.toLowerCase();
    if (lower.includes("urea")) return "urea";
    if (lower.includes("dap")) return "dap";
    if (lower.includes("mop")) return "mop";
    return null;
  };

  // ---- 3. Simple organic list (still English unless you add more keys) ----
  const organicList = [
    {
      key: "vermicompost",
      name: "Vermicompost",
      dose: "2–3 tons/acre",
      notes:
        "Improves soil structure, microbial activity and moisture retention.",
    },
    {
      key: "neemCake",
      name: "Neem Cake",
      dose: "200–400 kg/acre",
      notes: "Controls soil pests and provides slow-release Nitrogen.",
    },
    {
      key: "boneMeal",
      name: "Bone Meal",
      dose: "150–250 kg/acre",
      notes: "Excellent source of organic Phosphorus.",
    },
    {
      key: "greenManure",
      name: "Green Manure",
      dose: "Grow & plough back",
      notes: "Increases soil N, improves fertility and organic content.",
    },
  ];

  return (
    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
      {/* Heading */}
      <h2 className="text-xl font-bold text-yellow-800">
        {t("recommendations.result.fertilizerAdvice")}
      </h2>

      {/* NPK + pH summary */}
      <div className="text-sm mt-2 text-gray-700">
        <p>
          <strong>{t("recommendations.fertilizer.soilPHLabel")}:</strong>{" "}
          {npk.pH}
        </p>
        <p>
          <strong>{t("recommendations.fertilizer.npkLabel")}:</strong>{" "}
          N: {npk.N} • P: {npk.P} • K: {npk.K}
        </p>
        <p className="mt-1">
          <strong>Soil Grade:</strong> {grade}
        </p>
      </div>

      {/* =====================
          INORGANIC FERTILIZERS
         ===================== */}
      <h3 className="text-lg font-semibold mt-5 mb-2 text-gray-800">
        {/* You can add a key for this later if you want */}
        Inorganic Fertilizers
      </h3>

      <div className="space-y-3">
        {rec.map((r, i) => {
          const fertKey = getFertilizerKey(r.name);

          // If we know it (urea/dap/mop), use translations. Otherwise fallback to backend text.
          const localizedName = fertKey
            ? t(`fertilizer.${fertKey}.name`)
            : r.name;

          const localizedDesc = fertKey
            ? t(`fertilizer.${fertKey}.desc`)
            : r.notes;

          return (
            <div key={i} className="p-3 bg-white border rounded-lg">
              <div className="flex justify-between">
                <div>
                  <div className="text-lg font-semibold">{localizedName}</div>
                  <div className="text-sm text-gray-600">{localizedDesc}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">
                    {r.doseKgPerHa} kg/ha
                  </div>
                  <div className="text-xs text-gray-500">
                    {t("recommendations.fertilizer.approx", "approx")}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================
          ORGANIC FERTILIZERS  
         ===================== */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-green-800">
        Organic Fertilizers
      </h3>

      <div className="space-y-3">
        {organicList.map((o, idx) => (
          <div
            key={idx}
            className="p-3 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex justify-between">
              <div>
                <div className="text-lg font-semibold">{o.name}</div>
                <div className="text-sm text-gray-600">{o.notes}</div>
              </div>
              <div className="text-right">
                <div className="text-md font-bold">{o.dose}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pH advice from backend, label translated */}
      {data?.pHAdvice && (
        <p className="mt-4 text-sm text-gray-700">
          <strong>{t("recommendations.fertilizer.phAdviceLabel")}:</strong>{" "}
          {data.pHAdvice}
        </p>
      )}
    </div>
  );
}