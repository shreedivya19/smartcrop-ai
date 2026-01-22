// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [searchCrop, setSearchCrop] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = () => {
    if (searchCrop.trim() !== "") {
      navigate(`/crops?search=${searchCrop}`);
    }
  };

  return (
    <div className="bg-[#f8fef8] min-h-screen text-gray-800">
      {/* HERO SECTION */}
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          {t("home.heroTitle")}
        </h1>

        <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
          {t("home.heroSubtitle")}
        </p>

        {/* Search Box */}
        <div className="mt-10 flex justify-center">
          <div className="flex bg-white shadow-md rounded-xl overflow-hidden max-w-3xl w-full">
            <input
              type="text"
              value={searchCrop}
              onChange={(e) => setSearchCrop(e.target.value)}
              className="flex-1 px-4 py-4 outline-none text-lg"
              placeholder={t("home.searchPlaceholder")}
            />
            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white px-8 text-lg font-semibold"
            >
              {t("nav.search") ?? "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="flex flex-wrap justify-center gap-12 pb-20">
        <div className="text-center">
          <p className="text-3xl font-bold">10,000+</p>
          <p className="text-gray-600">{t("home.statsFarmers")}</p>
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold">50+</p>
          <p className="text-gray-600">{t("home.statsCrops")}</p>
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold">92%</p>
          <p className="text-gray-600">{t("home.statsAccuracy")}</p>
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold">₹25,000</p>
          <p className="text-gray-600">{t("home.statsSavings")}</p>
        </div>
      </div>

      {/* WHY CHOOSE CROPAI */}
      <div className="pb-10">
        <h2 className="text-4xl font-bold text-center">
          {t("home.whyTitle")}
        </h2>
        <p className="text-gray-600 text-lg text-center mt-2 mb-10">
          {t("home.whySubtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-12 max-w-6xl mx-auto">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="font-semibold text-lg">
              {t("home.featureDemandTitle")}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {t("home.featureDemandText")}
            </p>
          </div>

          <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
            <h3 className="font-semibold text-lg">
              {t("home.featureGlutTitle")}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {t("home.featureGlutText")}
            </p>
          </div>

          <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
            <h3 className="font-semibold text-lg">
              {t("home.featureMarketTitle")}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {t("home.featureMarketText")}
            </p>
          </div>

          <div className="p-6 bg-orange-50 border border-orange-200 rounded-xl">
            <h3 className="font-semibold text-lg">
              {t("home.featureDistributionTitle")}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {t("home.featureDistributionText")}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-green-600 py-16 mt-16 text-center text-white">
        <h2 className="text-4xl font-bold">
          {t("home.ctaTitle")}
        </h2>
        <p className="text-lg mt-2">
          {t("home.ctaSubtitle")}
        </p>

        <div className="flex flex-col justify-center items-center mt-10 mb-20">
          <button
            onClick={() => navigate("/wizard")}
            className="bg-white text-green-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.03] transition flex items-center gap-2"
          >
            🚀 {t("home.ctaButton")} →
          </button>
        </div>
      </div>
    </div>
  );
}