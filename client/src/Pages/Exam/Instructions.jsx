import {
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useNavigate,useLocation, useParams } from "react-router-dom";
import React from "react";

const Instructions = () => {
  const location = useLocation();
const { name, duration, totalQuestions, maxMarks } = location.state || {
  name: "Unknown Exam",
  duration: "N/A",
  totalQuestions: 0,
  maxMarks: 0,
};
  const navigate = useNavigate();
  const statusItems = [
    { icon: "🔵", label: "Not Visited", color: "text-blue-600" },
    { icon: "⚪", label: "Not Answered", color: "text-gray-400" },
    { icon: "🟢", label: "Answered", color: "text-green-600" },
    { icon: "🟣", label: "Marked for Review", color: "text-purple-600" },
    { icon: "✅", label: "Answered & Marked", color: "text-emerald-600" },
  ];
const { examName } = useParams();

const handelNext = () => {
  navigate(`/exams/${examName}/InstructionsCAm`, {
    state: { name, duration, totalQuestions, maxMarks },
  });
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
              TestBattle
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow max-w-full mt-2">
        {/* Top Info Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Test Instructions
          </h1>

          {/* Key Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Total Questions
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Time Duration
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{duration}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Marking Scheme
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Equal Marks</p>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <span className="text-xl">⚡</span> Quick Tips
            </h3>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>
                  Mark questions for review to revisit them before submission
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>The exam auto-submits when time expires</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Always click "Save & Next" to record your answers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Question Status Legend */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Question Status Guide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {statusItems.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span className="text-3xl mb-2">{item.icon}</span>
                <span className="text-xs text-center text-gray-700 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <strong className="text-blue-900">Note:</strong> Questions marked
            for review (with or without answers) will still be evaluated. The
            timer at the top shows remaining time.
          </p>
        </div>

        {/* Footer Notice */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex gap-4">
            <span className="text-3xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-900 mb-2">
                Important Reminder
              </h3>
              <p className="text-sm text-red-800">
                The exam will automatically submit when the timer reaches zero.
                Make sure to save all your answers before time expires. Good
                luck!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="bg-white border-t border-gray-200 shadow-md py-4">
        <div className="max-w-5xl mx-auto px-6 flex justify-between">
          <button
            // onClick={window.history.back()}
            className="flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handelNext}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
