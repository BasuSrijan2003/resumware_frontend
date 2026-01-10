// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Analysis from "./pages/Analysis";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import ResumeBuilder from "./pages/ResumeBuilder";
import BuildFromScratch from "./pages/BuildFromScratch";
import InterviewMode from "./pages/interviewmode";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/build-from-scratch" element={<BuildFromScratch />} />
            <Route path="/interview" element={<InterviewMode />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
