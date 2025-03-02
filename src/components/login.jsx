import { useState } from "react";
import OtpInputfunc from "./otp-input";

export default function Login() {
  const [otp, setOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [Registerno, setRegisterno] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          registerNo: Registerno,
          role: "user",
        }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }
      setOtp(true);
      // Store token & role securely
      localStorage.setItem("token", data.accessToken);

      // Redirect based on user role
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("email");
    const registerno = formData.get("registerno");
    console.log(username, registerno);
    setRegisterno(registerno);
    setEmail(username);

    if (!username || !registerno) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }
    fetchData();
  };

  return (
    <div className="flex bg-blue-50 items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {otp ? (
          <>
            <OtpInputfunc email={email} registerno={Registerno} />
            <button
              onClick={fetchData}
              className="mt-4 px-2 text-center w-30 h-10  text-sm bg-slate-100 rounded-lg hover:bg-slate-300"
            >
              resend otp
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-700">
              Login
            </h2>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <form onSubmit={handleLogin} className="mt-6">
              <label className="block mb-4">
                <span className="text-sm text-gray-600">Username</span>
                <input
                  type="text"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none"
                  required
                />
              </label>

              <label className="block mb-4">
                <span className="text-sm text-gray-600">Register No</span>
                <input
                  type="text"
                  value={Registerno}
                  name="registerno"
                  onChange={(e) => setRegisterno(e.target.value)}
                  className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none"
                  required
                />
              </label>

              <button
                type="submit"
                className={`w-full py-2 mt-4 text-white rounded-lg transition duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? "waiting..." : "Get OTP"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
