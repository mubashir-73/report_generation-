import "./App.css";
import Login from "./components/login";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import ReportPage from "./components/reportpage";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Routes>
        {/* Root Route */}
        <Route
          path="/"
          element={
            <>
              <Header loggedin="false" />
                <Login page="Login" />
              <Footer loggedin="false" />
            </>
          }
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <>
              <Header loggedin="true" />
              <ReportPage />
              <Footer loggedin="true" />
            </>
          }
        />

        {/* Catch-all route - redirects to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>{" "}
    </>
  );
}

export default App;
