import test from "node:test";
import assert from "node:assert/strict";
import { locationDateFor, resolveItemDrop } from "./dnd.ts";
import type { Location, TripItem } from "./types";

const gion: Location = {
  id: "loc-gion",
  tripId: "trip-1",
  name: "Gion",
  date: "2026-04-12",
  endDate: "2026-04-14",
  sortOrder: 0,
};

const arashiyama: Location = {
  id: "loc-ara",
  tripId: "trip-1",
  name: "Arashiyama",
  date: "2026-04-13",
  sortOrder: 1,
};

function item(overrides: Partial<TripItem> = {}): TripItem {
  return {
    id: "item-1",
    tripId: "trip-1",
    locationId: "loc-gion",
    kind: "food",
    title: "Parfait",
    date: "2026-04-13",
    notes: "",
    images: [],
    estimatedLocal: null,
    actualLocal: null,
    ...overrides,
  };
}

test("locationDateFor keeps dates inside the location stay", () => {
  assert.equal(locationDateFor("2026-04-13", gion), "2026-04-13");
  assert.equal(locationDateFor("2026-04-12", gion), "2026-04-12");
  assert.equal(locationDateFor("2026-04-14", gion), "2026-04-14");
});

test("locationDateFor clamps dates outside the stay to the first day", () => {
  assert.equal(locationDateFor("2026-04-10", gion), "2026-04-12");
  assert.equal(locationDateFor("2026-04-20", gion), "2026-04-12");
  assert.equal(locationDateFor("2026-04-14", arashiyama), "2026-04-13");
  assert.equal(locationDateFor("2026-04-13", arashiyama), "2026-04-13");
});

test("resolveItemDrop moves to a different date and no-ops on the same date", () => {
  assert.deepEqual(resolveItemDrop(item(), { type: "date", date: "2026-04-15" }), {
    date: "2026-04-15",
  });
  assert.equal(resolveItemDrop(item(), { type: "date", date: "2026-04-13" }), null);
});

test("resolveItemDrop moves between locations and clamps the date", () => {
  assert.deepEqual(resolveItemDrop(item(), { type: "location", location: arashiyama }), {
    locationId: "loc-ara",
    date: "2026-04-13",
  });
  assert.equal(resolveItemDrop(item(), { type: "location", location: gion }), null);
  const lateItem = item({ date: "2026-04-20" });
  assert.deepEqual(resolveItemDrop(lateItem, { type: "location", location: arashiyama }), {
    locationId: "loc-ara",
    date: "2026-04-13",
  });
});

test("resolveItemDrop adopts another item's date, no-op on itself or same date", () => {
  const other = item({ id: "item-2", date: "2026-04-14" });
  assert.deepEqual(resolveItemDrop(item(), { type: "item", item: other }), {
    date: "2026-04-14",
  });
  assert.equal(resolveItemDrop(item(), { type: "item", item: item() }), null);
  assert.equal(resolveItemDrop(item(), { type: "item", item: item({ id: "item-2" }) }), null);
});
