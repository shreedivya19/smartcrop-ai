import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "text-green-600 font-semibold" : "text-gray-700";

  const [activeAuth, setActiveAuth] = useState(null); 

  return (
    <nav className="w-full bg-white border-b shadow-sm fixed top-0 z-50 px-6">
      <div className="flex items-center justify-between h-16 text-[16px] font-medium">

        {/* LEFT — LOGO */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          CropAI
        </Link>

        {/* CENTER MENU — perfectly centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
          <Link className={isActive("/")} to="/">{t("nav.home")}</Link>
          <Link className={isActive("/dashboard")} to="/dashboard">{t("nav.dashboard")}</Link>
          <Link className={isActive("/crops")} to="/crops">{t("nav.crops")}</Link>
          <Link className={isActive("/forecast")} to="/forecast">{t("nav.forecast")}</Link>
          <Link className={isActive("/recommendations")} to="/recommendations">{t("nav.recommendations")}</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* LOGIN BUTTON */}
          <Link
            to="/login"
            onClick={() => setActiveAuth("login")}
            className={`px-4 py-[6px] rounded-lg border text-sm ${
              activeAuth === "login"
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-300 text-gray-800 hover:bg-gray-100"
            }`}
          >
            {t("nav.login")}
          </Link>

          {/* SIGNUP BUTTON */}
          <Link
            to="/signup"
            onClick={() => setActiveAuth("signup")}
            className={`px-4 py-[6px] rounded-lg border text-sm ${
              activeAuth === "signup"
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-300 text-gray-800 hover:bg-gray-100"
            }`}
          >
            {t("nav.signup")}
          </Link>

          {/* LANGUAGE SWITCH */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden text-sm">

            {/* EN */}
            <button
              onClick={() => i18n.changeLanguage("en")}
              className={`px-3 py-[6px] ${
                i18n.language === "en"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              EN
            </button>

            {/* ಕನ್ನಡ */}
            <button
              onClick={() => i18n.changeLanguage("kn")}
              className={`px-3 py-[6px] ${
                i18n.language === "kn"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}