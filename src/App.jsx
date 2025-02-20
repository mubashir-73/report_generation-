import "./App.css";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="/admin" element={<Layout />}>
          <Route path="/admin" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
