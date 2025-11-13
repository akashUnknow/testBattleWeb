import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, attempted, correct, scorePercent, name } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          {name || "Test Result"}
        </h1>

        <div className="space-y-3 text-gray-700 text-lg">
          <p><strong>Total Questions:</strong> {total}</p>
          <p><strong>Attempted:</strong> {attempted}</p>
          <p><strong>Correct Answers:</strong> {correct}</p>
          <p><strong>Score:</strong> {scorePercent}%</p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
