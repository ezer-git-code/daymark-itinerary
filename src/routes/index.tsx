import { createFileRoute, Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import {
  CalendarDays,
  ClipboardList,
  Columns3,
  List,
  MapPin,
  Pencil,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { AppShell, EmptyTrip, useTripWorkspace } from "@/components/app-shell";
import { BudgetLedger } from "@/components/budget-ledger";
import { TripDialog } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { formatRate } from "@/lib/money";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const VIEWS = [
  {
    to: "/list" as const,
    title: "Full list",
    copy: "Every location, dated, with experiences, food, and things to buy.",
    icon: List,
  },
  {
    to: "/calendar" as const,
    title: "Calendar",
    copy: "A month of stops. Pick a day to fill in prices.",
    icon: CalendarDays,
  },
  {
    to: "/board" as const,
    title: "By location",
    copy: "A kanban of each stop. Scan the trip left to right.",
    icon: Columns3,
  },
  {
    to: "/items" as const,
    title: "Item list",
    copy: "A flat ledger of every line, filterable by type.",
    icon: ClipboardList,
  },
];

function Home() {
  const w = useTripWorkspace();
  const addTrip = useAppStore((s) => s.addTrip);
  const updateTrip = useAppStore((s) => s.updateTrip);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <AppShell>
      {!w.trip ? (
        <EmptyTrip onNewTrip={() => { setEditing(false); setOpen(true); }} />
      ) : (
        <div className="flex flex-col gap-8">
          <header className="pt-2 sm:pt-6">
            <p className="text-xs font-medium tracking-widest text-primary uppercase">
              Current trip
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              {w.trip.name}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>
                {format(parseISO(w.trip.startDate), "d MMM")}
                {" – "}
                {format(parseISO(w.trip.endDate), "d MMM yyyy")}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {w.trip.country}
              </span>
              <span aria-hidden="true">·</span>
              <span>{w.trip.currency}</span>
              {w.localPerHome != null && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    {formatRate(w.localPerHome, w.trip.currency, w.homeCurrency)}
                  </span>
                </>
              )}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditing(true);
                  setOpen(true);
                }}
              >
                <Pencil /> Edit trip
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditing(false);
                  setOpen(true);
                }}
              >
                <Plus /> New trip
              </Button>
            </div>
          </header>

          <BudgetLedger
            budget={w.trip.budgetHome}
            estimated={w.estimated}
            actual={w.actual}
            homeCurrency={w.homeCurrency}
          />

          <section>
            <h2 className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Open a view
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {VIEWS.map((view) => (
                <Link
                  key={view.to}
                  to={view.to}
                  className={cn(
                    "group flex items-start gap-4 rounded-xl bg-card p-5 shadow-card transition-[box-shadow,transform] duration-150 ease-out",
                    "hover:shadow-card-hover active:scale-[0.99]",
                  )}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <view.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-medium tracking-tight">
                      {view.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {view.copy}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      <TripDialog
        open={open}
        onOpenChange={setOpen}
        initial={editing ? w.trip : null}
        homeCurrency={w.homeCurrency}
        onSubmit={(data) => {
          if (editing && w.trip) updateTrip(w.trip.id, data);
          else addTrip(data);
        }}
      />
    </AppShell>
  );
}
