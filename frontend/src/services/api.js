import axios from 'axios';

const API_BASE_URL = 'https://dreamwell-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password) => api.post('/auth/signup', { name, email, password }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
  verifyEmail: (token) => api.get(`/auth/verify-email?token=${token}`),
};

// Dream APIs
export const dreamAPI = {
  createDream: (dreamData) => api.post('/dreams', dreamData),
  getAllDreams: () => api.get('/dreams'),
  getDreamById: (id) => api.get(`/dreams/${id}`),
  updateDream: (id, dreamData) => api.put(`/dreams/${id}`, dreamData),
  deleteDream: (id) => api.delete(`/dreams/${id}`),
  searchDreams: (keyword) => api.get(`/dreams/search?keyword=${keyword}`),
  reinterpretDream: (id) => api.post(`/dreams/${id}/reinterpret`),
};

// Mood APIs
export const moodAPI = {
  createMoodEntry: (moodData) => api.post('/moods', moodData),
  getAllMoodEntries: () => api.get('/moods'),
  getMoodEntriesByRange: (startDate, endDate) => 
    api.get(`/moods/range?startDate=${startDate}&endDate=${endDate}`),
  updateMoodEntry: (id, moodData) => api.put(`/moods/${id}`, moodData),
  deleteMoodEntry: (id) => api.delete(`/moods/${id}`),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (updates) => api.put('/user/profile', updates),
  updatePassword: (currentPassword, newPassword) => 
    api.put('/user/password', { currentPassword, newPassword }),
  deleteAccount: () => api.delete('/user/account'),
};

// Analytics APIs
export const analyticsAPI = {
  getAnalytics: () => api.get('/analytics'),
  exportData: () => api.get('/analytics/export', { responseType: 'blob' }),
};

// Support APIs
export const supportAPI = {
  createTicket: (ticketData) => api.post('/support/tickets', ticketData),
  getUserTickets: () => api.get('/support/tickets'),
  getTicketById: (id) => api.get(`/support/tickets/${id}`),
};

// Admin APIs
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  toggleUserStatus: (id) => api.put(`/admin/users/${id}/toggle-status`),
  getUserData: (id) => api.get(`/admin/users/${id}/data`),
  getFlaggedDreams: () => api.get('/admin/dreams/flagged'),
  getSystemAnalytics: () => api.get('/admin/analytics'),
  getAllTickets: () => api.get('/admin/support/tickets'),
  getTicketsByStatus: (status) => api.get(`/admin/support/tickets/status/${status}`),
  replyToTicket: (id, reply) => api.post(`/admin/support/tickets/${id}/reply`, { reply }),
  updateTicketStatus: (id, status) => api.put(`/admin/support/tickets/${id}/status`, { status }),
  getSystemSetting: (key) => api.get(`/admin/settings/${key}`),
  updateSystemSetting: (key, value) => api.put(`/admin/settings/${key}`, { value }),
};

export default api;
