import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';

// Create an axios instance configured with your backend's Basic Authentication
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: import.meta.env.VITE_AUTH_USERNAME,
    password: import.meta.env.VITE_AUTH_PASSWORD
  }
});

// Helper objects containing modular methods for CRUD operations
export const patientService = {
  save: (patient) => api.post('/patients/save', patient),
  getAll: () => api.get('/patients/getall'),
  getById: (id) => api.get(`/patients/get/${id}`),
  update: (id, patient) => api.put(`/patients/update/${id}`, patient),
  delete: (id) => api.delete(`/patients/delete/${id}`)
};

export const doctorService = {
  save: (doctor) => api.post('/doctors/save', doctor),
  getAll: () => api.get('/doctors/getall'),
  update: (id, doctor) => api.put(`/doctors/update/${id}`, doctor),
  delete: (id) => api.delete(`/doctors/delete/${id}`)
};

export const appointmentService = {
  save: (appointment) => api.post('/appointments/save', appointment),
  getAll: () => api.get('/appointments/getall'),
  update: (id, appointment) => api.put(`/appointments/update/${id}`, appointment),
  delete: (id) => api.delete(`/appointments/delete/${id}`)
};

export default api;