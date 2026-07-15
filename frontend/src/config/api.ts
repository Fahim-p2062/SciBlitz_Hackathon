// Central API Configuration & Network Helper
// Tracks and connects local backend server (`http://localhost:5000`) or production API (`VITE_API_URL`)

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API Request Failed (${response.status}): ${url}`);
  }
  return response.json() as Promise<T>;
}
