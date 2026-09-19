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
