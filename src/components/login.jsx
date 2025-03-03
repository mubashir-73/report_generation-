import { LayoutContext } from "../context/LayoutContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const { layoutType } = useContext(LayoutContext);
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

  return (
    <div className="flex bg-blue-50 items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {layoutType === "/admin" ? "Admin Login" : "User Login"}
        </h2>
        <form className="mt-6" id="loginForm">
          <label className="block mb-4">
            <span className="text-sm text-gray-600">
              Username (Format: 2022cs0001)
            </span>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none"
              required
            />
            <p id="usernameError" className="text-red-500 mt-1 hidden text-sm">
              Invalid format. Use 2022cs0001.
            </p>
          </label>

          <label className="block mb-4">
            <span className="text-sm text-gray-600">Password</span>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none"
              required
            />
            <p id="passwordError" className="text-red-500 mt-1 hidden text-sm">
              Password is required.
            </p>
          </label>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          <Link to="/admin">Admin Login</Link>
        </p>
      </div>
    </div>
  );
}
