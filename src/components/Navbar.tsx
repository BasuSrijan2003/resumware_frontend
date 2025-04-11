import { useState } from "react";
import { Menu, X, LogOut, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Facebook } from "lucide-react";
import Dashboard from "./dashboard";
import Templates from "./Templates";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State for signup form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");

  // Sample data for skill distribution
  const studentSkillsData = [
    { skill: "Data Analysis", average: 85, color: "blue" },
    { skill: "Machine Learning", average: 72, color: "green" },
    { skill: "Web Development", average: 78, color: "indigo" },
    { skill: "UI/UX Design", average: 65, color: "amber" },
    { skill: "Project Management", average: 70, color: "red" },
  ];

  // Login handler with user type consideration
  const handleLogin = (e, selectedUserType) => {
    e.preventDefault();
    console.log(
      "Login attempted with:",
      loginEmail,
      loginPassword,
      "as",
      selectedUserType
    );

    // Reset fields after submission
    setLoginEmail("");
    setLoginPassword("");

    // Set user type and login state
    setUserType(selectedUserType);
    setIsLoggedIn(true);

    // Navigate based on user type
    if (selectedUserType === "candidate") {
      setShowTemplates(true);
      setShowDashboard(false);
    } else if (selectedUserType === "institute") {
      setShowDashboard(true);
      setShowTemplates(false);
    }
  };

  // Signup handler with user type consideration
  const handleSignup = (e, selectedUserType) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    console.log(
      "Signup attempted with:",
      fullName,
      signupEmail,
      signupPassword,
      phoneNumber,
      "as",
      selectedUserType
    );

    // Reset fields after submission
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setFullName("");
    setPhoneNumber("");

    // Set user type and login state
    setUserType(selectedUserType);
    setIsLoggedIn(true);

    // Navigate based on user type
    if (selectedUserType === "candidate") {
      setShowTemplates(true);
      setShowDashboard(false);
    } else if (selectedUserType === "institute") {
      setShowDashboard(true);
      setShowTemplates(false);
    }
  };

  // Social login handlers with user type consideration
  const handleSocialLogin = (provider, selectedUserType) => {
    console.log(`Login with ${provider} as ${selectedUserType}`);

    // Set user type and login state
    setUserType(selectedUserType);
    setIsLoggedIn(true);

    // Navigate based on user type
    if (selectedUserType === "candidate") {
      setShowTemplates(true);
      setShowDashboard(false);
    } else if (selectedUserType === "institute") {
      setShowDashboard(true);
      setShowTemplates(false);
    }
  };

  const handlePhoneLogin = (selectedUserType) => {
    console.log(
      "Login with phone number:",
      phoneNumber,
      "as",
      selectedUserType
    );

    // Set user type and login state
    setUserType(selectedUserType);
    setIsLoggedIn(true);

    // Navigate based on user type
    if (selectedUserType === "candidate") {
      setShowTemplates(true);
      setShowDashboard(false);
    } else if (selectedUserType === "institute") {
      setShowDashboard(true);
      setShowTemplates(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDashboard(false);
    setShowTemplates(false);
    setUserType(null);
  };

  // Always render the navbar
  const renderNavbar = () => {
    return (
      <nav className="bg-white border-b border-gray-200 py-3 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                IIT-IIM Resume
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation links */}
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition font-medium flex items-center space-x-1"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Profile
                </Link>
                <Link
                  to="/resume-builder"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Resume Builder
                </Link>
                <Link
                  to="/resume-analysis"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Analysis
                </Link>
                <Link
                  to="/jobs"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Jobs
                </Link>
                <Link
                  to="/settings"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Settings
                </Link>
              </>
            )}

            {isLoggedIn ? (
              // Logout button when logged in
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            ) : (
              // Login/Signup buttons when not logged in
              <>
                <AuthDialog
                  type="login"
                  mobile={false}
                  onSignup={(e, selectedUserType) =>
                    handleSignup(e, selectedUserType)
                  }
                  onSocialLogin={(provider, selectedUserType) =>
                    handleSocialLogin(provider, selectedUserType)
                  }
                  onLogin={(e, selectedUserType) =>
                    handleLogin(e, selectedUserType)
                  }
                  onPhoneLogin={handlePhoneLogin}
                />

                <AuthDialog
                  type="signup"
                  mobile={false}
                  onSignup={(e, selectedUserType) =>
                    handleSignup(e, selectedUserType)
                  }
                  onSocialLogin={(provider, selectedUserType) =>
                    handleSocialLogin(provider, selectedUserType)
                  }
                  onLogin={(e, selectedUserType) =>
                    handleLogin(e, selectedUserType)
                  }
                  onPhoneLogin={handlePhoneLogin}
                />

                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 p-2 md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 md:hidden z-50 shadow-md">
              <div className="flex flex-col space-y-4">
                {/* Home link for mobile */}
                <Link
                  to="/"
                  className="py-2 text-gray-700 hover:text-blue-600 transition font-medium flex items-center space-x-1"
                >
                  <Home size={16} />
                  <span>Home</span>
                </Link>

                {isLoggedIn && (
                  <>
                    <Link
                      to="/profile"
                      className="py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/resume-builder"
                      className="py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                      Resume Builder
                    </Link>
                    <Link
                      to="/resume-analysis"
                      className="py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                      Analysis
                    </Link>
                    <Link
                      to="/jobs"
                      className="py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                      Jobs
                    </Link>
                    <Link
                      to="/settings"
                      className="py-2 text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                      Settings
                    </Link>
                  </>
                )}

                {isLoggedIn ? (
                  // Logout button for mobile when logged in
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full flex justify-center items-center space-x-1"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                ) : (
                  // Login/Signup buttons for mobile when not logged in
                  <>
                    <AuthDialog
                      type="login"
                      mobile={true}
                      onSignup={(e, selectedUserType) =>
                        handleSignup(e, selectedUserType)
                      }
                      onSocialLogin={(provider, selectedUserType) =>
                        handleSocialLogin(provider, selectedUserType)
                      }
                      onLogin={(e, selectedUserType) =>
                        handleLogin(e, selectedUserType)
                      }
                      onPhoneLogin={handlePhoneLogin}
                    />

                    <AuthDialog
                      type="signup"
                      mobile={true}
                      onSignup={(e, selectedUserType) =>
                        handleSignup(e, selectedUserType)
                      }
                      onSocialLogin={(provider, selectedUserType) =>
                        handleSocialLogin(provider, selectedUserType)
                      }
                      onLogin={(e, selectedUserType) =>
                        handleLogin(e, selectedUserType)
                      }
                      onPhoneLogin={handlePhoneLogin}
                    />

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  // Render the appropriate content based on state
  return (
    <>
      {renderNavbar()}
      {showDashboard && userType === "institute" && (
        <Dashboard
          setShowDashboard={setShowDashboard}
          studentSkillsData={studentSkillsData}
        />
      )}
      {showTemplates && userType === "candidate" && (
        <Templates setShowTemplates={setShowTemplates} />
      )}
    </>
  );
};

const AuthDialog = ({
  type,
  mobile = false,
  onLogin,
  onSignup,
  onSocialLogin,
  onPhoneLogin,
}) => {
  const [activeTab, setActiveTab] = useState("email");
  const [userType, setUserType] = useState(null); // State for user type selection
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Reset user type selection when dialog is closed
  const resetUserType = () => {
    setUserType(null);
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetUserType()}>
      <DialogTrigger asChild>
        {type === "login" ? (
          <Button variant="outline" className={mobile ? "w-full" : ""}>
            Login
          </Button>
        ) : (
          <Button variant="outline" className={mobile ? "w-full" : ""}>
            Sign Up
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {!userType
              ? type === "login"
                ? "Login as"
                : "Sign Up as"
              : type === "login"
              ? "Welcome Back"
              : "Create an Account"}
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Show user type selection first */}
        {!userType ? (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="p-4 h-auto flex flex-col items-center gap-3 hover:border-blue-500"
                onClick={() => setUserType("candidate")}
              >
                <User className="h-8 w-8" />
                <span className="font-medium">Candidate</span>
              </Button>

              <Button
                variant="outline"
                className="p-4 h-auto flex flex-col items-center gap-3 hover:border-blue-500"
                onClick={() => setUserType("institute")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M2 22v-4l4-2-4-2V9l7 3 7-3v5l-4 2 4 2v4L12 19l-10 3Z" />
                  <path d="M5 4.5V2l7 3 7-3v2.5" />
                </svg>
                <span className="font-medium">Institute</span>
              </Button>
            </div>
          </div>
        ) : (
          // Step 2: After selecting user type, show appropriate forms
          <>
            {/* Back button to change user type */}
            <button
              onClick={resetUserType}
              className="text-sm text-blue-600 hover:underline flex items-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Change user type
            </button>

            {/* Login Form */}
            {type === "login" ? (
              <Tabs
                defaultValue="email"
                className="w-full"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>
                <TabsContent value="email" className="mt-4">
                  <form
                    onSubmit={(e) => onLogin(e, userType)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder={`Enter your email`}
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Login as{" "}
                      {userType.charAt(0).toUpperCase() + userType.slice(1)}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="phone" className="mt-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onPhoneLogin(userType);
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                        className="w-full"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Send OTP
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            ) : (
              // Signup Form - Different fields based on user type
              <form
                onSubmit={(e) => onSignup(e, userType)}
                className="space-y-4 mt-2"
              >
                {userType === "candidate" && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full"
                    />
                  </div>
                )}

                {userType === "institute" && (
                  <div className="space-y-2">
                    <Label htmlFor="instituteName">Institute Name</Label>
                    <Input
                      id="instituteName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter institute name"
                      required
                      className="w-full"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder={`Enter ${userType} email`}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">
                    {userType === "candidate"
                      ? "Phone Number (optional)"
                      : "Contact Phone Number"}
                  </Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full"
                    required={userType === "institute"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Create {userType.charAt(0).toUpperCase() + userType.slice(1)}{" "}
                  Account
                </Button>
              </form>
            )}
          </>
        )}

        {/* Only show social login options after user type selection */}
        {userType && (
          <>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onSocialLogin("Google", userType)}
                className="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="text-red-500"
                >
                  <path
                    fill="currentColor"
                    d="M12.545 12.151c0 1.054-.855 1.909-1.909 1.909H9.909v1.909h.727c.5 0 .909.409.909.909v1.909h-.727c-.5 0-.909-.409-.909-.909v-.727H6v.727c0 .5-.409.909-.909.909H3.273v-1.909c0-.5.409-.909.909-.909h.727v-1.909h-.727c-1.054 0-1.909-.855-1.909-1.909V9.454c0-1.054.855-1.909 1.909-1.909h.727V5.636h-.727c-.5 0-.909-.409-.909-.909V2.818h1.818c.5 0 .909.409.909.909v.727h3.818v-.727c0-.5.409-.909.909-.909h1.818v1.909c0 .5-.409.909-.909.909h-.727v1.909h.727c1.054 0 1.909.855 1.909 1.909v2.697z"
                  />
                </svg>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onSocialLogin("Github", userType)}
                className="flex items-center justify-center"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onSocialLogin("LinkedIn", userType)}
                className="flex items-center justify-center"
              >
                <Linkedin className="h-5 w-5 text-blue-500" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onSocialLogin("Facebook", userType)}
                className="flex items-center justify-center"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
              </Button>
            </div>
          </>
        )}

        <DialogFooter className="sm:justify-center mt-2">
          <p className="text-sm text-center text-gray-500">
            {type === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <a href="#" className="text-blue-600 hover:underline">
              {type === "login" ? "Sign up" : "Log in"}
            </a>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Helper component for User icon
const User = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
};

export default Navbar;
