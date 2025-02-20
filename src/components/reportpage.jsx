import logo from "../assets/login-logo-small.png";
export default function Header() {
  return (
    <><nav className="bg-slate-300 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">

        {/* Left: Forese Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Forese Logo" className="h-10 w-auto" />
        </div>

        {/* Right: Logout Button */}
        <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition duration-300">
          Logout
        </button>
      </div>
    </nav><div className="w-full h-screen p-6 bg-gray-100">
        <div className="w-full max-w-10xl bg-white p-6 rounded-lg shadow-lg relative">
          {/* Student Info */}
          <div className="flex justify-between px-0">
            <div className="text-lg">
              <p><strong>Student Name:</strong> Harshitha</p>
              <p><strong>Student Registration:</strong> 2127230701043</p>
            </div>
            <div className="text-lg pr-[30rem]">
              <p><strong>Department:</strong> Electronics and Communication</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 px-4">
          <h2 className="text-2xl font-bold text-center flex-1">Report Preview</h2>
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition duration-300">
            Download
          </button>
        </div>
      </div></>
  );
}




