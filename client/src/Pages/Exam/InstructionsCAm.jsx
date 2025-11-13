import { BookOpen } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const InstructionsCAm = () => {
  const navigate = useNavigate();
  const location = useLocation();
const { name, duration, totalQuestions, maxMarks } = location.state || {
  name: "Unknown Exam",
  duration: "N/A",
  totalQuestions: 0,
  maxMarks: 0,
};
const { examName } = useParams();
const handleSubmit = () => {
  navigate(`/exams/${examName}/test`, { state: { name, duration, totalQuestions, maxMarks } } );
}
  const [accepted, setAccepted] = useState(false);
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col h-screen">
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
        <div className="bg-white rounded-xl p-6 shadow-md h-full">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-700">
              {name}
            </h2>
          </div>

          {/* Duration and Marks */}
          <div className="flex justify-between flex-wrap mb-6 text-gray-800 font-medium">
            <p>Duration: {duration}</p>
            <p>Maximum Marks: {maxMarks}</p>
          </div>

          {/* English Section */}
          <div className="space-y-4 text-gray-800 leading-relaxed">
            <h3 className="text-lg font-semibold text-indigo-700">
              Read the following instructions carefully.
            </h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>The test contains {totalQuestions} questions.</li>
              <li>
                Each question has 4 options out of which only one is correct.
              </li>
              <li>You have to finish the test in {duration}.</li>
              <li>
                Try not to guess as there is negative marking (−0.33 for wrong
                answers).
              </li>
              <li>
                Each correct answer awards 1 mark. Unattempted questions carry
                no negative marks.
              </li>
            </ol>


            <div className="text-center mt-6 font-semibold text-indigo-700">
              "ALL THE BEST"
            </div>
          </div>

          {/* Declaration Section */}
          <div className="mt-6 bg-white p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Declaration:</h4>
            <label className="flex items-start space-x-2 text-gray-700">
              <input
                type="checkbox"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
                className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded"
              />
              <span>
                I have read all the instructions carefully and understood them.
                I agree not to cheat or use unfair means in this examination. I
                understand that any violation will lead to immediate
                disqualification.
              </span>
            </label>
          </div>

          {/* Start Button */}
          <div className="flex justify-end mt-6">
            <button
            onClick={handleSubmit}
              disabled={!accepted}
              className={`flex items-center gap-2 px-6 py-2 font-semibold rounded-xl transition ${
                accepted
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-300 cursor-not-allowed text-gray-600"
              }`}
            >
              <Link to={accepted ? "/exam" : "#"}>Start Test</Link>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsCAm;
