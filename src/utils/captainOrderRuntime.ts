import { AppState, type AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getCaptainOrderBoard } from "../api/captainOrderBoard";

export const AVAILABLE_ORDERS_CACHE_KEY =
  "@zajel/available-orders-cache-v1";

export const CAPTAIN_ORDER_BOARD_CACHE_KEY =
  "@zajel/captain-order-board-cache-v1";

const REFRESH_INTERVAL_MS = 4000;

let timer: ReturnType<typeof setInterval> | null = null;
let appStateSubscription: { remove: () => void } | null = null;
let refreshInFlight = false;

async function refreshCaptainOrderRuntime() {
  if (refreshInFlight) {
    return;
  }

  refreshInFlight = true;

  try {
    const board = await getCaptainOrderBoard();

    const availableOrders =
      board?.availableOrders ??
      board?.data?.availableOrders ??
      [];

    const activeOrders =
      board?.activeOrders ??
      board?.data?.activeOrders ??
      [];

    await Promise.all([
      AsyncStorage.setItem(
        AVAILABLE_ORDERS_CACHE_KEY,
        JSON.stringify(
          Array.isArray(availableOrders)
            ? availableOrders
            : [],
        ),
      ),
      AsyncStorage.setItem(
        CAPTAIN_ORDER_BOARD_CACHE_KEY,
        JSON.stringify({
          ...(board || {}),
          availableOrders: Array.isArray(availableOrders)
            ? availableOrders
            : [],
          activeOrders: Array.isArray(activeOrders)
            ? activeOrders
            : [],
          updatedAt: new Date().toISOString(),
        }),
      ),
    ]);
  } catch {
    // التحديث الصامت لا يجب أن يكسر التطبيق أو تسجيل الدخول.
  } finally {
    refreshInFlight = false;
  }
}

function handleAppStateChange(
  nextState: AppStateStatus,
) {
  if (nextState === "active") {
    void refreshCaptainOrderRuntime();
  }
}

export function startCaptainOrderRuntime() {
  if (timer) {
    return;
  }

  void refreshCaptainOrderRuntime();

  timer = setInterval(() => {
    void refreshCaptainOrderRuntime();
  }, REFRESH_INTERVAL_MS);

  appStateSubscription =
    AppState.addEventListener(
      "change",
      handleAppStateChange,
    );
}

export function stopCaptainOrderRuntime() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  appStateSubscription?.remove();
  appStateSubscription = null;
  refreshInFlight = false;
}
