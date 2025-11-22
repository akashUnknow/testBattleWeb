import React from "react";
import { useTestLogic } from "../../hooks/useTestLogic";
import { AlertCircle, Clock, FileText, Loader2, ChevronRight } from "lucide-react";

const Test = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
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
    isSubmitting,
  } = useTestLogic();

  const getTimeColor = () => {
    if (timeLeft <= 300) return "text-red-600 font-bold animate-pulse";
    if (timeLeft <= 600) return "text-orange-600 font-semibold";
    return "text-gray-800";
  };

  const optionList = question
    ? [
        {
          value: question.option1,
          img: question.option1ImageUrl,
          key: "option1",
          label: "A",
        },
        {
          value: question.option2,
          img: question.option2ImageUrl,
          key: "option2",
          label: "B",
        },
        {
          value: question.option3,
          img: question.option3ImageUrl,
          key: "option3",
          label: "C",
        },
        {
          value: question.option4,
          img: question.option4ImageUrl,
          key: "option4",
          label: "D",
        },
      ].filter((o) => o.value || o.img)
    : [];

  if (loading && !questions.length) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* LEFT MAIN PANEL */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER - More Compact */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 shadow-md border-b">
          <div className="mb-2 sm:mb-0">
            <h1 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">
              {examData?.name}
            </h1>
            <p className="text-xs text-gray-600">Stage I (CBT I)</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg border border-blue-200">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className={`text-xs sm:text-sm font-mono ${getTimeColor()}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* SECTIONS TABS - More Compact */}
        <div className="flex gap-2 items-center px-3 py-2 border-b bg-white overflow-x-auto">
          <h2 className="font-semibold text-xs sm:text-sm whitespace-nowrap">Section:</h2>
          <div className="flex gap-1.5 sm:gap-2">
            {sections?.map((sec) => (
              <button
                key={sec.id}
                onClick={() => loadSectionQuestions(sec)}
                disabled={loading}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeSectionId === sec.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {sec.name}
              </button>
            ))}
          </div>
        </div>

        {/* QUESTION AREA - BIGGER with SMALLER TEXT */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto bg-white">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : question ? (
            <div className="max-w-5xl mx-auto h-full">
              {/* Question Header - Smaller */}
              <div className="mb-3 sm:mb-4 pb-2 sm:pb-3 border-b">
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                      Q {currentQuestion} / {questions.length}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                      +1
                    </span>
                  </div>
                  
                  <button 
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600 transition"
                    onClick={() => alert("Report feature coming soon")}
                  >
                    <AlertCircle className="w-3 h-3" />
                    Report
                  </button>
                </div>
              </div>

              {/* QUESTION TEXT OR IMAGE - Smaller Text */}
              <div className="mb-4 sm:mb-5">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">
                  Question:
                </h3>
                {question.questionImageUrl ? (
                  <img
                    src={`${question.questionImageUrl}`}
                    alt="question"
                    className="max-w-full rounded-lg border shadow-sm mb-3"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {question.questionText}
                  </p>
                )}
              </div>

              {/* OPTIONS - Smaller and More Compact */}
              <div className="space-y-2 sm:space-y-2.5">
                <h4 className="font-semibold text-gray-800 mb-2 text-xs sm:text-sm">Choose your answer:</h4>
                {optionList.map((opt, index) => (
                  <label
                    key={index}
                    className={`flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedOption === opt.value
                        ? "bg-blue-50 border-blue-500 shadow-md"
                        : "bg-white border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={opt.value}
                      checked={selectedOption === opt.value}
                      onChange={() => handleOptionChange(opt.value)}
                      className="mt-0.5 sm:mt-1 w-3 h-3 sm:w-4 sm:h-4 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-blue-600 mr-1.5 text-xs sm:text-sm">
                        {opt.label}.
                      </span>
                      
                      {opt.img && (
                        <img
                          src={opt.img}
                          alt={`option-${index + 1}`}
                          className="max-w-full rounded border mb-2 mt-1"
                        />
                      )}

                      {opt.value && (
                        <span className="text-gray-700 text-xs sm:text-sm break-words">{opt.value}</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mb-4" />
              <p className="text-sm sm:text-base text-gray-600">Select a section to start the test</p>
            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION BUTTONS - Compact */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4 bg-white border-t shadow-lg mb-12 lg:mb-0">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              onClick={handleMarkForReview}
              disabled={!question || loading}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-lg text-xs sm:text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Mark for Review</span>
              <span className="sm:hidden">Mark</span>
            </button>

            <button
              onClick={handleClearResponse}
              disabled={!question || !selectedOption || loading}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs sm:text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
          </div>

          <button
            onClick={
              getSaveNextButtonText() === "Submit Test"
                ? handleSubmitTest
                : handleSaveAndNext
            }
            disabled={!question || loading || isSubmitting}
            className={`flex items-center justify-center gap-1.5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
              getSaveNextButtonText() === "Submit Test"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                {getSaveNextButtonText()}
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL - Question Palette - Hidden on mobile, collapsible */}
      <div className="hidden lg:flex w-64 xl:w-72 bg-gradient-to-b from-blue-50 to-indigo-50 border-l flex-col overflow-hidden">
        <div className="p-3 overflow-y-auto flex-1">
          {/* STATUS LEGEND - More Compact */}
          <div className="mb-4 bg-white rounded-lg p-3 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2 text-xs">Status</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-green-500 rounded"></div>
                  <span>Answered</span>
                </div>
                <span className="font-semibold">{countStatus("answered")}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-yellow-400 rounded"></div>
                  <span>Marked</span>
                </div>
                <span className="font-semibold">{countStatus("marked")}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-red-500 rounded"></div>
                  <span>Not Answered</span>
                </div>
                <span className="font-semibold">{countStatus("visited")}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded"></div>
                  <span>Not Visited</span>
                </div>
                <span className="font-semibold">{countStatus("not-visited")}</span>
              </div>
            </div>
          </div>

          {/* QUESTION GRID */}
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2 text-xs">All Questions</h3>
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToQuestion(i + 1)}
                  disabled={loading}
                  className={`w-9 h-9 rounded-md text-xs font-semibold border-2 transition-all hover:scale-105 ${getQuestionButtonClass(
                    i
                  )} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="p-3 border-t bg-white">
          <button
            onClick={handleSubmitTest}
            disabled={isSubmitting || loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2.5 rounded-lg text-sm font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit Test"
            )}
          </button>
        </div>
      </div>

      {/* Mobile Question Status - Bottom Sheet Style */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-2 z-10">
        <div className="flex justify-around text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>{countStatus("answered")}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span>{countStatus("marked")}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>{countStatus("visited")}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
            <span>{countStatus("not-visited")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;