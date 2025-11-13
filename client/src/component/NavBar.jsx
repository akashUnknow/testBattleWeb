import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  BookOpen,
  GraduationCap,
  Menu,
  X,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { examCategories } from "../data/examData";

const NavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseEnter = (dropdown) => {
    clearTimeout(timeoutId);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setActiveDropdown(null), 200);
    setTimeoutId(id);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

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
                  className={`w-2 h-2 transition-transform ${
                    activeDropdown === "exams" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full mt-2 w-screen max-w-xl bg-white rounded-lg shadow-2xl border border-gray-100 p-6 z-50 transition-all duration-200 ${
                  activeDropdown === "exams"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
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
                              state={{
                                name: exam.name,
                                duration: exam.duration,
                                totalQuestions: exam.totalQuestions,
                                maxMarks: exam.maxMarks,
                              }}
                              className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-cyan-50 transition-colors group"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{exam.icon}</span>
                                <span className="text-sm text-gray-600 group-hover:text-cyan-600 transition-colors">
                                  {exam.name}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Static Nav Items */}
            <Link
              to="/test-series"
              className="px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700 font-medium"
            >
              Test Series
            </Link>
            <Link
              to="/skill-academy"
              className="px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700 font-medium"
            >
              Skill Academy
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <User className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm text-gray-700 font-medium cursor-pointer">
                    Hi, {user?.name || "User"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      profileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100 z-50">
                    <Link
                      to="/update-profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50"
                    >
                      Update Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
