import { createFileRoute } from "@tanstack/react-router";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useDroppable } from "@dnd-kit/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { DraggableItem, ItemDndContext } from "@/components/dnd";
import {
  AppShell,
  EmptyTrip,
  TripEditors,
  ViewToolbar,
  useTripWorkspace,
} from "@/components/app-shell";
import { ItemBlock } from "@/components/item-block";
import { KindIcon } from "@/components/kind-badge";
import { Button } from "@/components/ui/button";
import type { DropTarget } from "@/lib/dnd";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({ component: CalendarPage });

function CalendarPage() {
  const w = useTripWorkspace();
  const initial = w.trip ? parseISO(w.trip.startDate) : new Date();
  const [month, setMonth] = useState(startOfMonth(initial));
  const [selected, setSelected] = useState(w.trip ? parseISO(w.trip.startDate) : new Date());
  const [locationOpen, setLocationOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [month]);

  const key = format(selected, "yyyy-MM-dd");
  const dayItems = w.items.filter((i) => i.date === key);
  const dayLocs = w.locations.filter((l) => {
    const start = parseISO(l.date);
    const end = parseISO(l.endDate ?? l.date);
    return isWithinInterval(selected, { start, end });
  });

  const tripInterval = w.trip && {
    start: parseISO(w.trip.startDate),
    end: parseISO(w.trip.endDate),
  };

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of w.items) {
      map.set(item.date, (map.get(item.date) ?? 0) + 1);
    }
    for (const loc of w.locations) {
      const start = parseISO(loc.date);
      const end = parseISO(loc.endDate ?? loc.date);
      for (const day of eachDayOfInterval({ start, end })) {
        const iso = format(day, "yyyy-MM-dd");
        if (!map.has(iso)) map.set(iso, 0);
      }
    }
    return map;
  }, [w.items, w.locations]);

  return (
    <AppShell
      title="Calendar"
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
      <ItemDndContext moveItem={w.moveItem}>
        {!w.trip ? (
          <EmptyTrip />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
            <section className="rounded-xl bg-card p-4 shadow-card sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-medium">{format(month, "MMMM yyyy")}</h2>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Previous month"
                    onClick={() => setMonth((m) => subMonths(m, 1))}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Next month"
                    onClick={() => setMonth((m) => addMonths(m, 1))}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs tracking-wide text-muted-foreground uppercase">
                {"Mon Tue Wed Thu Fri Sat Sun".split(" ").map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {days.map((day) => {
                  const iso = format(day, "yyyy-MM-dd");
                  return (
                    <DayCell
                      key={iso}
                      day={day}
                      iso={iso}
                      inMonth={isSameMonth(day, month)}
                      isSel={isSameDay(day, selected)}
                      inTrip={!!tripInterval && isWithinInterval(day, tripInterval)}
                      count={counts.get(iso) ?? 0}
                      onSelect={setSelected}
                    />
                  );
                })}
              </div>
            </section>

            <section className="flex min-h-80 flex-col rounded-xl bg-card p-4 shadow-card sm:p-5">
              <h2 className="font-display text-xl font-medium">
                {format(selected, "EEEE d MMMM")}
              </h2>
              {dayLocs.length > 0 && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {dayLocs.map((l) => l.name).join(" · ")}
                </p>
              )}
              <div className="mt-4 flex flex-1 flex-col gap-2">
                {dayItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nothing dated for this day.</p>
                ) : (
                  dayItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-2">
                      <KindIcon kind={item.kind} className="mt-4 text-primary" />
                      <DraggableItem item={item} className="min-w-0 flex-1">
                        {(handle) => (
                          <ItemBlock
                            item={item}
                            location={w.locations.find((l) => l.id === item.locationId)}
                            localCurrency={w.trip!.currency}
                            homeCurrency={w.homeCurrency}
                            localPerHome={w.localPerHome}
                            onUpdate={(patch) => w.updateItem(item.id, patch)}
                            onEdit={() => {
                              setEditingItemId(item.id);
                              setItemOpen(true);
                            }}
                            onDelete={() => w.deleteItem(item.id)}
                            dense
                            dragHandle={handle}
                          />
                        )}
                      </DraggableItem>
                    </div>
                  ))
                )}
              </div>
            </section>
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
      </ItemDndContext>
    </AppShell>
  );
}

function DayCell({
  day,
  iso,
  inMonth,
  isSel,
  inTrip,
  count,
  onSelect,
}: {
  day: Date;
  iso: string;
  inMonth: boolean;
  isSel: boolean;
  inTrip: boolean;
  count: number;
  onSelect: (day: Date) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `cal-day-${iso}`,
    data: { type: "date", date: iso } satisfies DropTarget,
  });

  return (
    <button
      type="button"
      ref={setNodeRef}
      onClick={() => onSelect(day)}
      className={cn(
        "flex min-h-12 flex-col items-center justify-center rounded-md text-sm transition-colors duration-150",
        !inMonth && "text-muted-foreground/40",
        inTrip && inMonth && "bg-primary/10",
        isSel && "bg-primary text-primary-foreground",
        isOver && !isSel && "ring-2 ring-primary",
      )}
    >
      {format(day, "d")}
      <span
        className={cn(
          "mt-0.5 size-1 rounded-full",
          count > 0 ? (isSel ? "bg-primary-foreground" : "bg-primary") : "bg-transparent",
        )}
      />
    </button>
  );
}
