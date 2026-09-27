import test from "node:test";
import assert from "node:assert/strict";
import { formatJournalDate, journalToMarkdown } from "./journal.ts";
import type { Location, TripItem } from "./types";

const locations: Location[] = [
  { id: "loc-1", tripId: "trip-1", name: "Gion", date: "2026-04-12", sortOrder: 0 },
  { id: "loc-2", tripId: "trip-1", name: "Arashiyama", date: "2026-04-13", sortOrder: 1 },
];

function item(overrides: Partial<TripItem>): TripItem {
  return {
    id: "item-1",
    tripId: "trip-1",
    locationId: "loc-1",
    kind: "experience",
    title: "Evening walk",
    date: "2026-04-12",
    notes: "",
    images: [],
    estimatedLocal: null,
    actualLocal: null,
    ...overrides,
  };
}

test("journalToMarkdown renders title, formatted date, location, notes and images", () => {
  const markdown = journalToMarkdown(
    [
      item({
        notes: "  Lanterns everywhere.  ",
        images: ["data:image/a.jpg", "data:image/b.jpg"],
      }),
    ],
    locations,
  );

  assert.equal(
    markdown,
    [
      "# Journal",
      "",
      "## Evening walk",
      "**Sun 12 Apr 2026**",
      "**Location:** Gion",
      "",
      "Lanterns everywhere.",
      "",
      "![Evening walk journal photo 1](data:image/a.jpg)",
      "![Evening walk journal photo 2](data:image/b.jpg)",
      "",
    ].join("\n"),
  );
});

test("journalToMarkdown includes photos-only items (no notes)", () => {
  const markdown = journalToMarkdown([item({ images: ["data:image/only.png"] })], locations);

  assert.match(markdown, /## Evening walk/);
  assert.match(markdown, /!\[Evening walk journal photo 1\]\(data:image\/only\.png\)/);
  assert.match(markdown, /\*\*Location:\*\* Gion/);
});

test("journalToMarkdown skips items with no notes and no photos", () => {
  const markdown = journalToMarkdown(
    [item({}), item({ title: "Parfait", notes: "Yum" })],
    locations,
  );

  assert.equal(
    markdown,
    "# Journal\n\n## Parfait\n**Sun 12 Apr 2026**\n**Location:** Gion\n\nYum\n",
  );
});

test("journalToMarkdown falls back to raw date for unparsable dates", () => {
  const markdown = journalToMarkdown([item({ date: "not-a-date", notes: "Hi" })], locations);

  assert.match(markdown, /\*\*not-a-date\*\*/);
});

test("journalToMarkdown tolerates missing location and null-ish notes/images", () => {
  const markdown = journalToMarkdown([item({ locationId: "loc-missing", notes: "Ok" })], locations);

  assert.match(markdown, /## Evening walk/);
  assert.doesNotMatch(markdown, /\*\*Location:\*\*/);
});

test("journalToMarkdown on an empty selection yields a bare header", () => {
  assert.equal(journalToMarkdown([], locations), "# Journal\n\n");
});

test("formatJournalDate formats ISO dates and passes through junk", () => {
  assert.equal(formatJournalDate("2026-04-12"), "Sun 12 Apr 2026");
  assert.equal(formatJournalDate("nope"), "nope");
});
