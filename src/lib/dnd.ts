import type { Location, TripItem } from "./types";

/**
 * What a dragged item card can be dropped onto. Each view offers a subset:
 * date headings (list), day cells (calendar), location columns and chips
 * (board, list), and other item cards (list, items).
 */
export type DropTarget =
  | { type: "date"; date: string }
  | { type: "location"; location: Location }
  | { type: "item"; item: TripItem };

/** Payload carried by every draggable item card. */
export type ItemDragPayload = { type: "item"; item: TripItem };

/** What a drop resolves to — patch values for the store's `moveItem`. */
export type ItemMove = { locationId?: string; date?: string };

/**
 * Keep the item's date when the target location's stay covers it; otherwise
 * land on the location's first day. ISO date strings compare correctly
 * lexicographically.
 */
export function locationDateFor(itemDate: string, location: Location): string {
  const end = location.endDate ?? location.date;
  return itemDate >= location.date && itemDate <= end ? itemDate : location.date;
}

/**
 * Resolve a drop into `moveItem` patch values, or null when the drop is a
 * no-op (dropped on itself, its own day, or its own location).
 */
export function resolveItemDrop(active: TripItem, target: DropTarget): ItemMove | null {
  switch (target.type) {
    case "date":
      return target.date === active.date ? null : { date: target.date };
    case "location": {
      if (target.location.id === active.locationId) return null;
      return {
        locationId: target.location.id,
        date: locationDateFor(active.date, target.location),
      };
    }
    case "item":
      if (target.item.id === active.id) return null;
      return target.item.date === active.date ? null : { date: target.item.date };
    default:
      return null;
  }
}
