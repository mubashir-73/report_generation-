import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/login-logo-small.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
  const navigate = useNavigate();
  const Logout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToHome = () => {
    navigate("/");
  };
  return (
    <nav className="shadow-sm border-b border-gray-200 bg-white z-40 px-0">
      {" "}
      <div className="container max-w-screen flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3" onClick={goToHome}>
          <img src={logo} alt="Logo" className="h-10 w-18 " />
        </div>
        <div className="space-x-6">
          <div className="text-red-500 hover:text-red-600 font-semibold transition duration-300">
            {props.loggedin == "true" ? (
              <button
                onClick={Logout}
                className="inline-flex items-center justify-center whitespace-nowrap text-blue-600 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300 shadow dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 h-9 px-4 py-2 bg-white hover:bg-blue-100  border"
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faArrowRightFromBracket}
                />{" "}
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
