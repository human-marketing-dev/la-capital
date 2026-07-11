/* Central measurement helper. Every dataLayer push goes through `pushEvent` so
   the persisted URL attribution (gclid / fbclid / utm_*) is attached to every
   event — even when the user lands on one landing and converts on another.
   Uses client-only APIs (sessionStorage, crypto.subtle, window); call it from
   client components / event handlers. `window.dataLayer` is typed in global.d.ts. */

import { useSyncExternalStore } from "react";

const STORAGE_PREFIX = "lc_track_";

export const PERSIST_KEYS = [
  "gclid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;
export type PersistKey = (typeof PERSIST_KEYS)[number];

// Subscribers to attribution changes, so `usePersistedAttribution` re-renders
// when TrackingInit captures params after the initial paint.
const listeners = new Set<() => void>();

/** Capture attribution params from the current URL into sessionStorage. A param
    present in the URL overwrites the stored one; a missing param keeps whatever
    was stored (so it survives internal navigation). */
export function captureParams(search: URLSearchParams): void {
  if (typeof window === "undefined") return;
  for (const key of PERSIST_KEYS) {
    const value = search.get(key);
    if (value) {
      try {
        window.sessionStorage.setItem(STORAGE_PREFIX + key, value);
      } catch {
        /* storage unavailable (private mode / quota) — non-fatal */
      }
    }
  }
  listeners.forEach((l) => l());
}

/** Read all persisted attribution params (only those present). */
export function getPersisted(): Partial<Record<PersistKey, string>> {
  const out: Partial<Record<PersistKey, string>> = {};
  if (typeof window === "undefined") return out;
  for (const key of PERSIST_KEYS) {
    let value: string | null = null;
    try {
      value = window.sessionStorage.getItem(STORAGE_PREFIX + key);
    } catch {
      /* ignore */
    }
    if (value) out[key] = value;
  }
  return out;
}

/* useSyncExternalStore wiring so forms can read persisted attribution into
   hidden fields without a hydration mismatch (server + first paint render empty,
   then React reconciles to the client value) and without setState-in-effect. */
const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
};
const getAttributionSnapshot = () => JSON.stringify(getPersisted());
const getAttributionServerSnapshot = () => "{}";

/** Persisted attribution params as a reactive value for form hidden fields. */
export function usePersistedAttribution(): Partial<Record<PersistKey, string>> {
  const snapshot = useSyncExternalStore(
    subscribe,
    getAttributionSnapshot,
    getAttributionServerSnapshot,
  );
  return JSON.parse(snapshot) as Partial<Record<PersistKey, string>>;
}

/** Push an event to the dataLayer with persisted attribution auto-injected. */
export function pushEvent(
  event: string,
  payload: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...getPersisted(), ...payload });
}

/** SHA-256 hex digest (client-side) for User-Provided Data hashing. */
export async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** trim + lowercase, per Google/Meta UPD normalization. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Digits only; a 10-digit local MX number is prefixed with +52 (E.164). */
export function normalizePhoneMX(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+52${digits}`;
  return `+${digits}`;
}
