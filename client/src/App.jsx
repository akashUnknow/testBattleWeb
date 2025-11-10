import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import ExamDetail from "./Pages/ExamDetail";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UpdateProfile from "./Pages/UpdateProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="exams/:examName" element={<ExamDetail />} />
        <Route path="super-coaching" element={<Dashboard />} />
        <Route path="test-series" element={<Dashboard />} />
        <Route path="skill-academy" element={<Dashboard />} />
        <Route path="pass" element={<Dashboard />} />
        <Route path="log-in" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
