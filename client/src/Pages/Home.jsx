import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Users, Award } from 'lucide-react';

const Home = () => {
  const popularExams = [
    { name: 'SSC CGL', path: '/exams/ssc-cgl', students: '2M+', icon: '🎯' },
    { name: 'Banking', path: '/exams/ibps-po', students: '1.5M+', icon: '🏦' },
    { name: 'Railway', path: '/exams/rrb-ntpc', students: '3M+', icon: '🚂' },
    { name: 'Teaching', path: '/exams/ctet', students: '1M+', icon: '👨‍🏫' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl p-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          India's #1 Exam Preparation Platform
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Prepare for SSC, Banking, Railways, Defence & more with our comprehensive courses
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/dashboard" className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-bold hover:shadow-2xl transition-shadow">
            Get Started Free
          </Link>
          <Link to="/test-series" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-cyan-600 transition-colors">
            Explore Test Series
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-cyan-100 rounded-full">
              <Users className="w-8 h-8 text-cyan-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">10M+</h3>
          <p className="text-gray-600">Active Students</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">500+</h3>
          <p className="text-gray-600">Courses</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">10000+</h3>
          <p className="text-gray-600">Mock Tests</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">100K+</h3>
          <p className="text-gray-600">Selections</p>
        </div>
      </div>

      {/* Popular Exams */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Popular Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularExams.map((exam) => (
            <Link
              key={exam.name}
              to={exam.path}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="text-5xl mb-4">{exam.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-600 transition-colors">
                {exam.name}
              </h3>
              <p className="text-gray-600">{exam.students} students</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Comprehensive Content</h3>
            <p className="text-gray-600">
              Access to detailed study materials, video lectures, and practice questions
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-bold mb-2">Expert Faculty</h3>
            <p className="text-gray-600">
              Learn from India's best educators with years of teaching experience
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
            <p className="text-gray-600">
              Track your progress with detailed analytics and personalized recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;