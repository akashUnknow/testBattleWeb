// import React, { useEffect } from "react";
import { useNavigate, useParams ,useLocation } from "react-router-dom";
import { BookOpen, Calendar, Users, Award } from "lucide-react";

const ExamDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { examName } = useParams();

  // Format the exam name for display
  const formattedExamName = examName
    .split("-")
    .map((word) => word.toUpperCase())
    .join(" ");
  const handleEnrollNow = () => {
    navigate(`/exams/${examName}/instructions`,{
      state: {
        name: location.state?.name,
        duration: location.state?.duration,
        totalQuestions: location.state?.totalQuestions,
        maxMarks: location.state?.maxMarks,
      },
    });
  };

  // const { name, duration, totalQuestions, maxMarks } = location.state || {
  //   examName: null,
  //   duration: null,
  //   totalQuestions: null,
  // };

  // useEffect(() => {
  //   console.log("Exam Details:", { name, duration, totalQuestions, maxMarks });
  // }, [name, duration, totalQuestions, maxMarks]);
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">{formattedExamName}</h1>
        <p className="text-xl opacity-90">
          Complete preparation guide and resources for {formattedExamName}{" "}
          examination
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-100 rounded-lg">
              <Calendar className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Exam Date</p>
              <p className="font-bold text-lg">TBA</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Vacancies</p>
              <p className="font-bold text-lg">5000+</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Difficulty</p>
              <p className="font-bold text-lg">Moderate</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Test Series</p>
              <p className="font-bold text-lg">50+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">
              About {formattedExamName}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The {formattedExamName} is one of the most prestigious competitive
              examinations conducted for recruitment in various government
              departments and organizations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This examination tests candidates on various subjects including
              General Knowledge, Reasoning, Quantitative Aptitude, and English
              Language.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Exam Pattern</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-700">Number of Questions</span>
                <span className="font-semibold">100</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-700">Total Marks</span>
                <span className="font-semibold">200</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-700">Duration</span>
                <span className="font-semibold">90 minutes</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700">Negative Marking</span>
                <span className="font-semibold">0.25 marks</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Syllabus</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  General Knowledge
                </h3>
                <p className="text-gray-600">
                  Current Affairs, History, Geography, Indian Polity, Economics
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Reasoning</h3>
                <p className="text-gray-600">
                  Logical Reasoning, Analytical Reasoning, Verbal & Non-Verbal
                  Reasoning
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Quantitative Aptitude
                </h3>
                <p className="text-gray-600">
                  Arithmetic, Algebra, Geometry, Data Interpretation
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">English Language</h3>
                <p className="text-gray-600">
                  Grammar, Vocabulary, Comprehension, Writing Skills
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Start Your Preparation</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-2">
                <span className="text-2xl">✓</span>
                <span>Live Classes</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-2xl">✓</span>
                <span>Mock Tests</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-2xl">✓</span>
                <span>Study Material</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-2xl">✓</span>
                <span>Expert Guidance</span>
              </li>
            </ul>
            <button
              onClick={handleEnrollNow}
              className="w-full bg-white text-cyan-600 font-bold py-3 rounded-lg hover:shadow-xl transition-shadow"
            >
              Start Now
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Important Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-cyan-600 hover:underline">
                  Official Notification
                </a>
              </li>
              <li>
                <a href="#" className="text-cyan-600 hover:underline">
                  Previous Year Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-cyan-600 hover:underline">
                  Admit Card
                </a>
              </li>
              <li>
                <a href="#" className="text-cyan-600 hover:underline">
                  Result
                </a>
              </li>
              <li>
                <a href="#" className="text-cyan-600 hover:underline">
                  Cut Off Marks
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
