export type ItemKind = "experience" | "food" | "buy";

export type Trip = {
  id: string;
  name: string;
  country: string;
  currency: string;
  startDate: string;
  endDate: string;
  budgetHome: number;
  /** Local units per 1 home-currency unit. Null = use live/fallback rates. */
  customRate: number | null;
};

export type Location = {
  id: string;
  tripId: string;
  name: string;
  date: string;
  sortOrder: number;
};

export type TripItem = {
  id: string;
  tripId: string;
  locationId: string;
  kind: ItemKind;
  title: string;
  date: string;
  estimatedLocal: number | null;
  actualLocal: number | null;
};

export const ITEM_KINDS: { id: ItemKind; label: string; section: string }[] = [
  { id: "experience", label: "Experience", section: "Experiences to try" },
  { id: "food", label: "Food", section: "Food to try" },
  { id: "buy", label: "To buy", section: "Items to buy" },
];
