import React from "react";

const QuestionPanel = ({
  question,
  currentQuestion,
  total,
  answer,
  onAnswer,
  onNext,
  onPrev,
  onMark,
  marked,
}) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm font-semibold text-indigo-600">{null}</span>
        <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {total}</span>
      </div>
      <h2 className="text-lg font-semibold mb-4">{question.question}</h2>

      <div className="space-y-3 mb-8">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            className={`w-full text-left p-3 border-2 rounded-lg transition ${
              answer === i
                ? "border-indigo-600 bg-indigo-50"
                : "border-gray-200 hover:border-indigo-300"
            }`}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onMark}
          className={`px-5 py-2 rounded-lg font-semibold transition ${
            marked
              ? "bg-yellow-500 text-white"
              : "bg-yellow-50 text-yellow-700 border border-yellow-300"
          }`}
        >
          {marked ? "Unmark" : "Mark for Review"}
        </button>
        <button
          onClick={() => onAnswer(undefined)}
          className="px-5 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Clear Response
        </button>
      </div>

      <div className="flex justify-between mt-6 pt-4 border-t">
        <button
          onClick={onPrev}
          disabled={currentQuestion === 0}
          className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={currentQuestion === total - 1}
          className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionPanel;
