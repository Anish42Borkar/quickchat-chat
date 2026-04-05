import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.API_URL,
  withCredentials: true, // 🔥 required for cookies
});

// ✅ Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can log or modify request here
    console.log('Request:', config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔁 Handle unauthorized (token expired / not logged in)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔄 Call refresh endpoint (cookie-based)
        await api.get('/auth/refresh');

        // Retry original request
        return api(originalRequest);
      } catch (err) {
        console.log('Refresh failed → redirect to login');

        // 🚪 Redirect to login
        window.location.href = '/login';

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
