import { createFileRoute } from "@tanstack/react-router";
import {
  addMonths,
  differenceInCalendarDays,
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
import { useMemo, useState, type CSSProperties } from "react";
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
import type { Location } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({ component: CalendarPage });

type WeekSegment = {
  loc: Location;
  colStart: number;
  span: number;
  continuesLeft: boolean;
  continuesRight: boolean;
  intersectsMonth: boolean;
  lane: number;
};

// One colour per stop, so the same place reads the same across the whole grid.
type Swatch = { chip: string; dot: string };
const CHIP_SWATCHES: Swatch[] = [
  { chip: "bg-[#dcebe6] text-[#1f4740]", dot: "bg-[#3f7d6f]" },
  { chip: "bg-[#f3e3c6] text-[#6a4a15]", dot: "bg-[#b58a3c]" },
  { chip: "bg-[#f4dcd6] text-[#7a3226]", dot: "bg-[#b56250]" },
  { chip: "bg-[#e7e1f1] text-[#4a3c66]", dot: "bg-[#7c6aa8]" },
  { chip: "bg-[#dbe7f0] text-[#234157]", dot: "bg-[#5a86a5]" },
  { chip: "bg-[#e8ead0] text-[#4a4c22]", dot: "bg-[#8b8f4a]" },
];

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
  const dayLocs = w.locations
    .filter((l) => {
      const start = parseISO(l.date);
      const end = parseISO(l.endDate ?? l.date);
      return isWithinInterval(selected, { start, end });
    })
    .sort((a, b) => a.date.localeCompare(b.date) || a.sortOrder - b.sortOrder);

  // One entry set per visible week: every location stay clipped to that week,
  // then packed into lanes so overlapping stays stack instead of hiding.
  const weeks = useMemo(() => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const out: WeekSegment[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      const week = days.slice(i, i + 7);
      const weekStart = week[0];
      const weekEnd = week[6];
      const segs: WeekSegment[] = [];
      for (const loc of w.locations) {
        const start = parseISO(loc.date);
        const end = parseISO(loc.endDate ?? loc.date);
        if (end < weekStart || start > weekEnd) continue;
        const clipStart = start < weekStart ? weekStart : start;
        const clipEnd = end > weekEnd ? weekEnd : end;
        segs.push({
          loc,
          colStart: Math.max(0, differenceInCalendarDays(clipStart, weekStart)),
          span: Math.max(1, differenceInCalendarDays(clipEnd, clipStart) + 1),
          continuesLeft: start < weekStart,
          continuesRight: end > weekEnd,
          intersectsMonth:
            differenceInCalendarDays(clipEnd, monthStart) >= 0 &&
            differenceInCalendarDays(monthEnd, clipStart) >= 0,
          lane: 0,
        });
      }
      segs.sort(
        (a, b) =>
          a.colStart - b.colStart ||
          b.span - a.span ||
          a.loc.sortOrder - b.loc.sortOrder,
      );
      const laneEnds: number[] = [];
      for (const seg of segs) {
        let lane = laneEnds.findIndex((endCol) => endCol < seg.colStart);
        if (lane === -1) {
          laneEnds.push(-1);
          lane = laneEnds.length - 1;
        }
        laneEnds[lane] = seg.colStart + seg.span - 1;
        seg.lane = lane;
      }
      out.push(segs);
    }
    return out;
  }, [days, month, w.locations]);

  const tripInterval = w.trip && {
    start: parseISO(w.trip.startDate),
    end: parseISO(w.trip.endDate),
  };

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of w.items) {
      map.set(item.date, (map.get(item.date) ?? 0) + 1);
    }
    return map;
  }, [w.items]);

  const swatches = useMemo(() => {
    const map = new Map<string, Swatch>();
    w.locations.forEach((loc, i) => {
      map.set(loc.id, CHIP_SWATCHES[i % CHIP_SWATCHES.length]);
    });
    return map;
  }, [w.locations]);

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
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_22rem]">
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
              <div className="mt-1 flex flex-col gap-2">
                {weeks.map((segs, wi) => {
                  const weekDays = days.slice(wi * 7, wi * 7 + 7);
                  const laneCount = segs.reduce((n, s) => Math.max(n, s.lane + 1), 0);
                  return (
                    <div
                      key={format(weekDays[0], "yyyy-MM-dd")}
                      className="grid gap-x-1 gap-y-0.5"
                      style={{
                        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                        gridTemplateRows: `minmax(2.5rem, auto) repeat(${laneCount}, 1.25rem)`,
                      }}
                    >
                      {weekDays.map((day, di) => {
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
                            style={{ gridColumn: di + 1, gridRow: `1 / span ${laneCount + 1}` }}
                          />
                        );
                      })}
                      {segs.map((seg) => (
                        <LocationBar
                          key={seg.loc.id}
                          seg={seg}
                          swatch={swatches.get(seg.loc.id) ?? CHIP_SWATCHES[0]}
                          active={isWithinInterval(selected, {
                            start: parseISO(seg.loc.date),
                            end: parseISO(seg.loc.endDate ?? seg.loc.date),
                          })}
                          onOpen={() => {
                            setEditingLocationId(seg.loc.id);
                            setLocationOpen(true);
                          }}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="flex min-h-80 flex-col rounded-xl bg-card p-4 shadow-card sm:p-5">
              <h2 className="font-display text-xl font-medium">
                {format(selected, "EEEE d MMMM")}
              </h2>
              {dayLocs.length > 0 && (
                <ul className="mt-2 flex flex-col gap-1.5">
                  {dayLocs.map((l) => (
                    <li key={l.id} className="flex items-center gap-2 text-sm">
                      <span
                        className={cn(
                          "size-2 shrink-0 rounded-full",
                          (swatches.get(l.id) ?? CHIP_SWATCHES[0]).dot,
                        )}
                      />
                      <span className="min-w-0 truncate font-medium">{l.name}</span>
                      {l.endDate && l.endDate !== l.date && (
                        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                          {format(parseISO(l.date), "d MMM")} – {format(parseISO(l.endDate), "d MMM")}
                        </span>
                      )}
                      <button
                        type="button"
                        className="ml-auto shrink-0 text-xs text-primary underline-offset-2 hover:underline"
                        onClick={() => {
                          setEditingLocationId(l.id);
                          setLocationOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </li>
                  ))}
                </ul>
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

function LocationBar({
  seg,
  swatch,
  active,
  onOpen,
}: {
  seg: WeekSegment;
  swatch: Swatch;
  active: boolean;
  onOpen: () => void;
}) {
  const { loc, span } = seg;
  const range =
    loc.endDate && loc.endDate !== loc.date
      ? `${format(parseISO(loc.date), "d MMM")} – ${format(parseISO(loc.endDate), "d MMM")}`
      : format(parseISO(loc.date), "d MMM");

  return (
    <button
      type="button"
      onClick={onOpen}
      style={{
        gridColumn: `${seg.colStart + 1} / span ${span}`,
        gridRow: seg.lane + 2,
      }}
      title={`${loc.name} · ${range}`}
      aria-label={`Edit ${loc.name}, ${range}`}
      className={cn(
        "flex h-full min-w-0 items-center gap-1 overflow-hidden rounded-xs px-1.5 text-[0.6875rem] leading-none font-medium transition-colors duration-150 hover:brightness-[0.97]",
        swatch.chip,
        span === 1 && "justify-center px-1 sm:justify-start sm:px-1.5",
        active && "font-semibold inset-ring inset-ring-current/40",
        !seg.intersectsMonth && "opacity-55",
      )}
    >
      {seg.continuesLeft ? (
        <ChevronLeft className="-ml-0.5 size-3 shrink-0 opacity-70" strokeWidth={2.5} />
      ) : (
        <span className={cn("size-1.5 shrink-0 rounded-full", swatch.dot)} />
      )}
      <span className={cn("min-w-0 truncate", span === 1 && "hidden sm:inline")}>
        {loc.name}
      </span>
      {seg.continuesRight && (
        <ChevronRight className="-mr-0.5 ml-auto size-3 shrink-0 opacity-70" strokeWidth={2.5} />
      )}
    </button>
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
  style,
}: {
  day: Date;
  iso: string;
  inMonth: boolean;
  isSel: boolean;
  inTrip: boolean;
  count: number;
  onSelect: (day: Date) => void;
  style?: CSSProperties;
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
      style={style}
      className={cn(
        "flex min-h-10 flex-col items-center rounded-md pt-1.5 text-sm transition-colors duration-150",
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