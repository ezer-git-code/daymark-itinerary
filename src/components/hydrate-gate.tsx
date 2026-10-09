import { useEffect, useState, type ReactNode } from "react";
import { useAppStore } from "@/lib/store";

export function HydrateGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        const persistApi = useAppStore.persist;
        if (persistApi?.rehydrate) {
          await Promise.race([
            Promise.resolve(persistApi.rehydrate()),
            new Promise<void>((resolve) => setTimeout(resolve, 400)),
          ]);
        }
      } catch {
        // localStorage can be unavailable; continue with in-memory state
      }
      if (cancelled) return;
      const state = useAppStore.getState();
      if (!state.hasOnboarded && state.trips.length === 0) {
        state.loadSample();
      } else if (!state.activeTripId && state.trips[0]) {
        state.setActiveTrip(state.trips[0].id);
      }
      setReady(true);

      // Kick off any async bootstrap that does not need the DOM (rates are
      // fetched from the network; offline, this is best-effort and the stale
      // rate is fine for a travel ledger).
      void state.fetchRates();

      // Wire online/offline into the store so the rest of the app can react
      // from one source of truth. The platform service worker (if installed)
      // may already be active by now.
      if (typeof window === "undefined") return;
      const onLine = () => state.setIsOnline(true);
      const offLine = () => state.setIsOnline(false);
      window.addEventListener("online", onLine);
      window.addEventListener("offline", offLine);
      state.setIsOnline(navigator.onLine);
      return () => {
        window.removeEventListener("online", onLine);
        window.removeEventListener("offline", offLine);
      };
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-1 bg-background text-foreground">
        <p className="font-display text-3xl tracking-tight">Daymark</p>
        <p className="text-sm text-muted-foreground">Travel planning made clear</p>
      </div>
    );
  }

  return children;
}

/**
 * A thin wrapper around `useAppStore` so we can re-export the same hooks but
 * keep offline flag wiring in one place.
 */
export { useAppStore, useActiveTrip, useTripItems, useTripLocations } from "@/lib/store";

/**
 * Online/offline status, kept in the same zustand slice the shell already
 * subscribes to, so offline banner + any future offline-aware UI read one
 * source of truth.
 */
export function getOnlineState() {
  return useAppStore.getState().isOnline;
}
