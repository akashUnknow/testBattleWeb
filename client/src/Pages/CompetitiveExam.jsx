import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle, XCircle, BookOpen, User, X } from 'lucide-react';
import Header from '../component/exam/Header.jsx';
import Instructions from './Exam/Instructions.jsx';
import QuestionPanel from '../component/exam/QuestionPanel.jsx';
import QuestionPalette from '../component/exam/QuestionPalette.jsx';

export default function CompetitiveExam() {
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [visited, setVisited] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const sampleQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
    subject: "Geography"
  },
  {
    id: 2,
    question: "What is 15 × 12?",
    options: ["150", "180", "170", "160"],
    correct: 1,
    subject: "Mathematics"
  },
  {
    id: 3,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1,
    subject: "Literature"
  },
  {
    id: 4,
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct: 2,
    subject: "Chemistry"
  },
  {
    id: 5,
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correct: 2,
    subject: "History"
  }
];


  useEffect(() => {
    if (examStarted && !examFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setExamFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, examFinished, timeLeft]);

  useEffect(() => {
    if (examStarted) {
      setVisited(prev => ({ ...prev, [currentQuestion]: true }));
    }
  }, [currentQuestion, examStarted]);

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the exam?')) {
      setExamFinished(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    return correct;
  };

  if (!examStarted) {
    return <Instructions totalQuestions={sampleQuestions.length} onStart={() => setExamStarted(true)} />;
  }

  if (examFinished) {
    const score = calculateScore();
    const percentage = ((score / sampleQuestions.length) * 100).toFixed(1);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Exam Completed!</h1>
            
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 mb-6 text-white">
              <p className="text-lg mb-2">Your Score</p>
              <p className="text-5xl font-bold mb-2">{score}/{sampleQuestions.length}</p>
              <p className="text-2xl">{percentage}%</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-600 font-semibold">Correct</p>
                <p className="text-2xl font-bold text-green-700">{score}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-600 font-semibold">Wrong</p>
                <p className="text-2xl font-bold text-red-700">{Object.keys(answers).length - score}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 font-semibold">Unattempted</p>
                <p className="text-2xl font-bold text-gray-700">{sampleQuestions.length - Object.keys(answers).length}</p>
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Take Another Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = sampleQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header timeLeft={timeLeft} onSubmit={handleSubmit} />
      <div className="flex flex-1 overflow-hidden">
        <QuestionPanel
          question={question}
          currentQuestion={currentQuestion}
          total={sampleQuestions.length}
          answer={answers[currentQuestion]}
          onAnswer={(idx) => setAnswers({ ...answers, [currentQuestion]: idx })}
          onNext={() => currentQuestion < sampleQuestions.length - 1 && setCurrentQuestion(currentQuestion + 1)}
          onPrev={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
          onMark={() => setMarked({ ...marked, [currentQuestion]: !marked[currentQuestion] })}
          marked={marked[currentQuestion]}
          onClear={() => setAnswers({ ...answers, [currentQuestion]: undefined })}
        />
        <QuestionPalette
          totalQuestions={sampleQuestions.length}
          answers={answers}
          marked={marked}
          visited={visited}
          current={currentQuestion}
          onSelect={(idx) => setCurrentQuestion(idx)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}