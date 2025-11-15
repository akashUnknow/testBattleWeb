// components/Test.jsx
import React from "react";
import { useTestLogic } from "../../hooks/useTestLogic";

const Test = () => {
  const {
    examData,
    sections,
    loading,
    activeSectionId,
    timeLeft,
    currentQuestion,
    questions,
    question,
    selectedOption,
    formatTime,
    loadSectionQuestions,
    handleSaveAndNext,
    handleMarkForReview,
    handleClearResponse,
    goToQuestion,
    handleOptionChange,
    getQuestionButtonClass,
    countStatus,
    handleSubmitTest,
    getSaveNextButtonText,
  } = useTestLogic();



  return (
    <div className="flex h-screen bg-gray-100">
      {/* MAIN LEFT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-center bg-white px-6 py-3 shadow">
          <div>
            <h1 className="text-lg font-bold">{examData.name}</h1>
            <p className="text-sm text-gray-600">Stage I (CBT I)</p>
          </div>
          <div className="text-red-600 font-bold">{formatTime(timeLeft)}</div>
        </div>

        {/* SECTIONS */}
        <div className="flex gap-3 items-center p-3 border-b bg-white">
          <h2 className="font-semibold">Section:</h2>

          {sections?.map((sec) => (
            <button
              key={sec.id}
              onClick={() => loadSectionQuestions(sec)}
              className={`px-3 py-1.5 rounded ${
                activeSectionId === sec.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {sec.name}
            </button>
          ))}
        </div>

        {/* QUESTION AREA */}
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          {loading ? (
            <p>Loading questions...</p>
          ) : question ? (
            <>
              <div className="font-medium mb-3">
                Question {currentQuestion} / {questions.length}
              </div>

              <p className="text-lg mb-6">{question.questionText}</p>

              <div className="space-y-3">
                {[
                  question.option1,
                  question.option2,
                  question.option3,
                  question.option4,
                ]
                  .filter(Boolean)
                  .map((opt, i) => (
                    <label
                      key={i}
                      className={`flex items-center border p-3 rounded cursor-pointer ${
                        selectedOption === opt
                          ? "bg-blue-100 border-blue-500"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        value={opt}
                        checked={selectedOption === opt}
                        onChange={() => handleOptionChange(opt)}
                        className="mr-3"
                      />
                      {opt}
                    </label>
                  ))}
              </div>
            </>
          ) : (
            <p>Select a section to start the test.</p>
          )}
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="flex justify-between p-3 bg-white border-t">
          <div className="space-x-3">
            <button
              onClick={handleMarkForReview}
              disabled={!question}
              className="px-4 py-2 bg-yellow-300 rounded disabled:opacity-50"
            >
              Mark for Review
            </button>
            <button
              onClick={handleClearResponse}
              disabled={!question}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Clear
            </button>
          </div>

          <button
            onClick={handleSaveAndNext}
            disabled={!question}
            className="px-5 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {getSaveNextButtonText()}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-72 bg-blue-50 border-l flex flex-col">
        <div className="p-4">
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
            <span className="bg-gray-300 text-black px-2 py-1 rounded">
              {countStatus("not-visited")} Not Visited
            </span>
          </div>

          {/* Question buttons grid */}
          <div className="grid grid-cols-5 gap-2 max-h-[400px] overflow-y-auto">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => goToQuestion(i + 1)}
                className={`w-10 h-10 rounded ${getQuestionButtonClass(i)}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-3 border-t">
          <button
            onClick={handleSubmitTest}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;