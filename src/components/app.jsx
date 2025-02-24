import "./App.css";

export default app;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<h1>User Dashboard</h1>} />
          <Route path="/admin" element={<h1>Admin Panel</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}
