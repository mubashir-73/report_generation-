import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/login-logo-small.png";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  const Logout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="shadow-sm border-b border-gray-200 bg-white z-40">
      {" "}
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-18 " />
        </div>
        <div className="space-x-6">
          <div className="text-red-500 hover:text-red-600 font-semibold transition duration-300">
            {props.loggedin == "true" ? (
              <button
                onClick={Logout}
                className="bg-white rounded-md text-blue-400"
              >
                Logout
              </button>
            ) : (
              <Link to="/admin">Admin Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  loggedin: PropTypes.string.isRequired, // Ensure loggedin is a boolean and required
};
