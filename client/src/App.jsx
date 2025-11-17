import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthRoute, GuestRoute } from "./ProtectedRoute/ProtectedRoute";
import { LoadingScreen } from "./components/LoadingScreen";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load components
const Home = lazy(() => import("./Pages/Home"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const ExamDetail = lazy(() => import("./Pages/ExamDetail"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const UpdateProfile = lazy(() => import("./Pages/UpdateProfile"));
const CompetitiveExam = lazy(() => import("./Pages/CompetitiveExam"));
const Instructions = lazy(() => import("./Pages/Exam/Instructions"));
const InstructionsCAm = lazy(() => import("./Pages/Exam/InstructionsCAm"));
const Test = lazy(() => import("./Pages/Exam/Test"));
const Result = lazy(() => import("./Pages/Exam/Result"));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen message="Loading page..." />}>
        <Routes>
          {/* Public Routes with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="exams/:examName" element={<ExamDetail />} />
            
            {/* Protected Routes - Require Authentication */}
            <Route 
              path="dashboard" 
              element={
                <AuthRoute>
                  <Dashboard />
                </AuthRoute>
              } 
            />
            
            <Route 
              path="update-profile" 
              element={
                <AuthRoute>
                  <UpdateProfile />
                </AuthRoute>
              } 
            />
            
            <Route 
              path="result" 
              element={
                <AuthRoute>
                  <Result />
                </AuthRoute>
              } 
            />
            
            {/* Guest Routes - Only accessible when NOT logged in */}
            <Route 
              path="log-in" 
              element={
                <GuestRoute>
                  <Login />
                  
                </GuestRoute>
              } 
            />
            
            <Route 
              path="register" 
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              } 
            />

           {/* <Route 
              path="dashboard" 
              element={
                <AuthRoute>
                  <Dashboard />
                </AuthRoute>
              } 
            /> */}
            


            {/* Placeholder Routes - Can be accessed by anyone */}
            <Route path="super-coaching" element={<Dashboard />} />
            <Route path="test-series" element={<Dashboard />} />
            <Route path="skill-academy" element={<Dashboard />} />
            <Route path="pass" element={<Dashboard />} />
          </Route>

          {/* Routes without Layout - Protected */}
          <Route 
            path="CompetitiveExam" 
            element={
              <AuthRoute>
                <CompetitiveExam />
              </AuthRoute>
            } 
          />
          
          <Route 
            path="exams/:examName/instructions" 
            element={
              <AuthRoute>
                <Instructions />
              </AuthRoute>
            } 
          />
          
          <Route 
            path="exams/:examName/instructionsCAm" 
            element={
              <AuthRoute>
                <InstructionsCAm />
              </AuthRoute>
            } 
          />
          
          <Route 
            path="exam-detail" 
            element={
              <AuthRoute>
                <ExamDetail />
              </AuthRoute>
            } 
          />
          
          <Route 
            path="exams/:examName/test" 
            element={
              <AuthRoute>
                <Test />
              </AuthRoute>
            } 
          />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default App;
