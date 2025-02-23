import "./App.css";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import ReportPage from "./components/reportpage";

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
              <Header loggedin="false" /> <Login />
            </>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <>
              <Header loggedin="false" /> <ReportPage />
            </>
          }
        />
        <Route
          path="/report"
          element={
            <>
              <Header loggedin="true" /> <ReportPage />
            </>
          }
        />
      </Routes>{" "}
    </>
  );
}

export default App;
