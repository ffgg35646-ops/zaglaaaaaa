import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../config/api";

const DEBUG_API = true;

function debugApi(label: string, data?: unknown) {
  if (DEBUG_API) console.log(`[DZWAN API] ${label}`, data ?? "");
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

const isWeb =
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined";

async function readToken() {
  if (isWeb) {
    return window.localStorage.getItem("zajel_access_token");
  }

  return SecureStore.getItemAsync("zajel_access_token");
}

async function writeToken(token: string) {
  if (isWeb) {
    window.localStorage.setItem("zajel_access_token", token);
    return;
  }

  await SecureStore.setItemAsync("zajel_access_token", token);
}

async function removeToken() {
  if (isWeb) {
    window.localStorage.removeItem("zajel_access_token");
    return;
  }

  await SecureStore.deleteItemAsync("zajel_access_token");
}

api.interceptors.request.use(async (config) => {
  debugApi("REQUEST", { method: config.method?.toUpperCase(), url: `${API_BASE_URL}${config.url || ""}` });
  const token = await readToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (
    typeof FormData !== "undefined" &&
    config.data instanceof FormData
  ) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
}, (error) => {
  console.error("[DZWAN API] REQUEST ERROR", error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    debugApi("RESPONSE", { method: response.config.method?.toUpperCase(), url: response.config.url, status: response.status, data: response.data });
    return response;
  },
  (error) => {
    console.error("[DZWAN API] RESPONSE ERROR", {
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      code: error.code,
      message: error.message,
    });
    return Promise.reject(error);
  },
);

export async function saveToken(token: string) {
  await writeToken(token);
}

export async function getToken() {
  return readToken();
}

export async function clearToken() {
  await removeToken();
}
