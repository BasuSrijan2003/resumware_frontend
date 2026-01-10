// This component is now integrated directly into ResumeResults.tsx
// The previous standalone PdfViewer is no longer needed as the functionality
// has been incorporated into the redesigned ResumeResults component

// However, if you still want to use it as a separate component, here's a modern version:

import React, { useState } from "react";
import { documentService } from "../services/documentService";
import { Eye, Download, Loader2 } from "lucide-react";

interface PdfViewerProps {
  documentId: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ documentId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleViewPdf = async () => {
    try {
      setLoading(true);
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

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={handleViewPdf}
        disabled={loading}
        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <Eye className="w-5 h-5" />
            View PDF
          </>
        )}
      </button>

      <button
        onClick={handleDownloadPdf}
        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Download PDF
      </button>

      {error && (
        <div className="col-span-full p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-sm text-red-600 dark:text-red-400 text-center">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
