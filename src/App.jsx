import "./App.css";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import ReportPage from "./components/reportpage";
import ReportPDF from "./components/reportpdf";

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

export default App;
