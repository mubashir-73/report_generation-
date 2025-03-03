import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import OtpInput from "react-otp-input";
import { useState } from "react";

export default function OtpInputfunc({ email, registerno }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, registerNo: registerno }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        window.alert("Invalid OTP");
      }

      const data = await response.json();
      setSuccess(true);
      console.log("Login Response:", data);
      localStorage.setItem("token", data.accessToken);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleOtpLogin}
        className="mt-2 flex flex-col justify-center gap-1.5"
      >
        <label
          htmlFor="otp"
          className="text-center text-xl font-semibold text-blue-600"
        >
          ENTER OTP
        </label>
        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp} // Fixed event handling
            numInputs={4} // Adjust based on your OTP length
            isInputNum
            inputStyle={{
              width: "60px",
              height: "70px",
              margin: "10px",
              fontSize: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              textAlign: "center",
            }}
            renderInput={(props) => (
              <input
                {...props}
                className={`w-full px-4 py-2 mt-1 text-gray-900 rounded-lg focus:ring-blue-400 focus:outline-none ${
                  success ? "ring-green-600" : "ring-gray-200"
                }`}
              />
            )}
          />
        </div>
        <button
          type="submit"
          className="self-center w-40 py-2 mt-4 text-white rounded-lg transition duration-300 bg-blue-600 hover:bg-blue-700"
        >
          Verify
        </button>
      </form>
    </>
  );
}

OtpInputfunc.propTypes = {
  email: PropTypes.string.isRequired,
  registerno: PropTypes.string.isRequired,
};
