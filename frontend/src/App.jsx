import { useEffect, useState } from "react";
import { Routes , Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Crops from "./pages/Crops";
import Recommendations from "./pages/Recommendations";
import Dashboard from "./pages/Dashboard";
import LoadingScreen from "./components/LoadingScreen";
import Forecast from "./pages/Forecast";
import ForecastDetails from "./pages/ForecastDetails";
import CropDetails from "./pages/CropDetails";
import Suggest from "./pages/Recommend"; 
import StartWizard from "./pages/StartWizard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {

  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setAppLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (appLoading) {
    return <LoadingScreen message="Initializing CropAI..." />;
  }

  return (
    <div>
      <Navbar />
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/crop/:id" element={<CropDetails />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/forecast-details" element={<ForecastDetails />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/recommend" element={<Suggest />} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wizard" element={<StartWizard />} />
        </Routes>
      </div>
    </div>
  );
}