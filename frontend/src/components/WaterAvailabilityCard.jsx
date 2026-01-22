import { useTranslation } from "react-i18next";

export default function WaterAvailabilityCard({ data }) {
  const { t } = useTranslation();

  // Normalize backend values
  const normalizedStatus = data.status?.toLowerCase().replace("soil.", "") || "";

  return (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        💧 {t("recommendations.water.title")}
      </h2>

      <p><strong>{t("recommendations.water.rainfall")}:</strong> {data.rainfall} mm</p>
      <p><strong>{t("recommendations.water.humidity")}:</strong> {data.humidity}%</p>
      <p><strong>{t("recommendations.water.temperature")}:</strong> {data.temperature}°C</p>
      <p><strong>{t("recommendations.water.evaporation")}:</strong> {data.evapotranspiration} mm</p>
      
      <p><strong>{t("recommendations.water.netWater")}:</strong> {data.waterAvailable} mm</p>

      <p className="text-gray-900 text-xl font-semibold mt-2">
        {t("recommendations.water.status")}:{" "}
        <span className="text-blue-700">
          {t(`recommendations.soil.${normalizedStatus}`)}
        </span>
      </p>
    </div>
  );
}