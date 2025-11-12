import React, { useState, useEffect } from "react";
import Header from "../component/exam/Header";
import Instructions from "../component/exam/Instructions";
import QuestionPanel from "../component/exam/QuestionPanel";
import QuestionPalette from "../component/exam/QuestionPalette";

const sampleQuestions = [/* same as your existing list */];

export default function CompetitiveExam() {
  const [examStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [visited, setVisited] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    if (examStarted && !examFinished && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, examFinished, timeLeft]);

  useEffect(() => {
    if (examStarted) setVisited((v) => ({ ...v, [currentQuestion]: true }));
  }, [currentQuestion, examStarted]);

  const handleSubmit = () => {
    if (window.confirm("Submit the test?")) setExamFinished(true);
  };

//   if (!examStarted)
//     return <Instructions totalQuestions={sampleQuestions.length} onStart={() => setExamStarted(true)} />;

  if (examFinished)
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold text-green-600">
        ✅ Test Completed! Your score: {
          sampleQuestions.filter((q, i) => answers[i] === q.correct).length
        } / {sampleQuestions.length}
      </div>
    );

  const q = sampleQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-red-50">
      <Header timeLeft={timeLeft} onSubmit={handleSubmit} />
      <h1>hahah</h1>
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <QuestionPanel
          question={q}
          currentQuestion={currentQuestion}
          total={sampleQuestions.length}
          answer={answers[currentQuestion]}
          onAnswer={(i) => setAnswers({ ...answers, [currentQuestion]: i })}
          onNext={() => setCurrentQuestion((i) => Math.min(i + 1, sampleQuestions.length - 1))}
          onPrev={() => setCurrentQuestion((i) => Math.max(i - 1, 0))}
          onMark={() => setMarked({ ...marked, [currentQuestion]: !marked[currentQuestion] })}
          marked={marked[currentQuestion]}
        />
        <QuestionPalette
          totalQuestions={sampleQuestions.length}
          answers={answers}
          marked={marked}
          visited={visited}
          current={currentQuestion}
          onSelect={(i) => setCurrentQuestion(i)}
        />
      </div>
    </div>
  );
}
