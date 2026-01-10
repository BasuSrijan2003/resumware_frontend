import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ✅ Create axios instance with automatic auth token injection
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Automatically add Authorization header to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface DocumentResponse {
  status: string;
  message: string;
  document_id?: string;
  template_used?: string;
  latex?: string;
}

export const documentService = {
  async uploadResume(file: File, template: string): Promise<DocumentResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('template', template);

    const response = await apiClient.post(
      '/api/resume/generate',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );

    return response.data;
  },

  // Get LaTeX download URL
  getLatexDownloadUrl(documentId: string): string {
    const token = localStorage.getItem('token');
    return `${API_BASE_URL}/api/resume/download/latex?doc_id=${documentId}&token=${token}`;
  },

  // Get PDF download URL
  getPdfDownloadUrl(documentId: string): string {
    const token = localStorage.getItem('token');
    return `${API_BASE_URL}/api/resume/download/pdf?doc_id=${documentId}&token=${token}`;
  },

  // View PDF as blob
  async viewPdf(documentId: string): Promise<Blob> {
    const response = await apiClient.get(
      `/api/resume/download/pdf?doc_id=${documentId}`,
      {
        responseType: 'blob'
      }
    );

    return response.data;
  },

  // Get available templates
  async getTemplates() {
    const response = await apiClient.get('/api/resume/templates');
    return response.data.templates;
  }
};
