import "./App.css";

export default app;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import ReportPage from "./components/reportpage";
import ReportPDF from "./components/reportpdf";

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
        {/* Root Route */}
        <Route
          path="/"
          element={
            <>
              <Header loggedin="false" /> <Login page="Login" />
            </>
          }
        />

        {/* Admin Route */}
        <Route
          path="/reportpdf"
          element={
            <>
              <Header loggedin="false" /> <ReportPDF />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Header loggedin="true" /> <ReportPage />{" "}
            </>
          }
        />
      </Routes>{" "}
    </>
  );
}
