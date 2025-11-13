const QuestionPalette = ({ totalQuestions, answers, marked, visited, current, onSelect, onSubmit }) => {
  const getQuestionStatus = (idx) => {
    if (answers[idx] !== undefined && marked[idx]) return 'answered-marked';
    if (answers[idx] !== undefined) return 'answered';
    if (marked[idx]) return 'marked';
    if (visited[idx]) return 'visited';
    return 'not-visited';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered': return 'bg-green-500 text-white border-green-600';
      case 'marked': return 'bg-purple-500 text-white border-purple-600';
      case 'answered-marked': return 'bg-purple-500 text-white border-purple-600';
      case 'visited': return 'bg-red-500 text-white border-red-600';
      default: return 'bg-white text-gray-700 border-gray-300';
    }
  };

  const answeredCount = Object.keys(answers).length;
  const markedCount = Object.keys(marked).filter(k => marked[k]).length;
  const notAnsweredCount = Object.keys(visited).length - answeredCount;
  const notVisitedCount = totalQuestions - Object.keys(visited).length;

  return (
    <div className="w-96 bg-blue-50 border-l p-6 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            <span className="text-sm">Answered</span>
          </div>
          <span className="text-sm font-semibold">{answeredCount}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
            <span className="text-sm">Marked</span>
          </div>
          <span className="text-sm font-semibold">{markedCount}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white border-2 border-gray-400 rounded-full"></div>
            <span className="text-sm">Not Visited</span>
          </div>
          <span className="text-sm font-semibold">{notVisitedCount}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
            <span className="text-sm">Not Answered</span>
          </div>
          <span className="text-sm font-semibold">{notAnsweredCount}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
            <span className="text-sm">Marked and answered</span>
          </div>
          <span className="text-sm font-semibold">0</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">SECTION : Stage I (CBT I)</h3>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, idx) => {
            const status = getQuestionStatus(idx);
            return (
              <button
                key={idx}
                onClick={() => onSelect(idx)}
                className={`w-12 h-12 rounded-md font-semibold border-2 transition ${getStatusColor(status)} ${
                  idx === current ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full bg-cyan-500 text-white py-2 rounded-md font-medium hover:bg-cyan-600 transition">
          Question Paper
        </button>
        <button className="w-full bg-cyan-500 text-white py-2 rounded-md font-medium hover:bg-cyan-600 transition">
          Instructions
        </button>
        <button
          onClick={onSubmit}
          className="w-full bg-cyan-500 text-white py-2 rounded-md font-medium hover:bg-cyan-600 transition"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};
export default QuestionPalette;