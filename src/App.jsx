import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import AdminDashboard from "./components/AdminDashboard";
import ManageUsers from "./components/ManageUsers";
import ProtectedRoute from "./components/protectedRoute";
import ReportPage from "./components/reportpage.jsx";

function App() {
  return (
      <>
      <Header loggedin="false" /> 

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Route>

        {/* Report Page Route */}
        <Route path="/report" element={<ReportPage />} />

        {/* Redirect to Login if route not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </>
  );
}

export default App;




