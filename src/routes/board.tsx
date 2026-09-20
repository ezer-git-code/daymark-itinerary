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
import { KindBadge } from "@/components/kind-badge";
import { PricePair } from "@/components/price-pair";
import { Button } from "@/components/ui/button";
import { ITEM_KINDS } from "@/lib/types";
import type { ItemKind } from "@/lib/types";

export const Route = createFileRoute("/board")({ component: BoardPage });

function BoardPage() {
  const w = useTripWorkspace();
  const [locationOpen, setLocationOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [defaultLocationId, setDefaultLocationId] = useState<string | undefined>();
  const [defaultKind, setDefaultKind] = useState<ItemKind | undefined>();

  return (
    <AppShell
      title="By location"
      actions={
        <ViewToolbar
          onAddLocation={() => {
            setEditingLocationId(null);
            setLocationOpen(true);
          }}
          onAddItem={() => {
            setEditingItemId(null);
            setItemOpen(true);
          }}
          canAddItem={w.locations.length > 0}
        />
      }
    >
      {!w.trip || w.locations.length === 0 ? (
        <EmptyTrip
          onAddLocation={() => {
            setEditingLocationId(null);
            setLocationOpen(true);
          }}
        />
      ) : (
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
          {w.locations.map((loc) => {
            const locItems = w.items.filter((i) => i.locationId === loc.id);
            return (
              <section
                key={loc.id}
                className="flex w-72 shrink-0 flex-col rounded-xl bg-card shadow-card"
              >
                <header className="p-4 pb-2">
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    {format(parseISO(loc.date), "EEE d MMM")}
                    {loc.endDate && loc.endDate !== loc.date
                      ? ` - ${format(parseISO(loc.endDate), "EEE d MMM")}`
                      : ""}
                  </p>
                  <h2 className="font-display text-xl font-medium tracking-tight">
                    {loc.name}
                  </h2>
                  <div className="mt-1 flex gap-2">
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
                    <button
                      type="button"
                      className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                      onClick={() => w.deleteLocation(loc.id)}
                    >
                      Remove
                    </button>
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-5 p-3 pt-1">
                  {ITEM_KINDS.map((kind) => {
                    const group = locItems.filter((i) => i.kind === kind.id);
                    return (
                      <div key={kind.id}>
                        <div className="mb-2 flex items-center justify-between px-1">
                          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            {kind.section}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="size-8"
                            aria-label={`Add ${kind.label}`}
                            onClick={() => {
                              setDefaultLocationId(loc.id);
                              setDefaultKind(kind.id);
                              setEditingItemId(null);
                              setItemOpen(true);
                            }}
                          >
                            <Plus className="size-3.5" />
                          </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                          {group.length === 0 && (
                            <p className="px-1 text-xs text-muted-foreground">Empty</p>
                          )}
                          {group.map((item) => (
                            <article
                              key={item.id}
                              className="rounded-md bg-background p-3"
                            >
                              <div className="mb-2 flex items-start justify-between gap-2">
                                <p className="text-sm font-medium">{item.title}</p>
                                <KindBadge kind={item.kind} />
                              </div>
                              <PricePair
                                estimatedLocal={item.estimatedLocal}
                                actualLocal={item.actualLocal}
                                onEstimatedChange={(v) =>
                                  w.updateItem(item.id, { estimatedLocal: v })
                                }
                                onActualChange={(v) =>
                                  w.updateItem(item.id, { actualLocal: v })
                                }
                                localCurrency={w.trip!.currency}
                                homeCurrency={w.homeCurrency}
                                localPerHome={w.localPerHome}
                                compact
                              />
                              <div className="mt-2 flex justify-end gap-2">
                                <button
                                  type="button"
                                  className="text-xs text-primary underline-offset-2 hover:underline"
                                  onClick={() => {
                                    setEditingItemId(item.id);
                                    setItemOpen(true);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                                  onClick={() => w.deleteItem(item.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setEditingLocationId(null);
              setLocationOpen(true);
            }}
            className="flex w-64 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 px-4 py-10 text-sm text-muted-foreground transition-colors duration-150 hover:bg-card"
          >
            <Plus className="mb-2 size-5" />
            Add location
          </button>
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
