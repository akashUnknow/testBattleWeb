import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Award, TrendingUp, Home } from "lucide-react";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, attempted, correct, scorePercent, name } = location.state || {};

  const incorrect = attempted - correct;
  const unattempted = total - attempted;
  const isPassed = scorePercent >= 50;

  const stats = [
    { label: "Total Questions", value: total, icon: Award, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Attempted", value: attempted, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Correct", value: correct, icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    { label: "Incorrect", value: incorrect, icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Header Section */}
          <div className={`${isPassed ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
            'bg-gradient-to-r from-orange-500 to-red-600'} p-4 text-white text-center relative overflow-hidden`}>
            <div className="relative z-10">
              <div className="inline-block mb-2">
                {isPassed ? <CheckCircle className="w-14 h-14" /> : <Award className="w-14 h-14" />}
              </div>
              <h1 className="text-3xl font-bold mb-1">
                {isPassed ? "Congratulations!" : "Good Effort!"}
              </h1>
              <p className="text-lg opacity-90">{name || "Quiz Results"}</p>
            </div>
          </div>

          {/* Score Section */}
          <div className="p-6 text-center border-b border-gray-200">
            <div className="inline-block">
              <div className="relative w-40 h-40 mx-auto">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="10"
                    fill="transparent" className="text-gray-200" />
                  <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 72}`}
                    strokeDashoffset={`${2 * Math.PI * 72 * (1 - scorePercent / 100)}`}
                    className={`${isPassed ? 'text-green-500' : 'text-orange-500'} transition-all duration-1000 ease-out`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold text-gray-800">{scorePercent}%</span>
                  <span className="text-xs text-gray-500 mt-1">Your Score</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-base text-gray-600">
              {isPassed ? "Excellent performance! Keep up the great work."
                : "Keep learning and you'll improve!"}
            </p>
          </div>

          {/* Stats */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Detailed Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all">
                  <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-full flex items-center justify-center mb-2 mx-auto`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {unattempted > 0 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-center text-sm">
                  <strong>{unattempted}</strong> question{unattempted !== 1 ? "s" : ""} left unattempted
                </p>
              </div>
            )}
          </div>

          {/* Button */}
          <div className="p-6 bg-gray-50 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg font-semibold text-sm"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>

        {/* Performance message */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            {scorePercent >= 90 && "🌟 Outstanding! You're a star performer!"}
            {scorePercent >= 70 && scorePercent < 90 && "💪 Great job! You're doing really well!"}
            {scorePercent >= 50 && scorePercent < 70 && "👍 Good work! Keep practicing to improve!"}
            {scorePercent < 50 && "📚 Don't give up! Every expert was once a beginner!"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Result;
