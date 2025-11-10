import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  BookOpen,
  GraduationCap,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const NavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const examCategories = {
    "SSC Exams": [
      { name: "Delhi Police Constable", icon: "👮", path: "/exams/delhi-police-constable" },
      { name: "SSC CGL", icon: "🎯", path: "/exams/ssc-cgl" },
      { name: "SSC GD Constable", icon: "👮", path: "/exams/ssc-gd-constable" },
      { name: "SSC MTS", icon: "🎯", path: "/exams/ssc-mts" },
      { name: "SSC CPO", icon: "👮", path: "/exams/ssc-cpo" },
      { name: "SSC CHSL", icon: "🎯", path: "/exams/ssc-chsl" },
      { name: "SSC Head Constable", icon: "👮", path: "/exams/ssc-head-constable" },
      { name: "Delhi Police Head Constable", icon: "👮", path: "/exams/delhi-police-head-constable" },
      { name: "SSC Stenographer", icon: "📝", path: "/exams/ssc-stenographer" },
      { name: "Delhi Police MTS", icon: "👮", path: "/exams/delhi-police-mts" },
      { name: "IB Security Assistant", icon: "🛡️", path: "/exams/ib-security-assistant" },
      { name: "SSC Selection Post", icon: "🎯", path: "/exams/ssc-selection-post" },
      { name: "SSC JE CE", icon: "⚙️", path: "/exams/ssc-je-ce" },
      { name: "SSC JE EE", icon: "⚡", path: "/exams/ssc-je-ee" },
      { name: "SSC JHT", icon: "🌐", path: "/exams/ssc-jht" },
      { name: "SSC JE ME", icon: "🔧", path: "/exams/ssc-je-me" },
      { name: "SSC Scientific Assistant", icon: "🔬", path: "/exams/ssc-scientific-assistant" },
    ],
    "Banking Exams": [
      { name: "IBPS PO", icon: "🏦", path: "/exams/ibps-po" },
      { name: "SBI Clerk", icon: "🏦", path: "/exams/sbi-clerk" },
      { name: "RBI Grade B", icon: "🏦", path: "/exams/rbi-grade-b" },
    ],
    "Railway Exams": [
      { name: "RRB NTPC", icon: "🚂", path: "/exams/rrb-ntpc" },
      { name: "RRB Group D", icon: "🚂", path: "/exams/rrb-group-d" },
      { name: "RRB ALP", icon: "🚂", path: "/exams/rrb-alp" },
    ],
  };

  const handleMouseEnter = (dropdown) => setActiveDropdown(dropdown);
  const handleMouseLeave = () => setActiveDropdown(null);
  const closeDropdown = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  // 🔹 Logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/log-in");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-cyan-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              TestBattle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Exams Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter("exams")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-700">Exams</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === "exams" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "exams" && (
                <div className="absolute left-0 top-full mt-2 w-screen max-w-5xl bg-white rounded-lg shadow-2xl border border-gray-100 p-6 z-50">
                  <div className="grid grid-cols-3 gap-6">
                    {Object.entries(examCategories).map(([category, exams]) => (
                      <div key={category} className="space-y-3">
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide flex items-center space-x-2 pb-2 border-b border-gray-200">
                          <GraduationCap className="w-4 h-4 text-cyan-500" />
                          <span>{category}</span>
                        </h3>
                        <ul className="space-y-2">
                          {exams.map((exam) => (
                            <li key={exam.name}>
                              <Link
                                to={exam.path}
                                onClick={closeDropdown}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-cyan-50 transition-colors group"
                              >
                                <span className="text-lg">{exam.icon}</span>
                                <span className="text-sm text-gray-600 group-hover:text-cyan-600 transition-colors">
                                  {exam.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Static Nav Items */}
            <Link to="/test-series" className="px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700 font-medium">
              Test Series
            </Link>
            <Link to="/skill-academy" className="px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700 font-medium">
              Skill Academy
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-100">
                  <User className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm text-gray-700 font-medium">
                    {user?.name || "User"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-5 py-2 border border-cyan-500 text-cyan-600 rounded-lg font-medium hover:bg-cyan-50"
                >
                  Register
                </Link>
                <Link
                  to="/log-in"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <details className="group">
                <summary className="px-4 py-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-100 rounded-lg flex items-center justify-between">
                  Exams
                  <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2 space-y-4 px-4 max-h-96 overflow-y-auto">
                  {Object.entries(examCategories).map(([category, exams]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">{category}</h4>
                      <ul className="space-y-1 ml-4">
                        {exams.map((exam) => (
                          <li key={exam.name}>
                            <Link
                              to={exam.path}
                              onClick={closeDropdown}
                              className="text-sm text-gray-600 hover:text-cyan-600 flex items-center space-x-2 py-1"
                            >
                              <span>{exam.icon}</span>
                              <span>{exam.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>

              {isAuthenticated ? (
                <>
                  <p className="px-4 text-gray-700 text-sm font-medium">
                    Hi, {user?.name || "User"}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="block w-full mt-2 px-6 py-2 bg-red-500 text-white rounded-lg font-medium text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={closeDropdown}
                    className="block w-full mt-4 px-6 py-2 border border-cyan-500 text-cyan-600 rounded-lg font-medium text-center"
                  >
                    Register
                  </Link>
                  <Link
                    to="/log-in"
                    onClick={closeDropdown}
                    className="block w-full mt-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium text-center"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
