import test from "node:test";
import assert from "node:assert/strict";
import { normalizeJournalData } from "./journal.ts";

test("normalizeJournalData trims notes and keeps image data URLs", () => {
  assert.deepEqual(
    normalizeJournalData("  Loved this spot.  ", ["data:image/a.jpg", "data:image/b.jpg"]),
    { notes: "Loved this spot.", images: ["data:image/a.jpg", "data:image/b.jpg"] },
  );
});

test("normalizeJournalData strips empty images and blank notes", () => {
  assert.deepEqual(
    normalizeJournalData("   ", ["", "data:image/ok.png", ""]),
    { notes: "", images: ["data:image/ok.png"] },
  );
});
