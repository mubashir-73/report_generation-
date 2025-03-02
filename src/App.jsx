import "./App.css";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import ReportPage from "./components/reportpage";
import ReportPDF from "./components/reportpdf";
import OtpInputfunc from "./components/otp-input";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      {/* Display Header globally */}
      <Routes>
        {/* Root Route */}
        <Route
          path="/"
          element={
            <>
              <Header loggedin="false" /> <Login page="Login" />
            </>
          }
        />
        <Route
          path="/test"
          element={
            <>
              <Header loggedin="false" />
              <OtpInputfunc email="test@gmail.com" registerno="123456789" />
            </>
          }
        />

        {/* Admin Route */}
        <Route element={<RequireAuth />}>
          <Route
            path="/reportpdf"
            element={
              <>
                <Header loggedin="false" /> <ReportPDF />
              </>
            }
          />
        </Route>
        <Route element={<RequireAuth />}>
          <Route
            path="/dashboard"
            element={
              <>
                <Header loggedin="true" /> <ReportPage />{" "}
              </>
            }
          />
        </Route>
      </Routes>{" "}
    </>
  );
}

export default App;
