import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4 text-lg">Welcome, Admin! 🎉</p>

      <div className="mt-6 flex flex-col gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/manage-users")}
        >
          Manage Users
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
