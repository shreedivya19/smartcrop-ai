import { useState } from "react";
import { API_FLASK } from "../config";

export default function StartWizard() {
  const [step, setStep] = useState(1);

  const [district, setDistrict] = useState("");
  const [land, setLand] = useState("");
  const [soil, setSoil] = useState("");
  const [irrigation, setIrrigation] = useState("");
  const [experience, setExperience] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const districts = [
    "Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban","Bidar",
    "Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Dakshina Kannada",
    "Davangere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kodagu","Kolar",
    "Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi",
    "Uttara Kannada","Vijayanagara","Vijayapura","Yadgir"
  ];

  const canGoNext = () => {
    if (step === 1) return !!district;
    if (step === 2) return !!land;
    if (step === 3) return !!soil;
    if (step === 4) return !!irrigation;
    if (step === 5) return !!experience;
    return true;
  };

  const handleNext = () => {
    if (!canGoNext()) return;
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1 && step <= 5) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
    setError("");
    setLoading(false);
  };

  const handleRecommend = async () => {
    if (!canGoNext()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_FLASK}/wizard_recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          district,
          land: Number(land),
          soil,
          irrigation,
          experience,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Failed to retrieve recommendation");
      }

      setResult(data);
      setStep(6);

    } catch (err) {
      console.log("Recommend error:", err);
      setError("⚠️ Could not connect to AI — ensure Flask backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 px-4 min-h-screen bg-gradient-to-b from-[#ecf8f1] to-[#e2f0e8] flex justify-center">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-xl
                      w-full max-w-lg min-h-[340px] border border-green-100">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center mb-2">
            <span className="text-2xl">🤖</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            CropAI Assistant
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Step {step} of 6
          </p>
        </div>

        {/* STEP SCREENS */}
        <div className="space-y-4">

          {step === 1 && (
            <div>
              <p className="font-semibold text-gray-800">Select your district</p>
              <p className="text-xs text-gray-500 mb-1">We’ll match this with climate conditions.</p>

              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-3 border rounded-2xl focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose...</option>
                {districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="font-semibold text-gray-800">Land Size (acres)</p>
              <p className="text-xs text-gray-500 mb-1">This helps estimate yield.</p>

              <input
                type="number"
                value={land}
                onChange={(e) => setLand(e.target.value)}
                placeholder="Example: 2.5"
                className="w-full p-3 border rounded-2xl focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="font-semibold text-gray-800">Soil Type</p>
              <p className="text-xs text-gray-500 mb-1">Different soils support different crops.</p>

              <select
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
                className="w-full p-3 border rounded-2xl focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose...</option>
                <option>Red Clay</option>
                <option>Black Soil</option>
                <option>Sandy</option>
                <option>Loamy</option>
              </select>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="font-semibold text-gray-800">Irrigation Availability</p>
              <p className="text-xs text-gray-500 mb-1">Water access strongly impacts crop success.</p>

              <select
                value={irrigation}
                onChange={(e) => setIrrigation(e.target.value)}
                className="w-full p-3 border rounded-2xl focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose...</option>
                <option>Regular water</option>
                <option>Limited water</option>
                <option>Rain-fed only</option>
              </select>
            </div>
          )}

          {step === 5 && (
            <div>
              <p className="font-semibold text-gray-800">Farming Experience</p>
              <p className="text-xs text-gray-500 mb-1">
                Helps tailor recommendations based on your expertise.
              </p>

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3 border rounded-2xl focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose...</option>
                <option>Beginner</option>
                <option>2–5 years</option>
                <option>5+ years</option>
              </select>
            </div>
          )}

          {step === 6 && result && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-semibold text-center">
                📊 Your Smart Recommendation
              </h3>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-sm space-y-1">
                <p><strong>District:</strong> {district}</p>
                <p><strong>Land:</strong> {land} acres</p>
                <p><strong>Soil:</strong> {soil}</p>
                <p><strong>Irrigation:</strong> {irrigation}</p>
                <p><strong>Experience:</strong> {experience}</p>
              </div>

              <div className="bg-white border border-green-300 rounded-2xl p-4 shadow-sm text-center">
                <p className="text-xs text-green-600 uppercase font-semibold">
                  Recommended Crop
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {result.recommendedCrop}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Confidence: {Math.round(result.confidence * 100)}%
                </p>
                <p className="text-sm text-gray-700 mt-3">
                  {result.reason}
                </p>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between items-center mt-8">
          {step > 1 && step <= 5 && (
            <button
              onClick={handleBack}
              className="px-6 py-2 rounded-2xl bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
            >
              ← Back
            </button>
          )}

          <div className="ml-auto">
            {step < 5 && (
              <button
                onClick={handleNext}
                disabled={!canGoNext()}
                className={`px-7 py-2 rounded-2xl text-sm font-semibold 
                  ${canGoNext() ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"}`}
              >
                Next →
              </button>
            )}

            {step === 5 && (
              <button
                onClick={handleRecommend}
                disabled={!canGoNext() || loading}
                className="px-7 py-2 rounded-2xl text-sm font-semibold bg-green-600 text-white hover:bg-green-700"
              >
                {loading ? "Analyzing…" : "Show Recommendation"}
              </button>
            )}

            {step === 6 && (
              <button
                onClick={handleReset}
                className="px-7 py-2 rounded-2xl text-sm font-semibold bg-blue-500 text-white"
              >
                Start Again
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}