import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchRatesFromHome, localToHome, unitsPer, USD_FALLBACK } from "@/lib/money";
import { sampleTrip } from "@/lib/sample";
import type { ItemKind, Location, Trip, TripItem } from "@/lib/types";

export type AppState = {
  hasOnboarded: boolean;
  homeCurrency: string;
  ratesBase: string;
  rates: Record<string, number>;
  ratesFetchedAt: string | null;
  trips: Trip[];
  locations: Location[];
  items: TripItem[];
  activeTripId: string | null;

  setHomeCurrency: (code: string) => void;
  fetchRates: () => Promise<void>;
  setActiveTrip: (id: string | null) => void;
  loadSample: () => void;

  addTrip: (trip: Omit<Trip, "id">) => string;
  updateTrip: (id: string, patch: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;

  addLocation: (loc: Omit<Location, "id" | "sortOrder">) => string;
  updateLocation: (id: string, patch: Partial<Location>) => void;
  deleteLocation: (id: string) => void;

  addItem: (item: Omit<TripItem, "id">) => string;
  updateItem: (id: string, patch: Partial<TripItem>) => void;
  deleteItem: (id: string) => void;
  moveItem: (id: string, locationId: string, date?: string) => void;
};

function nid() {
  return crypto.randomUUID();
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasOnboarded: false,
      homeCurrency: "USD",
      ratesBase: "USD",
      rates: { ...USD_FALLBACK },
      ratesFetchedAt: null,
      trips: [],
      locations: [],
      items: [],
      activeTripId: null,

      setHomeCurrency: (code) => {
        set({ homeCurrency: code });
        void get().fetchRates();
      },

      fetchRates: async () => {
        const home = get().homeCurrency;
        const result = await fetchRatesFromHome(home);
        if (!result) return;
        set({
          ratesBase: result.base,
          rates: result.rates,
          ratesFetchedAt: new Date().toISOString(),
        });
      },

      setActiveTrip: (id) => set({ activeTripId: id }),

      loadSample: () => {
        const { trip, locations, items } = sampleTrip();
        set((s) => ({
          hasOnboarded: true,
          trips: [...s.trips.filter((t) => t.id !== trip.id), trip],
          locations: [
            ...s.locations.filter((l) => l.tripId !== trip.id),
            ...locations,
          ],
          items: [...s.items.filter((i) => i.tripId !== trip.id), ...items],
          activeTripId: trip.id,
        }));
      },

      addTrip: (trip) => {
        const id = nid();
        set((s) => ({
          hasOnboarded: true,
          trips: [...s.trips, { ...trip, id }],
          activeTripId: id,
        }));
        return id;
      },

      updateTrip: (id, patch) =>
        set((s) => ({
          trips: s.trips.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),

      deleteTrip: (id) =>
        set((s) => {
          const trips = s.trips.filter((t) => t.id !== id);
          return {
            trips,
            locations: s.locations.filter((l) => l.tripId !== id),
            items: s.items.filter((i) => i.tripId !== id),
            activeTripId:
              s.activeTripId === id ? (trips[0]?.id ?? null) : s.activeTripId,
          };
        }),

      addLocation: (loc) => {
        const id = nid();
        set((s) => {
          const max = s.locations
            .filter((l) => l.tripId === loc.tripId)
            .reduce((m, l) => Math.max(m, l.sortOrder), -1);
          return {
            locations: [
              ...s.locations,
              { ...loc, id, sortOrder: max + 1 },
            ],
          };
        });
        return id;
      },

      updateLocation: (id, patch) =>
        set((s) => ({
          locations: s.locations.map((l) =>
            l.id === id ? { ...l, ...patch } : l,
          ),
          items:
            patch.date != null
              ? s.items.map((i) =>
                  i.locationId === id && i.date === s.locations.find((l) => l.id === id)?.date
                    ? { ...i, date: patch.date as string }
                    : i,
                )
              : s.items,
        })),

      deleteLocation: (id) =>
        set((s) => ({
          locations: s.locations.filter((l) => l.id !== id),
          items: s.items.filter((i) => i.locationId !== id),
        })),

      addItem: (item) => {
        const id = nid();
        set((s) => ({ items: [...s.items, { ...item, id }] }));
        return id;
      },

      updateItem: (id, patch) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        })),

      deleteItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      moveItem: (id, locationId, date) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  locationId,
                  date:
                    date ??
                    s.locations.find((l) => l.id === locationId)?.date ??
                    i.date,
                }
              : i,
          ),
        })),
    }),
    {
      name: "daymark-v1",
      skipHydration: true,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      partialize: (s) => ({
        hasOnboarded: s.hasOnboarded,
        homeCurrency: s.homeCurrency,
        ratesBase: s.ratesBase,
        rates: s.rates,
        ratesFetchedAt: s.ratesFetchedAt,
        trips: s.trips,
        locations: s.locations,
        items: s.items,
        activeTripId: s.activeTripId,
      }),
    },
  ),
);

const EMPTY_LOCATIONS: Location[] = [];
const EMPTY_ITEMS: TripItem[] = [];

export function useActiveTrip(): Trip | null {
  const trips = useAppStore((s) => s.trips);
  const activeTripId = useAppStore((s) => s.activeTripId);
  if (!activeTripId) return trips[0] ?? null;
  return trips.find((t) => t.id === activeTripId) ?? trips[0] ?? null;
}

export function useTripLocations(tripId: string | undefined): Location[] {
  const locations = useAppStore((s) => s.locations);
  if (!tripId) return EMPTY_LOCATIONS;
  return locations
    .filter((l) => l.tripId === tripId)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date) || a.sortOrder - b.sortOrder);
}

export function useTripItems(tripId: string | undefined): TripItem[] {
  const items = useAppStore((s) => s.items);
  if (!tripId) return EMPTY_ITEMS;
  return items
    .filter((i) => i.tripId === tripId)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}

export function localPerHomeForTrip(
  trip: Trip | null,
  state: Pick<AppState, "homeCurrency" | "rates" | "ratesBase">,
): number | null {
  if (!trip) return null;
  if (trip.customRate != null && trip.customRate > 0) return trip.customRate;
  return unitsPer(trip.currency, state.homeCurrency, state.rates, state.ratesBase);
}

export function sumLocal(
  items: TripItem[],
  field: "estimatedLocal" | "actualLocal",
): number {
  return items.reduce((acc, i) => acc + (i[field] ?? 0), 0);
}

export function sumHome(
  items: TripItem[],
  field: "estimatedLocal" | "actualLocal",
  localPerHome: number | null,
): number {
  return items.reduce((acc, i) => {
    const v = i[field];
    if (v == null) return acc;
    return acc + (localToHome(v, localPerHome) ?? 0);
  }, 0);
}

export function itemsByKind(items: TripItem[], kind: ItemKind): TripItem[] {
  return items.filter((i) => i.kind === kind);
}
