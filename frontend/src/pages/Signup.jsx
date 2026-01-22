import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [farm, setFarm] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const data = await registerUser({ name, email, password });

      alert("Signup successful!");
      navigate("/login");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex justify-center items-center p-6">
      <form onSubmit={handleSignup} className="bg-white shadow-xl rounded-2xl px-10 py-10 w-full max-w-lg border border-green-100">

        <div className="flex justify-center mb-5">
          <div className="bg-green-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-3xl">🌱</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Start managing your farm today
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          placeholder="John"
          className="mt-1 mb-4 p-3 w-full border rounded-lg bg-gray-50"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          placeholder="farmer@example.com"
          className="mt-1 mb-4 p-3 w-full border rounded-lg bg-gray-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-700">Farm Name</label>
        <input
          type="text"
          placeholder="Green Valley Farm"
          className="mt-1 mb-4 p-3 w-full border rounded-lg bg-gray-50"
          value={farm}
          onChange={(e) => setFarm(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-700">Location / District</label>
        <input
          type="text"
          placeholder="Mandya"
          className="mt-1 mb-4 p-3 w-full border rounded-lg bg-gray-50"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Create a strong password"
          className="mt-1 mb-4 p-3 w-full border rounded-lg bg-gray-50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          placeholder="Re-enter password"
          className="mt-1 mb-6 p-3 w-full border rounded-lg bg-gray-50"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition"
        >
          {loading ? "Creating Account…" : "Create Account"}
        </button>

        <p className="text-center mt-5 text-gray-700 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}