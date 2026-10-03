const isWeb =
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined";

const DEFAULT_API_BASE_URL =
  "https://dzwan-native-http-yxfq.vercel.app/api";

const configuredApiBaseUrl =
  typeof process.env.EXPO_PUBLIC_API_URL === "string"
    ? process.env.EXPO_PUBLIC_API_URL.trim().replace(/\/+$/, "")
    : "";

const isLegacyBackend =
  /^https:\/\/dzwan\.vercel\.app(?:\/api)?\/?$/i.test(
    configuredApiBaseUrl,
  );

export const API_BASE_URL =
  isWeb ||
  !configuredApiBaseUrl ||
  isLegacyBackend
    ? DEFAULT_API_BASE_URL
    : configuredApiBaseUrl;
