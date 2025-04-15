import React from "react";
import PdfViewer from "./PdfViewer";
import { documentService } from "../services/documentService";

interface ResumeResultsProps {
  documentId: string;
  templateName: string;
}

const ResumeResults: React.FC<ResumeResultsProps> = ({
  documentId,
  templateName,
}) => {
  if (!documentId) {
    return null;
  }

  return (
    <div className="resume-results">
      <div className="results-header">
        <h2>Your Resume is Ready!</h2>
        <p>
          Your resume has been successfully processed using the {templateName}{" "}
          template.
        </p>
      </div>

      <div className="actions-container">
        <PdfViewer documentId={documentId} />

        <div className="additional-actions">
          <a
            href={documentService.getLatexDownloadUrl(documentId)}
            className="latex-download-link"
          >
            Download LaTeX Source
          </a>
        </div>
      </div>

      <div className="results-footer">
        <p>You can view, download, or edit your resume as needed.</p>
      </div>
    </div>
  );
};

export default ResumeResults;
