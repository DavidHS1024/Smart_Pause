const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'API Error');
  }
  return response.json();
};

export const apiGet = (path) => fetch(`${BASE_URL}${path}`).then(handleResponse);
export const apiPost = (path, data) => fetch(`${BASE_URL}${path}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(handleResponse);

export const StudentsAPI = {
  getAll: () => apiGet('/students/'),
  getById: (id) => apiGet(`/students/${id}`),
  getGaps: (id) => apiGet(`/students/${id}/gaps`),
  registerEvent: (id, event) => apiPost(`/students/${id}/event`, event)
};

export const OntologyAPI = {
  getGraph: () => apiGet('/ontology/graph'),
  getEntity: (id) => apiGet(`/ontology/entity/${id}`),
  traverse: (id, depth = 3) => apiGet(`/ontology/traverse/${id}?depth=${depth}`)
};

export const RecommendationsAPI = {
  getForStudent: (id) => apiGet(`/recommendations/student/${id}`),
  generate: (id) => apiPost(`/recommendations/generate/${id}`),
  triggerSmartPause: (data) => apiPost('/recommendations/smart-pause', data)
};
