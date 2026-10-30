"use client";

import { useSyncExternalStore } from "react";

export const DEFAULT_PROFILE_AVATAR = "/images/profile-avatar.png";
const STORAGE_KEY = "pk-topup-profile-avatar";
const CHANGE_EVENT = "pk-topup-profile-avatar-change";

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
    return window.localStorage.getItem(STORAGE_KEY) || DEFAULT_PROFILE_AVATAR;
  } catch {
    return DEFAULT_PROFILE_AVATAR;
  }
}

export function useProfileAvatar() {
  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_PROFILE_AVATAR);
}

export function saveProfileAvatar(src: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, src);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}
