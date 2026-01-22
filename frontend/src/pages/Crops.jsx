// src/pages/Crops.jsx

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalizedDistrictList } from "../utils/districtNames";
import { getLocalizedCropName } from "../utils/cropNames";

// Category → Badge color
const CATEGORY_COLORS = {
  Cereals: "bg-yellow-100 text-yellow-700",
  Pulses: "bg-green-100 text-green-700",
  Oilseeds: "bg-orange-100 text-orange-700",
  Fruits: "bg-pink-100 text-pink-700",
  Vegetables: "bg-lime-100 text-lime-700",
  Plantation: "bg-emerald-100 text-emerald-700",
  Commercial: "bg-amber-100 text-amber-800",
};

const ALL_DISTRICTS = [
  "Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban","Bidar",
  "Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga",
  "Dakshina Kannada","Davangere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi",
  "Kodagu","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga",
  "Tumakuru","Udupi","Uttara Kannada","Vijayanagara","Vijayapura","Yadgir"
];

export default function Crops() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [allCrops, setAllCrops] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const term = query.get("search");
    if (term) setSearch(term);
  }, [location.search]);

  useEffect(() => {
    fetch("http://localhost:4000/api/crops")
      .then((res) => res.json())
      .then((data) => {
        setAllCrops(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let list = [...allCrops];

    if (search.trim()) {
      list = list.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDistrict) {
      list = list.filter((c) => c.districts.includes(selectedDistrict));
    }

    if (selectedCategory) {
      list = list.filter((c) => c.category === selectedCategory);
    }

    switch (sortOption) {
      case "price_low_high": list.sort((a, b) => a.currentPrice - b.currentPrice); break;
      case "price_high_low": list.sort((a, b) => b.currentPrice - a.currentPrice); break;
      case "demand_low_high": list.sort((a, b) => a.demandIndex - b.demandIndex); break;
      case "demand_high_low": list.sort((a, b) => b.demandIndex - a.demandIndex); break;
    }

    setFiltered(list);
  }, [search, selectedDistrict, selectedCategory, sortOption, allCrops]);

  const categories = [...new Set(allCrops.map((c) => c.category))];
  const hideCategories = search.trim().length > 0;

  return (
    <div className="pt-28 px-6 min-h-screen bg-[#f8fafc]">
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold">{t("crops.title")}</h1>
      <p className="text-gray-600 mt-2">{t("crops.subtitle")}</p>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mt-6 bg-[#f8fafc] sticky top-20 z-40 py-3">

        {/* Search */}
        <input
          type="text"
          placeholder={t("crops.searchPlaceholder")}
          className="p-3 border rounded-xl flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* District Filter */}
        <select
          className="p-3 border rounded-xl"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">{t("crops.filterDistrict")}</option>
          {ALL_DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {getLocalizedDistrictList([d], i18n.language)}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          className="p-3 border rounded-xl"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">{t("crops.filterCategory")}</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {i18n.language === "kn" ? t(`category.${cat}`) : cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="p-3 border rounded-xl"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">{t("crops.filterSort")}</option>
          <option value="price_low_high">{t("crops.sortPriceLowHigh")}</option>
          <option value="price_high_low">{t("crops.sortPriceHighLow")}</option>
          <option value="demand_low_high">{t("crops.sortDemandLowHigh")}</option>
          <option value="demand_high_low">{t("crops.sortDemandHighLow")}</option>
        </select>
      </div>

      {/* CATEGORY SECTIONS */}
      {!hideCategories && categories.map((category) => {
        const sectionCrops = filtered.filter((c) => c.category === category);
        if (sectionCrops.length === 0) return null;

        return (
          <div key={category} className="mt-12">
            {/* Category Title */}
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className={`px-4 py-1 rounded-full font-semibold ${
                CATEGORY_COLORS[category] || "bg-slate-200 text-slate-800"
              }`}>
                {i18n.language === "kn" ? t(`category.${category}`) : category}
              </span>
            </h2>

            {/* Crop Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectionCrops.map((crop) => (
                <CropCard key={crop._id} crop={crop} navigate={navigate} lng={i18n.language} />
              ))}
            </div>
          </div>
        );
      })}

      {/* SEARCH MODE RESULT */}
      {hideCategories && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map((crop) => (
            <CropCard key={crop._id} crop={crop} navigate={navigate} lng={i18n.language} />
          ))}
        </div>
      )}
    </div>
  );
}


// ==================================
// CROP CARD COMPONENT
// ==================================
function CropCard({ crop, navigate, lng }) {
  const { t, i18n } = useTranslation();

  const displayName = getLocalizedCropName(crop.name, lng);
  const displayDistricts = getLocalizedDistrictList(crop.districts, lng);

  return (
    <div
      onClick={() => navigate(`/crop/${crop._id}`)}
      className="p-6 bg-white border rounded-2xl shadow hover:shadow-xl cursor-pointer transition transform hover:-translate-y-1"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{displayName}</h3>
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            CATEGORY_COLORS[crop.category] || "bg-slate-200 text-slate-800"
          }`}
        >
          {i18n.language === "kn" ? t(`category.${crop.category}`) : crop.category}
        </span>
      </div>

      <p className="text-gray-600 mt-2">
        <strong>{t("crops.districts")}:</strong> {displayDistricts}
      </p>

      <div className="mt-3">
        <p><strong>{t("crops.price")}:</strong> ₹{crop.currentPrice}</p>
        <p><strong>{t("crops.demand")}:</strong> {crop.demandIndex}%</p>
      </div>

      <p className="text-green-600 font-semibold mt-4">
        {t("crops.viewDetails")} →
      </p>
    </div>
  );
}