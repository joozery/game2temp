"use client";

import { useSyncExternalStore } from "react";
import { user } from "@/lib/account";

export type AccountProfile = { name: string; email: string; phone: string };
export const defaultAccountProfile: AccountProfile = { name: user.name, email: user.email, phone: user.phone };
const STORAGE_KEY = "pk-topup-account-profile";
const CHANGE_EVENT = "pk-topup-account-profile-change";
const DEFAULT_SNAPSHOT = JSON.stringify(defaultAccountProfile);

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

export function useAccountProfile(): AccountProfile {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_SNAPSHOT);
  try {
    const value: unknown = JSON.parse(snapshot);
    if (typeof value === "object" && value !== null && "name" in value && "email" in value && "phone" in value &&
      typeof value.name === "string" && typeof value.email === "string" && typeof value.phone === "string") {
      return { name: value.name, email: value.email, phone: value.phone };
    }
  } catch {
    // Ignore malformed data from an older browser session.
  }
  return defaultAccountProfile;
}

export function saveAccountProfile(profile: AccountProfile) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}
