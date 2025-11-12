import React from "react";

const QuestionPalette = ({
  totalQuestions,
  answers,
  marked,
  visited,
  current,
  onSelect,
}) => {
  const getStatus = (i) => {
    if (answers[i] !== undefined) return "answered";
    if (marked[i]) return "marked";
    if (visited[i]) return "visited";
    return "not-visited";
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-md p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Question Palette</h3>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {Array.from({ length: totalQuestions }).map((_, i) => {
          const s = getStatus(i);
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`w-10 h-10 rounded-lg font-semibold transition ${
                i === current ? "ring-2 ring-indigo-600" : ""
              } ${
                s === "answered"
                  ? "bg-green-500 text-white"
                  : s === "marked"
                  ? "bg-yellow-500 text-white"
                  : s === "visited"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded"></div>
          <span>Answered ({Object.keys(answers).length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 rounded"></div>
          <span>Not Answered ({Object.keys(visited).length - Object.keys(answers).length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-500 rounded"></div>
          <span>Marked ({Object.keys(marked).filter((k) => marked[k]).length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <span>Not Visited ({totalQuestions - Object.keys(visited).length})</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionPalette;
