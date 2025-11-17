import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Search,
  BookOpen,
  GraduationCap,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { examCategories } from "../data/examData";
import { toast } from "sonner";
import axios from "axios";

const NavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const profileRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Logout Logic
  const handleLogout = async () => {
    try {
      const isOAuthLogin = localStorage.getItem("isOAuthLogin") === "true";

      if (isOAuthLogin) {
        await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      }

      localStorage.clear();
      sessionStorage.setItem("hasLoggedOut", "true");
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/log-in", { replace: true });
    } catch (error) {
      console.log(error)
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-cyan-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              TestBattle
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">

            {/* EXAMS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("exams")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100">
                <span className="font-medium text-gray-700">Exams</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === "exams" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "exams" && (
                <div className="absolute left-0 top-full mt-2 w-screen max-w-2xl bg-white rounded-xl shadow-2xl border p-6 z-50 animate-fadeIn">
                  <div className="grid grid-cols-3 gap-6">
                    {Object.entries(examCategories).map(([category, exams]) => (
                      <div key={category}>
                        <h3 className="font-bold text-gray-900 text-sm mb-3 border-b pb-1 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-cyan-500" />
                          {category}
                        </h3>

                        <ul className="space-y-2">
                          {exams.map((exam) => (
                            <li key={exam.name}>
                              <Link
                                to={exam.path}
                                state={exam}
                                className="flex items-center px-2 py-1 rounded hover:bg-cyan-50 text-gray-600 hover:text-cyan-600"
                              >
                                <span className="text-lg">{exam.icon}</span>
                                <span className="ml-2 text-sm">{exam.name}</span>
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

            {/* OTHER LINKS */}
            <Link
              to="/test-series"
              className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            >
              Test Series
            </Link>

            <Link
              to="/skill-academy"
              className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            >
              Skill Academy
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* PROFILE */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <User className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm font-medium">
                    Hi, {user?.name || "User"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      profileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg border p-2 animate-fadeIn">
                    <Link
                      to="/update-profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <User className="w-4 h-4" /> Update Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-5 py-2 border border-cyan-500 text-cyan-600 rounded-lg hover:bg-cyan-50 font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/log-in"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-4 bg-white border rounded-lg shadow animate-slideDown">
            <div className="px-4 py-3 border-b">
              <h3 className="font-semibold text-gray-800">Exams</h3>
            </div>

            {Object.entries(examCategories).map(([category, exams]) => (
              <div key={category} className="px-4 py-2">
                <span className="font-medium text-gray-700">{category}</span>
                <ul className="pl-4 mt-1 space-y-1">
                  {exams.map((exam) => (
                    <li key={exam.name}>
                      <Link
                        to={exam.path}
                        state={exam}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-gray-600 hover:text-cyan-600"
                      >
                        {exam.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="border-t px-4 py-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/update-profile"
                    className="block py-2 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Update Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full py-2 text-left text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="block py-2 text-cyan-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    to="/log-in"
                    className="block py-2 text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
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
