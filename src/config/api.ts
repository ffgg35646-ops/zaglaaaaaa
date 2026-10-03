const isWeb =
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined";

const DEFAULT_API_BASE_URL =
  "https://dzwan-native-http-yxfq.vercel.app/api";

export const API_BASE_URL = isWeb
  ? DEFAULT_API_BASE_URL
  : process.env.EXPO_PUBLIC_API_URL ||
    DEFAULT_API_BASE_URL;
