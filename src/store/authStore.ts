import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import type { AccountType, AuthUser } from "../types/auth";

const AUTH_USER_STORAGE_KEY = "@zajel/auth-user-v1";

type AuthState = {
  accountType: AccountType | null;
  user: AuthUser | null;
  authenticated: boolean;

  setAccountType: (type: AccountType) => void;
  setUser: (user: AuthUser) => void;
  restoreStoredUser: () => Promise<AuthUser | null>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accountType: null,
  user: null,
  authenticated: false,

  setAccountType: (type) =>
    set({
      accountType: type,
    }),

  setUser: (user) => {
    set({
      user,
      authenticated: true,
      accountType: user.role,
    });

    // The access token remains in SecureStore; this only caches the profile.
    void AsyncStorage.setItem(
      AUTH_USER_STORAGE_KEY,
      JSON.stringify(user),
    ).catch((error) => {
      console.warn("ZAJEL AUTH PROFILE CACHE ERROR:", error?.message || error);
    });
  },

  restoreStoredUser: async () => {
    try {
      const saved = await AsyncStorage.getItem(AUTH_USER_STORAGE_KEY);
      if (!saved) return null;

      const parsed = JSON.parse(saved) as AuthUser;
      if (
        !parsed ||
        typeof parsed.id !== "string" ||
        !parsed.id ||
        !parsed.role
      ) {
        await AsyncStorage.removeItem(AUTH_USER_STORAGE_KEY).catch(() => {});
        return null;
      }

      set({
        user: parsed,
        authenticated: true,
        accountType: parsed.role,
      });
      return parsed;
    } catch (error: any) {
      console.warn("ZAJEL AUTH RESTORE ERROR:", error?.message || error);
      return null;
    }
  },

  logout: () => {
    set({
      accountType: null,
      user: null,
      authenticated: false,
    });
    void AsyncStorage.removeItem(AUTH_USER_STORAGE_KEY).catch(() => {});
  },
}));
