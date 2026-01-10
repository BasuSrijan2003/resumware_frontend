import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Download,
  TrendingUp,
  Target,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Award,
  BarChart3,
  FileText,
  Lightbulb,
} from "lucide-react";

const ResumeAnalysis = () => {
  const [analysisData] = useState({
    overallScore: 82,
    atsScore: 78,
    keywordMatch: 68,
    sections: {
      contact: 100,
      education: 90,
      experience: 85,
      skills: 75,
      projects: 80,
      formatting: 70,
    },
    keywords: {
      matched: [
        "React",
        "JavaScript",
        "Node.js",
        "MongoDB",
        "AWS",
        "SQL",
        "Python",
      ],
      missing: ["Docker", "Kubernetes", "CI/CD", "GraphQL"],
    },
    suggestions: [
      {
        section: "Overall",
        suggestions: [
          "Consider using more active verbs in your experience descriptions",
          "Include metrics and achievements to quantify your impact",
        ],
      },
      {
        section: "Experience",
        suggestions: [
          "Add more details about your specific role in team projects",
          "Elaborate on technologies used in each role",
        ],
      },
      {
        section: "Education",
        suggestions: [
          "Include relevant coursework for your target positions",
          "Add any notable academic achievements",
        ],
      },
      {
        section: "Skills",
        suggestions: [
          "Group skills by category (e.g., Programming Languages, Tools, Frameworks)",
          "Consider adding proficiency levels",
        ],
      },
    ],
    jobFit: [
      { position: "Software Engineer", match: 87 },
      { position: "Frontend Developer", match: 92 },
      { position: "Full Stack Developer", match: 85 },
      { position: "DevOps Engineer", match: 62 },
    ],
  });

  const [activeTab, setActiveTab] = useState("overview");

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-600";
    if (score >= 60) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-pink-600";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-3">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  AI Analysis Complete
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Resume Analysis
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Comprehensive breakdown of your resume's performance
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Overall Score */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Overall Score
                </h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-5xl font-bold ${getScoreColor(
                    analysisData.overallScore
                  )}`}
                >
                  {analysisData.overallScore}
                </span>
                <span className="text-2xl font-semibold text-gray-400">
                  /100
                </span>
              </div>
              <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreBgColor(
                    analysisData.overallScore
                  )} transition-all duration-500`}
                  style={{ width: `${analysisData.overallScore}%` }}
                />
              </div>
            </div>

            {/* ATS Score */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  ATS Compatibility
                </h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-5xl font-bold ${getScoreColor(
                    analysisData.atsScore
                  )}`}
                >
                  {analysisData.atsScore}
                </span>
                <span className="text-2xl font-semibold text-gray-400">
                  /100
                </span>
              </div>
              <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreBgColor(
                    analysisData.atsScore
                  )} transition-all duration-500`}
                  style={{ width: `${analysisData.atsScore}%` }}
                />
              </div>
            </div>

            {/* Keyword Match */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Keyword Match
                </h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-5xl font-bold ${getScoreColor(
                    analysisData.keywordMatch
                  )}`}
                >
                  {analysisData.keywordMatch}
                </span>
                <span className="text-2xl font-semibold text-gray-400">%</span>
              </div>
              <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreBgColor(
                    analysisData.keywordMatch
                  )} transition-all duration-500`}
                  style={{ width: `${analysisData.keywordMatch}%` }}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Analysis */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                  {["overview", "keywords", "suggestions", "jobFit"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                          activeTab === tab
                            ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() +
                          tab.slice(1).replace(/([A-Z])/g, " $1")}
                      </button>
                    )
                  )}
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Section Analysis
                      </h3>
                      {Object.entries(analysisData.sections).map(
                        ([section, score]) => (
                          <div key={section}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                {section}
                              </span>
                              <span
                                className={`text-sm font-bold ${getScoreColor(
                                  score
                                )}`}
                              >
                                {score}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${getScoreBgColor(
                                  score
                                )} transition-all duration-500`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Keywords Tab */}
                  {activeTab === "keywords" && (
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Matched Keywords
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.keywords.matched.map((keyword) => (
                            <span
                              key={keyword}
                              className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Recommended Keywords
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.keywords.missing.map((keyword) => (
                            <span
                              key={keyword}
                              className="px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm font-medium border border-yellow-300 dark:border-yellow-700"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Suggestions Tab */}
                  {activeTab === "suggestions" && (
                    <div className="space-y-6">
                      {analysisData.suggestions.map((item, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-indigo-500 pl-4"
                        >
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                            {item.section}
                          </h3>
                          <ul className="space-y-2">
                            {item.suggestions.map((suggestion, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {suggestion}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Job Fit Tab */}
                  {activeTab === "jobFit" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Job Fit Analysis
                      </h3>
                      {analysisData.jobFit.map((job) => (
                        <div key={job.position}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {job.position}
                            </span>
                            <span
                              className={`font-bold ${getScoreColor(
                                job.match
                              )}`}
                            >
                              {job.match}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${getScoreBgColor(
                                job.match
                              )} transition-all duration-500`}
                              style={{ width: `${job.match}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Summary & Actions */}
            <div className="space-y-6">
              {/* Strengths */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Strengths
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Strong technical skill set
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Clear work experience descriptions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Excellent educational background
                    </span>
                  </li>
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Areas for Improvement
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Add more quantifiable achievements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Include more industry-specific keywords
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Improve formatting consistency
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  Get Detailed Report
                </button>
                <button className="w-full px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Request Expert Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeAnalysis;
