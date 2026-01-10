import { useState, useEffect } from "react";
import {
  LogOut,
  Users,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  Zap,
  LogIn,
  Mic,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthDialog from "@/components/auth/AuthDialog";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false); // ✅ Add state for auth dialog
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Theme toggle
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({
    to,
    children,
    requiresAuth = false,
  }: {
    to: string;
    children: React.ReactNode;
    requiresAuth?: boolean;
  }) => {
    const handleClick = (e: React.MouseEvent) => {
      if (requiresAuth && !isAuthenticated) {
        e.preventDefault();
        setIsAuthDialogOpen(true); // ✅ Open auth dialog instead of alert
        return;
      }
      setIsMobileMenuOpen(false);
    };

    return (
      <Link
        to={to}
        onClick={handleClick}
        className="relative px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 flex items-center gap-2 font-medium group overflow-hidden text-sm"
        style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="relative">{children}</span>
        {requiresAuth && !isAuthenticated && (
          <span className="relative text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded">
            Pro
          </span>
        )}
      </Link>
    );
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isScrolled ? "w-[95%] max-w-6xl" : "w-[96%] max-w-7xl"
        }`}
      >
        <div
          className={`relative backdrop-blur-2xl rounded-2xl shadow-xl transition-all duration-500 border ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 border-white/10 shadow-black/10"
              : "bg-gradient-to-br from-gray-50 via-white to-blue-50 border-white/60 shadow-gray-300/50"
          }`}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative px-4 py-2.5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                </div>
                <div>
                  <h1
                    className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#0891b2] via-[#0284c7] to-[#2563eb] bg-clip-text text-transparent group-hover:from-[#0891b2]/90 group-hover:to-[#2563eb]/90 transition-all duration-300"
                    style={{ letterSpacing: "0.02em" }}
                  >
                    Resumware
                  </h1>
                  <p className="text-[9px] font-medium text-gray-500 dark:text-gray-400 -mt-0.5 tracking-wider uppercase">
                    AI-Powered Resume Builder
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-4">
                <nav className="flex items-center gap-1 bg-gray-50/70 dark:bg-black/20 backdrop-blur-sm rounded-xl px-1.5 py-1.5 border border-gray-200/20 dark:border-white/5">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/resume-builder" requiresAuth>
                    Create Resume
                  </NavLink>
                  <NavLink to="/interview">Interview</NavLink>
                  <NavLink to="/about">About</NavLink>
                  <NavLink to="/contact">Contact Us</NavLink>

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="p-1.5 ml-1 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-300 text-gray-600 dark:text-gray-300"
                  >
                    {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                  </button>
                </nav>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center space-x-2">
                  {!isAuthenticated ? (
                    <>
                      {/* ✅ Sign In Button - Opens Auth Dialog */}
                      <button
                        onClick={() => setIsAuthDialogOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <LogIn className="w-4 h-4" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          Sign In
                        </span>
                      </button>

                      {/* Get Started Button */}
                      <button
                        onClick={() => setIsAuthDialogOpen(true)}
                        className="relative px-7 py-3 rounded-[18px] flex items-center space-x-2 overflow-hidden transition-transform active:scale-95 group"
                        style={{
                          background:
                            "linear-gradient(145deg, #06b6d4 0%, #2563eb 50%, #3b82f6 100%)",
                          boxShadow: `
                            0 6px 20px rgba(6, 182, 212, 0.4),
                            0 3px 10px rgba(37, 99, 235, 0.3),
                            0 1px 4px rgba(0, 0, 0, 0.2),
                            inset 0 2px 4px rgba(255, 255, 255, 0.25),
                            inset 0 -2px 4px rgba(0, 0, 0, 0.25)
                          `,
                        }}
                      >
                        <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                        <span className="relative z-10 text-sm font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                          Get Started
                        </span>
                        <Zap className="w-4 h-4 relative z-10 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* User Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setIsUserDropdownOpen(!isUserDropdownOpen)
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[120px] truncate">
                            {user?.name || "Account"}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                              isUserDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* User Dropdown Menu */}
                        {isUserDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* User Info */}
                            <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700">
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                {user?.name}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                {user?.email}
                              </p>
                              {user?.userType && (
                                <span className="inline-block mt-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-md capitalize">
                                  {user.userType}
                                </span>
                              )}
                            </div>

                            {/* Menu Items */}
                            <div className="p-2">
                              <Link
                                to="/profile"
                                onClick={() => setIsUserDropdownOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                              >
                                <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                  Profile
                                </span>
                              </Link>
                              <Link
                                to="/resume-builder"
                                onClick={() => setIsUserDropdownOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                              >
                                <svg
                                  className="w-4 h-4 text-purple-600 dark:text-purple-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                  Resume Builder
                                </span>
                              </Link>
                              <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 mt-1"
                              >
                                <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                  Logout
                                </span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Get Started Button for authenticated users */}
                      <Link to="/resume-builder">
                        <button
                          className="relative px-7 py-3 rounded-[18px] flex items-center space-x-2 overflow-hidden transition-transform active:scale-95 group"
                          style={{
                            background:
                              "linear-gradient(145deg, #06b6d4 0%, #2563eb 50%, #3b82f6 100%)",
                            boxShadow: `
                              0 6px 20px rgba(6, 182, 212, 0.4),
                              0 3px 10px rgba(37, 99, 235, 0.3),
                              0 1px 4px rgba(0, 0, 0, 0.2),
                              inset 0 2px 4px rgba(255, 255, 255, 0.25),
                              inset 0 -2px 4px rgba(0, 0, 0, 0.25)
                            `,
                          }}
                        >
                          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                          <span className="relative z-10 text-sm font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                            Create Resume
                          </span>
                          <Zap className="w-4 h-4 relative z-10 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
                isMobileMenuOpen
                  ? "max-h-[600px] opacity-100 mt-3"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="border-t border-gray-200/60 dark:border-white/10 pt-3 pb-2 flex flex-col gap-1.5">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/resume-builder" requiresAuth>
                  Create Resume
                </NavLink>
                <NavLink to="/interview">Interview</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact Us</NavLink>

                {isAuthenticated ? (
                  <>
                    <div className="my-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left">
                        <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          Profile
                        </span>
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        Logout
                      </span>
                    </button>
                  </>
                ) : (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        setIsAuthDialogOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign In</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Auth Dialog Component */}
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />
    </>
  );
};

export default Navbar;
