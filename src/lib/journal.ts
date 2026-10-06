import { format, parseISO } from "date-fns";
import type { Location, TripItem } from "./types";

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
  const raw = localStorage.getItem("voyant_journal");
  return raw ? JSON.parse(raw) : [];
}

export function saveJournalEntry(entry: unknown) {
  const entries = getJournalEntries();
  entries.push(entry);
  localStorage.setItem("voyant_journal", JSON.stringify(entries));
}

export function getEntriesByItem(itemId: string) {
  return getJournalEntries().filter(
    (e) => (e as { itinerary_item_id?: string }).itinerary_item_id === itemId,
  );
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

/**
 * Shared date formatter for journal cards. Falls back to the raw string when
 * `date` is not a parseable ISO date (legacy rehydrated data).
 */
export function formatJournalDate(date: string): string {
  const parsed = parseISO(date);
  return Number.isNaN(parsed.getTime()) ? date : format(parsed, "EEE d MMM yyyy");
}

/**
 * Render journal-worthy items as a Markdown document. An item is included when
 * it has non-empty notes or at least one photo — matching the journal page.
 */
export function journalToMarkdown(items: TripItem[], locations: Location[]): string {
  const entries = items
    .filter((item) => (item.notes ?? "").trim() !== "" || (item.images ?? []).length > 0)
    .map((item) => {
      const location = locations.find((candidate) => candidate.id === item.locationId);
      const date = formatJournalDate(item.date);
      const lines = [`## ${item.title}`, `**${date}**`];

      if (location) {
        lines.push(`**Location:** ${location.name}`);
      }

      if ((item.notes ?? "").trim()) {
        lines.push("", (item.notes ?? "").trim());
      }

      const images = item.images ?? [];
      if (images.length > 0) {
        lines.push(
          "",
          ...images.map((image, index) => `![${item.title} journal photo ${index + 1}](${image})`),
        );
      }

      return lines.join("\n");
    });

  return `# Journal\n\n${entries.join("\n\n")}${entries.length ? "\n" : ""}`;
}
