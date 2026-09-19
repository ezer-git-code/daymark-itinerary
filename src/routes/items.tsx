import { createFileRoute } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import {
  AppShell,
  EmptyTrip,
  MiniBudget,
  TripEditors,
  ViewToolbar,
  useTripWorkspace,
} from "@/components/app-shell";
import { KindBadge } from "@/components/kind-badge";
import { PricePair } from "@/components/price-pair";
import { Button } from "@/components/ui/button";
import { ITEM_KINDS } from "@/lib/types";
import type { ItemKind } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/items")({ component: ItemsPage });

function ItemsPage() {
  const w = useTripWorkspace();
  const [filter, setFilter] = useState<ItemKind | "all">("all");
  const [locationOpen, setLocationOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const rows = useMemo(() => {
    const list =
      filter === "all" ? w.items : w.items.filter((i) => i.kind === filter);
    return list.slice().sort((a, b) => a.date.localeCompare(b.date));
  }, [w.items, filter]);

  const locName = (id: string) =>
    w.locations.find((l) => l.id === id)?.name ?? "—";

  return (
    <AppShell
      title="Item list"
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
      {!w.trip ? (
        <EmptyTrip />
      ) : (
        <div className="flex flex-col gap-5">
          <MiniBudget />
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="All"
            />
            {ITEM_KINDS.map((k) => (
              <FilterChip
                key={k.id}
                active={filter === k.id}
                onClick={() => setFilter(k.id)}
                label={k.section}
              />
            ))}
          </div>
          {rows.length === 0 ? (
            <EmptyTrip
              onAddLocation={() => {
                setEditingLocationId(null);
                setLocationOpen(true);
              }}
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {rows.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl bg-card p-4 shadow-card sm:p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <KindBadge kind={item.kind} />
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(item.date), "EEE d MMM")} ·{" "}
                          {locName(item.locationId)}
                        </p>
                      </div>
                      <h3 className="mt-1 font-display text-lg font-medium tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingItemId(item.id);
                          setItemOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => w.deleteItem(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
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
                    />
                  </div>
                </li>
              ))}
            </ul>
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
      />
    </AppShell>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 rounded-full px-4 text-sm font-medium transition-colors duration-150",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-card text-foreground shadow-card",
      )}
    >
      {label}
    </button>
  );
}