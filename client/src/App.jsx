import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import ExamDetail from "./Pages/ExamDetail";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UpdateProfile from "./Pages/UpdateProfile";
import CompetitiveExam from "./Pages/CompetitiveExam";

import InstructionsCAm from "./Pages/Exam/InstructionsCAm";
import Instructions from "./Pages/Exam/Instructions";
import Test from "./Pages/Exam/Test";
import Result from "./Pages/Exam/Result";

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
        <Route path="/result" element={<Result />} />
      </Route>
      <Route path="CompetitiveExam" element={<CompetitiveExam />} />
      <Route path="exams/:examName/instructions" element={<Instructions />} />
      <Route
        path="exams/:examName/instructionsCAm"
        element={<InstructionsCAm />}
      />
      <Route path="exam-detail" element={<ExamDetail />} />
      <Route path="exams/:examName/test" element={<Test />} />
    </Routes>
  );
}

export default App;
