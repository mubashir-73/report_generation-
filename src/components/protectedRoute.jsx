import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute.jsx";
import Login from "../components/Login.jsx";
import AdminPanel from "../components/AdminDashboard.jsx";
import UserPanel from "../components/ManageUsers.jsx";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute role="user" />}>
          <Route path="/dashboard" element={<AdminPanel />} />
        </Route> 
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<UserPanel />} />
        </Route>
      </Routes>
  
  );
}

export default App;


