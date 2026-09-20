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
  "border-l-sky-500 bg-sky-50/70",
  "border-l-amber-500 bg-amber-50/70",
  "border-l-rose-500 bg-rose-50/70",
  "border-l-emerald-500 bg-emerald-50/70",
  "border-l-violet-500 bg-violet-50/70",
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
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border/70 pb-4">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Locations
            </span>
            {w.locations.map((loc, index) => (
              <div key={loc.id} className="flex items-center gap-2 text-sm">
                <span
                  className={`size-2.5 rounded-full ${LOCATION_DOTS[index % LOCATION_DOTS.length]}`}
                  aria-hidden="true"
                />
                <span>{loc.name}</span>
                <button
                  type="button"
                  className="text-xs text-primary underline-offset-2 hover:underline"
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
          {w.items.length === 0 ? (
            <p className="rounded-xl bg-card px-5 py-10 text-center text-sm text-muted-foreground shadow-card">
              Nothing listed yet.
            </p>
          ) : (
            <ol className="flex flex-col gap-3">
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
                      <h2 className="mb-2 mt-4 font-display text-xl font-medium tracking-tight first:mt-0">
                        {format(parseISO(item.date), "EEE, MMM d")}
                      </h2>
                    )}
                    <ItemBlock
                      item={item}
                      location={location}
                      localCurrency={w.trip!.currency}
                      homeCurrency={w.homeCurrency}
                      localPerHome={w.localPerHome}
                      accentClassName={`border-l-4 ${LOCATION_TONES[locationIndex % LOCATION_TONES.length]}`}
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
