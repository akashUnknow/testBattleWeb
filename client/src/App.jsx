import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
