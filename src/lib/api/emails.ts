const API_BASE = import.meta.env.VITE_API_BASE;
import { getAccessToken } from './auth';

export interface EmailAccountRequest {
  email: string;
  service_provider: 'gmail' | 'microsoft' | 'zoho';
  type: 'personal' | 'work';
}

export interface AddEmailsRequest {
  emails: EmailAccountRequest[];
}

export interface AddEmailsResponse {
  message?: string;
  emails?: EmailAccountRequest[];
}

export const addEmails = async (emails: EmailAccountRequest[]): Promise<AddEmailsResponse> => {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('Not authenticated. Please login again.');
  }

  if (!API_BASE) {
    throw new Error('API base URL is not configured');
  }

  const requestBody: AddEmailsRequest = {
    emails: emails.map(email => ({
      email: email.email,
      service_provider: email.service_provider,
      type: email.type
    }))
  };

  const response = await fetch(`${API_BASE}/emails/add`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to add emails' }));
    throw new Error(error.detail || error.message || 'Failed to add emails');
  }

  return response.json();
};
