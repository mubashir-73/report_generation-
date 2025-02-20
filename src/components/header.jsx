import { Link } from "react-router-dom";
import logo from "../assets/login-logo-small.png";
import { LayoutContext } from "../context/LayoutContext";
import { useContext } from "react";

export default function Header() {
  const { layoutType } = useContext(LayoutContext);
  return (
    <nav className="shadow-sm border-b border-gray-200 bg-white z-40">
      {" "}
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-auto " />
        </div>
        <div className="space-x-6">
          <div className="text-red-500 hover:text-red-600 font-semibold transition duration-300">
            {layoutType === "/admin" || layoutType === "/report" ? (
              <button className="bg-white rounded-md text-blue-400">
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
