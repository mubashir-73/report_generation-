import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/report";
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userEmail = formData.get("email");
    const userRegisterNo = formData.get("registerNo");
    try {
      fetch("http://localhost:5000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, registerNo: userRegisterNo }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const authToken = data.accessToken;
          console.log(`Got the accessToken: ${authToken}`);
          setAuth({ authToken });
          console.log("Login successful:", data);
          setSuccess(true);
          navigate(from, { replace: true });
          return authToken;
        });
    } catch (error) {
      console.log("Error logging in: ", error);
      if (!error?.response) {
        setErrMsg("No server response.");
      } else if (error.response?.status === 400) {
        setErrMsg("All fields are mandatory");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
    }
  }

  return (
    <div className="flex bg-blue-50 items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {props.page === "Login" ? "User Login" : "Admin Login"}
        </h2>
        <form className="mt-6" id="loginForm" onSubmit={handleLogin}>
          <label className="block mb-4" name="email">
            <span className="text-sm text-gray-600">
              Email (Format: 2022cs0xx@svce.ac.in)
            </span>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none"
              required
            />
            <p id="usernameError" className="text-red-500 mt-1 hidden text-sm">
              Invalid format. Use 2022cs00xx.
            </p>
          </label>

          <label className="block mb-4">
            <span className="text-sm text-gray-600">Register No</span>
            <input
              type="text"
              id="registerNo"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none"
              name="registerNo"
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
          {props.page === "Login" ? <Link to="/admin">Admin Login</Link> : ""}
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  page: PropTypes.string.isRequired,
};
