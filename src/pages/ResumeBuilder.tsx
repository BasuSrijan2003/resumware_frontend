import React, { useState } from "react";
import { documentService, DocumentResponse } from "../services/documentService";
import ResumeResults from "../components/ResumeResults";
import Navbar from "@/components/Navbar";
import { Upload, FileText, Check, Sparkles, Zap, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const templates = {
  academic: [
    {
      id: "iit",
      name: "IIT Standard",
      description: "Clean academic format for technical institutes",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "iim",
      name: "IIM Standard",
      description: "Professional format for business schools",
      color: "from-purple-500 to-pink-600",
    },
  ],
  professional: [
    {
      id: "software",
      name: "Software Engineer",
      description: "Tech-focused layout with project highlights",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "nontech",
      name: "Non-Technical",
      description: "Versatile format for various industries",
      color: "from-orange-500 to-red-600",
    },
    {
      id: "marketing",
      name: "Marketing Recruit",
      description: "Creative layout for marketing roles",
      color: "from-cyan-500 to-blue-600",
    },
  ],
};

const ResumeBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"upload" | "manual">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("software");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DocumentResponse | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "docx", "txt"].includes(fileExt || "")) {
      setError("Only PDF, DOCX, and TXT files are supported");
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      const response = await documentService.uploadResume(
        selectedFile,
        selectedTemplate
      );
      setResult(response);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || "Failed to process resume");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  const getTemplateName = (templateId: string): string => {
    return (
      Object.values(templates)
        .flat()
        .find((t) => t.id === templateId)?.name || templateId
    );
  };

  if (result) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 pb-16">
          <ResumeResults
            documentId={result.document_id || ""}
            templateName={getTemplateName(
              result.template_used || selectedTemplate
            )}
          />
          <div className="max-w-4xl mx-auto px-4 mt-8">
            <button
              onClick={resetForm}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Create Another Resume
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                AI-Powered Resume Generation
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Build Your Perfect Resume
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your resume into a professionally formatted document in
              seconds
            </p>
          </div>

          {/* Mode Selector - Slider */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode("upload")}
                  className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    mode === "upload"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Resume</span>
                </button>
                <button
                  onClick={() => setMode("manual")}
                  className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    mode === "manual"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Edit3 className="w-5 h-5" />
                  <span>Create Manually</span>
                </button>
              </div>
            </div>
          </div>

          {/* Conditional Rendering Based on Mode */}
          {mode === "upload" ? (
            <>
              {/* Template Selection */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Choose Your Template
                </h2>

                {/* Academic Templates */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 px-2">
                    Academic Templates
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.academic.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedTemplate === template.id
                            ? "border-indigo-500 shadow-lg shadow-indigo-500/20 bg-white dark:bg-gray-800"
                            : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 bg-white dark:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${template.color} flex-shrink-0`}
                          >
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {template.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {template.description}
                            </p>
                          </div>
                          {selectedTemplate === template.id && (
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Templates */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 px-2">
                    Professional Templates
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templates.professional.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedTemplate === template.id
                            ? "border-indigo-500 shadow-lg shadow-indigo-500/20 bg-white dark:bg-gray-800"
                            : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 bg-white dark:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between">
                            <div
                              className={`p-3 rounded-xl bg-gradient-to-br ${template.color}`}
                            >
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            {selectedTemplate === template.id && (
                              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {template.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {template.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Upload Your Resume
                  </h2>

                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                        : selectedFile
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="file-input"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.txt"
                    />

                    {selectedFile ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            File uploaded successfully!
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Change file
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="file-input" className="cursor-pointer">
                        <div className="space-y-4">
                          <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              Drag and drop your resume here
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              or click to browse
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Supported formats: PDF, DOCX, TXT • Max size: 5MB
                          </p>
                        </div>
                      </label>
                    )}
                  </div>

                  {error && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                      <p className="text-sm text-red-600 dark:text-red-400 text-center">
                        {error}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={!selectedFile || uploading}
                    className={`w-full mt-8 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      !selectedFile || uploading
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1"
                    }`}
                  >
                    {uploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Your Resume...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Generate Professional Resume
                      </>
                    )}
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                      <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Lightning Fast
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Generate your resume in seconds
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Multiple Formats
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Download as PDF or LaTeX
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                      <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      AI-Optimized
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ATS-friendly formatting
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Create Manually Mode */
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl p-12 border-2 border-purple-200 dark:border-purple-700 text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-purple-500/30">
                  <Edit3 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Build From Scratch
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Create your professional resume step by step with our
                  intuitive guided builder. Perfect for crafting a personalized
                  resume tailored to your needs.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Step-by-Step
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Guided process for easy resume creation
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-3">
                      <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      AI Assistance
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Smart suggestions as you build
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-3">
                      <Check className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Full Control
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Customize every detail perfectly
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/build-from-scratch")}
                  className="px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-3"
                >
                  <Edit3 className="w-6 h-6" />
                  Start Building Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;
