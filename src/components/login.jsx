import { useState, useEffect } from "react";
import OtpInputfunc from "./otp-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [otp, setOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [Registerno, setRegisterno] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const startResendTimer = () => {
    setCountdown(120); // 2 minutes in seconds
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            registerNo: Registerno,
            role: "user",
          }),
        }
      );

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }
      setOtp(true);
      // Start the timer on initial OTP send or resend
      startResendTimer();
      // Show alert for OTP resend if OTP was already true
      if (otp) {
        alert("OTP has been resent to your email!");
      }
      // Store token & role securely
      // localStorage.setItem("token", data.accessToken);

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
    setEmail(username);
    setRegisterno(registerno);
    const emailRegex = /^2022[a-z]{2}\d{4}@svce\.ac\.in$/;
    const regNoRegex = /^212722\d{7}$/;

    if (!username.match(emailRegex)) {
      setError("Invalid email format. Use format: 2022xx0000@svce.ac.in");
      setLoading(false);
      return;
    }

    if (!registerno.match(regNoRegex)) {
      setError("Invalid register number format. Use format: 2127220000000");
      setLoading(false);
      return;
    }

    setRegisterno(registerno);
    setEmail(username);

    if (!username || !registerno) {
      setError("Email and registerno are required.");
      setLoading(false);
      return;
    }
    fetchData();
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    await fetchData();
    setResendLoading(false);
  };

  return (
    <div className="flex bg-blue-50 items-center justify-center h-[calc(100vh-60px)]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mt-[72px]">
        {otp ? (
          <>
            <OtpInputfunc email={email} registerno={Registerno} />
            <button
              onClick={handleResendOtp}
              disabled={resendLoading || countdown > 0}
              className={`mt-4 px-2 text-center w-30 h-10 text-sm rounded-lg ${
                resendLoading || countdown > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-slate-300"
              }`}
            >
              <u>
                {resendLoading
                  ? "Sending..."
                  : countdown > 0
                  ? `Resend OTP in ${countdown}s`
                  : "Resend OTP"}
              </u>
            </button>
          </>
        ) : (
          <>
            <h2 className="flex text-2xl text-blue-600 gap-3 justify-center font-semibold text-center ">
              <FontAwesomeIcon className="mt-1" icon={faUser} />
              Student Login
            </h2>
            <hr className="mt-4 border-blue-500 border-1" />

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <form onSubmit={handleLogin} className="mt-6">
              <label className="block mb-4">
                <span className="text-sm text-gray-600">College Email</span>
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
                <span className="text-sm text-gray-600">Register Number</span>
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
