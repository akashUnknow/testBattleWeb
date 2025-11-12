import React from "react";
import { Clock } from "lucide-react";

const Header = ({ timeLeft, onSubmit }) => {
  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold text-gray-800">TestBattle</h1>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
          <Clock className="w-5 h-5 text-red-600" />
          <span className="font-mono text-lg font-semibold text-red-600">
            {formatTime(timeLeft)}
          </span>
        </div>
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
};

export default Header;
