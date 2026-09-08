// src/utils.js
import axios from 'axios';

export const BASE_URL = 'http://localhost:5000/';

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika access token kadaluarsa dan belum dicoba refresh
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.get(`${BASE_URL}/token`, {
          withCredentials: true,
        });

        const newAccessToken = res.data.accessToken;

        // Set token baru ke header
        API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return API(originalRequest); // ulangi request yang gagal
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
