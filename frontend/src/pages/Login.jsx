// frontend/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth"; // ✅ make sure this file exists

export default function Login() {
  const navigate = useNavigate();

  // FORM STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI STATE
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 MAIN LOGIN HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();          // stop page refresh
    setError("");
    setLoading(true);

    try {
      // 🔹 Call backend login API (via helper)
      const data = await loginUser({ email, password });
      // data = { success, token, user }

      // ✅ 1) Save token in browser
      localStorage.setItem("cropai_token", data.token);

      // ✅ 2) (Optional) Save user object for later use
      if (data.user) {
        localStorage.setItem("cropai_user", JSON.stringify(data.user));
      }

      // ✅ 3) Redirect after login
      navigate("/dashboard"); // or "/" if you prefer

    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(180deg, #f6fff7 0%, #e8f5e9 100%)",
      }}
    >
      {/* CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-600 text-white w-12 h-12 flex items-center justify-center rounded-xl text-2xl">
            <span>🔐</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to manage your farm
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="farmer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="absolute left-3 top-3.5 text-gray-400 text-lg">📩</span>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute left-3 top-3.5 text-gray-400 text-lg">🔒</span>
          </div>

          {/* Options */}
          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox" className="h-4 w-4" />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="text-green-600 text-sm hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        {/* Divider */}
        <p className="text-center text-gray-500 text-xs mt-6 mb-3">
          New to CropAI?
        </p>

        {/* Create Account Button */}
        <Link
          to="/signup"
          className="w-full block text-center py-3 border border-green-600 rounded-xl font-semibold text-green-600 hover:bg-green-50 transition"
        >
          Create an Account
        </Link>
        
      </div>
    </div>
  );
}