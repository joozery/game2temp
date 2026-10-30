"use client";

import { useSyncExternalStore } from "react";

export type NotificationTopic = "orders" | "promos" | "wallet" | "security";
export type SettingsPreferences = {
  notifications: Record<NotificationTopic, boolean>;
  connections: { line: boolean; google: boolean };
};

export const defaultSettingsPreferences: SettingsPreferences = {
  notifications: {
    orders: true,
    promos: true,
    wallet: true,
    security: true,
  },
  connections: { line: true, google: false },
};

const STORAGE_KEY = "pk-topup-settings-preferences";
const CHANGE_EVENT = "pk-topup-settings-preferences-change";
const DEFAULT_SNAPSHOT = JSON.stringify(defaultSettingsPreferences);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || DEFAULT_SNAPSHOT;
  } catch {
    return DEFAULT_SNAPSHOT;
  }
}

export function useSettingsPreferences(): SettingsPreferences {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_SNAPSHOT);
  try {
    const value = JSON.parse(snapshot) as {
      notifications?: Record<NotificationTopic, boolean | { email?: boolean; line?: boolean }>;
      connections?: { line?: boolean; google?: boolean };
    };
    if (value.notifications) {
      const notifications = {} as Record<NotificationTopic, boolean>;
      for (const topic of Object.keys(defaultSettingsPreferences.notifications) as NotificationTopic[]) {
        const stored = value.notifications[topic];
        notifications[topic] = typeof stored === "boolean"
          ? stored
          : stored && typeof stored === "object"
            ? Boolean(stored.email || stored.line)
            : defaultSettingsPreferences.notifications[topic];
      }
      return {
        notifications,
        connections: {
          line: typeof value.connections?.line === "boolean" ? value.connections.line : defaultSettingsPreferences.connections.line,
          google: typeof value.connections?.google === "boolean" ? value.connections.google : defaultSettingsPreferences.connections.google,
        },
      };
    }
  } catch {
    // Ignore malformed data from an older browser session.
  }
  return defaultSettingsPreferences;
}

export function saveSettingsPreferences(preferences: SettingsPreferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}
