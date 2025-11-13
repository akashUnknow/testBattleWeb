import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Test = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
  const location = useLocation();

  const examData = {
    name: location.state?.name || "Sample Exam",
    duration: location.state?.duration || "N/A",
    totalQuestions: location.state?.totalQuestions || 10,
    maxMarks: location.state?.maxMarks || "N/A",
    category: location.state?.category || 2, // default category if not passed
  };

  const { name, totalQuestions, category } = examData;

  const [timeLeft, setTimeLeft] = useState(31 * 60 + 37);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionStatus, setQuestionStatus] = useState(
    Array(totalQuestions).fill("not-visited")
  );
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  // ✅ Fetch questions from backend API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/api/exams/questions/random/2/50`
        );
        setQuestions(response.data);
        setQuestionStatus(Array(response.data.length).fill("not-visited"));
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [API_URL, category, totalQuestions]);

  // Navigation and status handling
  const handleSaveAndNext = () => {
    if (selectedOption) {
      const newAnswers = { ...answers, [currentQuestion]: selectedOption };
      setAnswers(newAnswers);

      const newStatus = [...questionStatus];
      newStatus[currentQuestion - 1] = "answered";
      setQuestionStatus(newStatus);
    }

    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1] || null);
    }
  };

  const handleMarkForReview = () => {
    const newStatus = [...questionStatus];
    newStatus[currentQuestion - 1] = "marked";
    setQuestionStatus(newStatus);

    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1] || null);
    }
  };

  const handleClearResponse = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion];
    setAnswers(newAnswers);

    setSelectedOption(null);

    const newStatus = [...questionStatus];
    newStatus[currentQuestion - 1] = "visited";
    setQuestionStatus(newStatus);
  };

  const goToQuestion = (qNum) => {
    setCurrentQuestion(qNum);
    setSelectedOption(answers[qNum] || null);

    if (questionStatus[qNum - 1] === "not-visited") {
      const newStatus = [...questionStatus];
      newStatus[qNum - 1] = "visited";
      setQuestionStatus(newStatus);
    }
  };

  const getQuestionButtonClass = (index) => {
    const status = questionStatus[index];
    const qNum = index + 1;
    const isActive = qNum === currentQuestion;

    if (isActive) return "bg-blue-600 text-white border-blue-600";
    if (status === "answered")
      return "bg-green-500 text-white border-green-500";
    if (status === "marked")
      return "bg-yellow-400 text-black border-yellow-400";
    if (status === "visited") return "bg-red-500 text-white border-red-500";
    return "bg-white border-gray-300";
  };

  const countStatus = (status) => {
    return questionStatus.filter((s) => s === status).length;
  };

  const question = questions[currentQuestion - 1];
  const handleSubmitTest = () => {
    let correct = 0;
    let attempted = 0;
    questions.forEach((q, index) => {
      const selected = answers[index + 1];
      if (selected) {
        attempted++;
        const correctAnswer = [q.option1, q.option2, q.option3, q.option4][
          q.correctOption - 1
        ];
        if (selected === correctAnswer) correct++;
      }
    });
    const total = questions.length;
    const scorePercent = ((correct / total) * 100).toFixed(2);
    // Navigate to result page with data
    navigate("/result", {
      state: {
        total,
        attempted,
        correct,
        scorePercent,
        name,
      },
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b bg-white px-6 py-3 shadow-sm">
          <div>
            <h1 className="text-lg font-semibold">{name}</h1>
            <div className="text-sm text-gray-600">Stage I (CBT I)</div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-gray-700 text-sm">
              <strong>Time Left</strong>{" "}
              <span className="text-red-600 font-semibold">
                {formatTime(timeLeft)}
              </span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700">
              Enter Full Screen
            </button>
          </div>
        </div>

        {/* Question Section */}
        <div className="flex-1 p-6 overflow-y-auto bg-white m-3 rounded-lg shadow">
          {loading ? (
            <div className="text-center text-gray-500 py-10">
              Loading questions...
            </div>
          ) : (
            <>
              <div className="font-medium mb-4">
                Question {currentQuestion} of {questions.length}
              </div>

              <p className="text-lg mb-6">{question?.questionText}</p>

              <div className="space-y-3">
                {[
                  question?.option1,
                  question?.option2,
                  question?.option3,
                  question?.option4,
                ]
                  .filter(Boolean)
                  .map((opt, i) => (
                    <label
                      key={i}
                      className={`flex items-center border rounded-md p-3 cursor-pointer hover:bg-blue-50 ${
                        selectedOption === opt
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={opt}
                        checked={selectedOption === opt}
                        onChange={() => setSelectedOption(opt)}
                        className="mr-3"
                      />
                      {opt}
                    </label>
                  ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between bg-white border-t px-6 py-3 shadow-md">
          <div className="space-x-3">
            <button
              onClick={handleMarkForReview}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md border border-blue-300 hover:bg-blue-200"
            >
              Mark for Review & Next
            </button>
            <button
              onClick={handleClearResponse}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Clear Response
            </button>
          </div>
          <div className="space-x-3">
            <button
              onClick={handleSaveAndNext}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
            >
              Save & Next
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 bg-blue-50 border-l flex flex-col">
        {/* Profile */}
        <div className="bg-blue-100 p-3 flex items-center gap-2 border-b">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
            J
          </div>
          <span className="font-medium">jude</span>
        </div>

        {/* Status Summary */}
        <div className="p-4 text-sm">
          <div className="flex flex-wrap gap-2 text-xs mb-4">
            <span className="bg-green-500 text-white px-2 py-1 rounded">
              {countStatus("answered")} Answered
            </span>
            <span className="bg-yellow-400 text-black px-2 py-1 rounded">
              {countStatus("marked")} Marked
            </span>
            <span className="bg-red-500 text-white px-2 py-1 rounded">
              {countStatus("visited")} Not Answered
            </span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
              {countStatus("not-visited")} Not Visited
            </span>
          </div>

          <div className="font-bold text-blue-700 text-sm mb-3">
            SECTION : Stage I (CBT I)
          </div>

          {/* Question Grid */}
          <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto pr-1">
            {Array.from({ length: questions.length }, (_, i) => (
              <button
                key={i}
                onClick={() => goToQuestion(i + 1)}
                className={`w-10 h-10 border rounded hover:opacity-80 transition-all font-medium text-sm ${getQuestionButtonClass(
                  i
                )}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-auto border-t p-3 flex flex-col gap-2">
          <button className="bg-white border rounded-md py-2 text-sm hover:bg-gray-100">
            Question Paper
          </button>
          <button className="bg-white border rounded-md py-2 text-sm hover:bg-gray-100">
            Instructions
          </button>
          <button
            onClick={handleSubmitTest}
            className="bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 font-medium"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
