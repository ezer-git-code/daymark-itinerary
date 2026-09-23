export type JournalEntryData = {
  notes: string;
  images: string[];
};

export function normalizeJournalData(
  notes?: string | null,
  images?: string[] | null,
): JournalEntryData {
  const nextNotes = (notes ?? "").trim();
  const nextImages = (images ?? []).filter(
    (image): image is string => typeof image === "string" && image.trim() !== "",
  );

  return {
    notes: nextNotes,
    images: nextImages,
  };
}

// Backwards-compat helpers for the legacy journal store.
export function getJournalEntries(): unknown[] {
  const raw = localStorage.getItem("daymark_journal");
  return raw ? JSON.parse(raw) : [];
}

export function saveJournalEntry(entry: unknown) {
  const entries = getJournalEntries();
  entries.push(entry);
  localStorage.setItem("daymark_journal", JSON.stringify(entries));
}

export function getEntriesByItem(itemId: string) {
  return getJournalEntries().filter((e) => (e as { itinerary_item_id?: string }).itinerary_item_id === itemId);
}

export function getEntriesGrouped() {
  const entries = getJournalEntries();

  const byDay: Record<string, unknown[]> = {};
  const byLocation: Record<string, unknown[]> = {};

  for (const e of entries) {
    const entry = e as { day?: string; location?: string };
    if (!byDay[entry.day ?? ""]) byDay[entry.day ?? ""] = [];
    byDay[entry.day ?? ""].push(e);

    if (!byLocation[entry.location ?? ""]) byLocation[entry.location ?? ""] = [];
    byLocation[entry.location ?? ""].push(e);
  }

  return { byDay, byLocation };
}

// Journal helper
import type { Location, TripItem } from "./types";

export function journalToMarkdown(
  items: TripItem[],
  locations: Location[],
): string {
  return items
    .filter((item) => item.notes.trim() || item.images.length > 0)
    .map((item) => {
      const location = locations.find((entry) => entry.id === item.locationId);
      const lines = [
        `## ${item.title}`,
        "",
        `**Date:** ${item.date}`,
        location ? `**Location:** ${location.name}` : "",
        "",
        item.notes,
        "",
        ...item.images.map((image) => `![${item.title}](${image})`),
      ];

      return lines.filter(Boolean).join("\n");
    })
    .join("\n\n");
}