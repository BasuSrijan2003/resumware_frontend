import React, { useState } from "react";
import { documentService } from "../services/documentService";
import { Download, FileText, Eye, CheckCircle, Sparkles } from "lucide-react";

interface ResumeResultsProps {
  documentId: string;
  templateName: string;
}

const ResumeResults: React.FC<ResumeResultsProps> = ({
  documentId,
  templateName,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewingPdf, setViewingPdf] = useState(false);

  if (!documentId) {
    return null;
  }

  const handleViewPdf = async () => {
    try {
      setLoading(true);
      setViewingPdf(true);
      setError(null);

      const pdfBlob = await documentService.viewPdf(documentId);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 100);
    } catch (err) {
      console.error("Error viewing PDF:", err);
      setError("Failed to load PDF. Please try again.");
    } finally {
      setLoading(false);
      setViewingPdf(false);
    }
  };

  const handleDownloadPdf = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = documentService.getPdfDownloadUrl(documentId);
    downloadLink.download = `resume_${documentId}.pdf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDownloadLatex = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = documentService.getLatexDownloadUrl(documentId);
    downloadLink.download = `resume_${documentId}.tex`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4 shadow-lg shadow-green-500/30">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Your Resume is Ready!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Successfully generated using the{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {templateName}
          </span>{" "}
          template
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* View PDF Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Preview Resume
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View your resume in a new tab before downloading
              </p>
            </div>
          </div>
          <button
            onClick={handleViewPdf}
            disabled={loading && viewingPdf}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && viewingPdf ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Eye className="w-5 h-5" />
                View PDF
              </>
            )}
          </button>
        </div>

        {/* Download PDF Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Download PDF
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get your professionally formatted resume
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadPdf}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>
      </div>

      {/* LaTeX Download Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
            <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                LaTeX Source Code
              </h3>
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Download the LaTeX source code to customize your resume further
              with advanced formatting options
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full" />
            <span className="text-gray-700 dark:text-gray-300">
              Fully customizable
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full" />
            <span className="text-gray-700 dark:text-gray-300">
              Professional format
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full" />
            <span className="text-gray-700 dark:text-gray-300">
              Version control ready
            </span>
          </div>
        </div>

        <button
          onClick={handleDownloadLatex}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download LaTeX Source
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-sm text-red-600 dark:text-red-400 text-center">
            {error}
          </p>
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Next Steps
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 mt-0.5">
                  •
                </span>
                <span>Review your resume carefully for accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 mt-0.5">
                  •
                </span>
                <span>Customize the LaTeX source for additional sections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 mt-0.5">
                  •
                </span>
                <span>Tailor your resume for specific job applications</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeResults;
