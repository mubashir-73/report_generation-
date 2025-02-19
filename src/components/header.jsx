import logo from "../assets/login-logo-small.png";
export default function Header() {
  return (
    <nav className="bg-slate-300 shadow-md">
      {" "}
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-lg font-semibold text-gray-700">Report</span>
        </div>
        <div className="space-x-6">
          <a
            href="admin.html"
            className="text-red-500 hover:text-red-600 font-semibold transition duration-300"
          >
            Admin Login
          </a>
        </div>
      </div>
    </nav>
  );
}
