import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function getToken() {
  return window.localStorage.getItem("token");
}

export function setToken(token: string) {
  window.localStorage.setItem("token", token);
}

export function clearToken() {
  window.localStorage.removeItem("token");
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function sendPostRequest<T>(subPath: string, { arg }: { arg: T }) {
  return axiosInstance.post(subPath, arg);
}

export async function sendDeleteRequest(subPath: string) {
  return axiosInstance.delete(subPath);
}

export async function sendGetRequest<T>(subPath: string, { arg }: { arg: T }) {
  return axiosInstance.get(`${subPath}${arg}`);
}

export async function sendPatchRequest<T>(
  subPath: string,
  { arg }: { arg: T }
) {
  return axiosInstance.patch(subPath, arg);
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
