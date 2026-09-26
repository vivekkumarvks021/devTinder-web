import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("Unauthorized / session expired");
    }

    if (status === 403) {
      console.log("Forbidden");
    }

    if (status >= 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  },
);

export default api;
