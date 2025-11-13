const Header = ({ timeLeft, onSubmit }) => {
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-700">RRB ALP (CBT I): Loco Power - Mini Live Test</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Time Left</p>
            <div className="bg-gray-100 px-4 py-2 rounded-md">
              <span className="font-mono text-lg font-bold text-gray-800">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <button className="bg-cyan-500 text-white px-6 py-2 rounded-md font-medium hover:bg-cyan-600 transition">
            Enter Full Screen
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">jude</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;