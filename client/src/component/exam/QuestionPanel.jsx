const QuestionPanel = ({ question, currentQuestion, total, answer, onAnswer, onNext, onPrev, onMark, marked, onClear }) => {
  return (
    <div className="flex-1 bg-white p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="bg-teal-600 text-white px-4 py-1 rounded text-sm font-medium">
              Stage I (CBT I)
            </button>
          </div>
          <button className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold">+1</span>
            <span className="text-gray-600">Marks</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold">-0.33</span>
            <span className="text-gray-600">Time</span>
          </div>
          <div className="text-gray-600">00:23</div>
          <select className="border rounded px-2 py-1 text-sm">
            <option>View in Hindi</option>
            <option>View in English</option>
          </select>
          <button className="text-gray-600 text-sm flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Report
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Question No. {currentQuestion + 1}</h3>
        <p className="text-gray-700 mb-6">{question.question}</p>
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((option, idx) => (
          <label key={idx} className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
            <input
              type="radio"
              name="answer"
              checked={answer === idx}
              onChange={() => onAnswer(idx)}
              className="w-4 h-4"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-3 pt-6 border-t">
        <button
          onClick={onMark}
          className="bg-cyan-500 text-white px-6 py-2 rounded-md font-medium hover:bg-cyan-600 transition"
        >
          Mark for Review & Next
        </button>
        <button
          onClick={onClear}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition"
        >
          Clear Response
        </button>
        <div className="flex-1"></div>
        <button
          onClick={onNext}
          className="bg-cyan-500 text-white px-8 py-2 rounded-md font-medium hover:bg-cyan-600 transition"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default QuestionPanel;