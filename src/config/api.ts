const isWeb =
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined";

export const API_BASE_URL = isWeb
  ? "https://dzwan-native-http-yxfq.vercel.app/api"
  : process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/api";
