import { createFileRoute } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import {
  AppShell,
  EmptyTrip,
  TripEditors,
  ViewToolbar,
  useTripWorkspace,
} from "@/components/app-shell";
import { ItemBlock } from "@/components/item-block";
import type { ItemKind } from "@/lib/types";

export const Route = createFileRoute("/list")({ component: ListPage });

const LOCATION_TONES = [
  "border-l-sky-500 bg-sky-50/60",
  "border-l-amber-500 bg-amber-50/60",
  "border-l-rose-500 bg-rose-50/60",
  "border-l-emerald-500 bg-emerald-50/60",
  "border-l-violet-500 bg-violet-50/60",
] as const;

const LOCATION_DOTS = [
  "bg-sky-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-emerald-500",
  "bg-violet-500",
] as const;

function ListPage() {
  const w = useTripWorkspace();
  const [locationOpen, setLocationOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [defaultLocationId, setDefaultLocationId] = useState<string | undefined>();
  const [defaultKind, setDefaultKind] = useState<ItemKind | undefined>();

  function openNewLocation() {
    setEditingLocationId(null);
    setLocationOpen(true);
  }

  function openNewItem(locationId?: string, kind?: ItemKind) {
    setEditingItemId(null);
    setDefaultLocationId(locationId);
    setDefaultKind(kind);
    setItemOpen(true);
  }

  return (
    <AppShell
      title="Full list"
      actions={
        <ViewToolbar
          onAddLocation={openNewLocation}
          onAddItem={() => openNewItem()}
          canAddItem={w.locations.length > 0}
        />
      }
    >
      {!w.trip || w.locations.length === 0 ? (
        <EmptyTrip onAddLocation={openNewLocation} />
      ) : (
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-border/80 bg-card/80 p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Locations
              </span>
              {w.locations.map((loc, index) => (
                <div
                  key={loc.id}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-2.5 py-1.5 text-sm text-foreground"
                >
                  <span
                    className={`size-2 rounded-full ${LOCATION_DOTS[index % LOCATION_DOTS.length]}`}
                    aria-hidden="true"
                  />
                  <span>{loc.name}</span>
                  <button
                    type="button"
                    className="text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => {
                      setEditingLocationId(loc.id);
                      setLocationOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
          {w.items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-12 text-center text-sm text-muted-foreground shadow-card">
              Nothing listed yet.
            </div>
          ) : (
            <ol className="flex flex-col gap-4">
              {w.items.map((item, index) => {
                const location = w.locations.find((loc) => loc.id === item.locationId);
                const locationIndex = location
                  ? w.locations.findIndex((loc) => loc.id === location.id)
                  : 0;
                const showDateHeading =
                  index === 0 || item.date !== w.items[index - 1]?.date;
                return (
                  <li key={item.id}>
                    {showDateHeading && (
                      <h2 className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                        {format(parseISO(item.date), "EEE, MMM d")}
                      </h2>
                    )}
                    <ItemBlock
                      item={item}
                      location={location}
                      localCurrency={w.trip!.currency}
                      homeCurrency={w.homeCurrency}
                      localPerHome={w.localPerHome}
                      accentClassName={`border-l-2 ${LOCATION_TONES[locationIndex % LOCATION_TONES.length]}`}
                      onUpdate={(patch) => w.updateItem(item.id, patch)}
                      onEdit={() => {
                        setEditingItemId(item.id);
                        setItemOpen(true);
                      }}
                      onDelete={() => w.deleteItem(item.id)}
                    />
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}
      <TripEditors
        locationOpen={locationOpen}
        setLocationOpen={setLocationOpen}
        itemOpen={itemOpen}
        setItemOpen={setItemOpen}
        editingLocationId={editingLocationId}
        editingItemId={editingItemId}
        defaultLocationId={defaultLocationId}
        defaultKind={defaultKind}
      />
    </AppShell>
  );
}
