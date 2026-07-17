import axios from 'axios';

// Fallback to localhost automatically if the environment variable points to a dead end or cloud instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Forces local Spring Boot server port 8080 directly
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