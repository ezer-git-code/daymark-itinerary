import { createFileRoute } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  AppShell,
  EmptyTrip,
  TripEditors,
  ViewToolbar,
  useTripWorkspace,
} from "@/components/app-shell";
import { ItemBlock } from "@/components/item-block";
import { Button } from "@/components/ui/button";
import { ITEM_KINDS } from "@/lib/types";
import type { ItemKind } from "@/lib/types";

export const Route = createFileRoute("/list")({ component: ListPage });

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
        <ol className="flex flex-col gap-8">
          {w.locations.map((loc) => {
            const locItems = w.items.filter((i) => i.locationId === loc.id);
            return (
              <li key={loc.id} className="grid gap-4 sm:grid-cols-[7rem_1fr]">
                <div className="sm:pt-1">
                  <p className="font-display text-2xl font-medium tracking-tight">
                    {format(parseISO(loc.date), "d")}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    {format(parseISO(loc.date), "EEE MMM")}
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-xs text-primary underline-offset-2 hover:underline"
                    onClick={() => {
                      setEditingLocationId(loc.id);
                      setLocationOpen(true);
                    }}
                  >
                    Edit stop
                  </button>
                </div>
                <div className="rounded-xl bg-card p-4 shadow-card sm:p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-2xl font-medium tracking-tight">
                      {loc.name}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => w.deleteLocation(loc.id)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-col gap-6">
                    {ITEM_KINDS.map((kind) => {
                      const group = locItems.filter((i) => i.kind === kind.id);
                      return (
                        <section key={kind.id}>
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                              {kind.section}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openNewItem(loc.id, kind.id)}
                            >
                              <Plus /> Add
                            </Button>
                          </div>
                          {group.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Nothing listed.</p>
                          ) : (
                            <div className="flex flex-col gap-2">
                              {group.map((item) => (
                                <ItemBlock
                                  key={item.id}
                                  item={item}
                                  localCurrency={w.trip!.currency}
                                  homeCurrency={w.homeCurrency}
                                  localPerHome={w.localPerHome}
                                  onUpdate={(patch) => w.updateItem(item.id, patch)}
                                  onEdit={() => {
                                    setEditingItemId(item.id);
                                    setItemOpen(true);
                                  }}
                                  onDelete={() => w.deleteItem(item.id)}
                                />
                              ))}
                            </div>
                          )}
                        </section>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
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
