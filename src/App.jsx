import "./App.css";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import ReportPage from "./components/reportpage";
import ReportPDF from "./components/reportpdf";
import RequireAuth from "./components/RequireAuth";
import Footer from "./components/footer";

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
              <Header loggedin="false" /> <Login page="Login" />{" "}
              <Footer loggedin="false" />
            </>
          }
        />
        <Route
          path="/test"
          element={
            <>
              <Header loggedin="true" />
            </>
          }
        />

        {/* Admin Route */}
        <Route element={<RequireAuth />}>
          <Route
            path="/reportpdf"
            element={
              <>
                <Header loggedin="false" /> <ReportPDF />{" "}
                <Footer loggedin="true" />
              </>
            }
          />
        </Route>
        <Route element={<RequireAuth />}>
          <Route
            path="/dashboard"
            element={
              <>
                <div className="flex flex-col justify-center absolute">
                  <Header loggedin="true" /> <ReportPage />
                  <br />
                  <br />
                </div>
              </>
            }
          />
        </Route>
      </Routes>{" "}
    </>
  );
}

export default App;