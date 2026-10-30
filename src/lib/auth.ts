"use client";

import { useSyncExternalStore } from "react";

/**
 * Sample session kept in localStorage — there is no backend yet. A visitor with no stored value
 * counts as signed in so the demo storefront keeps showing the sample member until they sign out.
 */
const STORAGE_KEY = "pk-topup-session";
const CHANGE_EVENT = "pk-topup-session-change";

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
    return window.sessionStorage.getItem(STORAGE_KEY) === "in" || window.localStorage.getItem(STORAGE_KEY) !== "out";
  } catch {
    return true;
  }
}

export function useSignedIn() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}

function setSession(signedIn: boolean, remember = true) {
  try {
    window.localStorage.setItem(STORAGE_KEY, signedIn && remember ? "in" : "out");
    if (signedIn && !remember) window.sessionStorage.setItem(STORAGE_KEY, "in");
    else window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Private mode: the session only lasts until the next reload.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export const signIn = (remember = true) => setSession(true, remember);
export const signOut = () => setSession(false);

/** Only same-site paths are valid redirect targets after signing in. */
export function safeNext(next: string | undefined, fallback = "/profile") {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/login") ? next : fallback;
}
