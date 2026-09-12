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
      void state.fetchRates();
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background text-foreground">
        <p className="font-display text-3xl tracking-tight">Daymark</p>
      </div>
    );
  }

  return children;
}
