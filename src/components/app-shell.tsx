import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Columns3,
  BookOpen,
  List,
  Plus,
  House,
} from "lucide-react";
import { useState } from "react";
import { BudgetLedger } from "@/components/budget-ledger";
import { ItemDialog, LocationDialog, TripDialog } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCIES, formatRate } from "@/lib/money";
import {
  localPerHomeForTrip,
  sumHome,
  useActiveTrip,
  useAppStore,
  useTripItems,
  useTripLocations,
} from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/list", label: "List", icon: List },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/board", label: "Board", icon: Columns3 },
  { to: "/items", label: "Items", icon: ClipboardList },
  { to: "/journal", label: "Journal", icon: BookOpen },
] as const;

export function AppShell({
  children,
  title,
  actions,
}: {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const trip = useActiveTrip();
  const trips = useAppStore((s) => s.trips);
  const homeCurrency = useAppStore((s) => s.homeCurrency);
  const setHomeCurrency = useAppStore((s) => s.setHomeCurrency);
  const setActiveTrip = useAppStore((s) => s.setActiveTrip);
  const addTrip = useAppStore((s) => s.addTrip);
  const updateTrip = useAppStore((s) => s.updateTrip);
  const deleteTrip = useAppStore((s) => s.deleteTrip);
  const rates = useAppStore((s) => s.rates);
  const ratesBase = useAppStore((s) => s.ratesBase);
  const [tripOpen, setTripOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(false);

  const rate = localPerHomeForTrip(trip, { homeCurrency, rates, ratesBase });

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="font-display text-xl tracking-tight text-foreground"
          >
            Daymark
          </Link>
          {pathname !== "/" && (
            <nav className="ml-4 hidden items-center gap-1 sm:flex" aria-label="Views">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-9 items-center rounded-sm px-3 text-sm font-medium transition-colors duration-150",
                    pathname === item.to
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                  aria-current={pathname === item.to ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          <div className="ml-auto flex items-center gap-2">
            {trips.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="max-w-44 sm:max-w-56">
                    <span className="truncate">
                      {trip?.name ?? "Select trip"}
                    </span>
                    <ChevronDown className="size-4 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Trips</DropdownMenuLabel>
                  {trips.map((t) => (
                    <DropdownMenuItem
                      key={t.id}
                      onClick={() => setActiveTrip(t.id)}
                    >
                      {t.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setEditingTrip(false); setTripOpen(true); }}>
                    <Plus className="size-4" /> New trip
                  </DropdownMenuItem>
                  {trip && (
                    <>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingTrip(true);
                          setTripOpen(true);
                        }}
                      >
                        Edit trip
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => deleteTrip(trip.id)}
                      >
                        Delete trip
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Select value={homeCurrency} onValueChange={setHomeCurrency}>
              <SelectTrigger
                className="h-9 w-24 px-2 text-xs"
                aria-label="Home currency"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {actions && (
          <div className="mx-auto flex max-w-6xl justify-end px-4 pb-3 sm:px-6">
            <div className="flex flex-row flex-nowrap justify-end gap-2">{actions}</div>
          </div>
        )}
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-6 pb-24 sm:px-6 sm:pb-12">
        {title && (
          <div className="mb-5">
            <div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {trip?.name}
              </p>
              <h1 className="font-display text-3xl font-medium tracking-tight">
                {title}
              </h1>
              {trip && rate != null && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatRate(rate, trip.currency, homeCurrency)}
                  {trip.customRate ? " · custom" : ""}
                </p>
              )}
            </div>
          </div>
        )}
        {children}
      </main>

      {pathname !== "/" && (
        <nav
          className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] sm:hidden"
          aria-label="Views"
        >
          <ul className="grid grid-cols-6">
            <li>
              <Link
                to="/"
                className={navCls(pathname === "/")}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                <House className="size-5" />
                Home
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={navCls(pathname === item.to)}
                  aria-current={pathname === item.to ? "page" : undefined}
                >
                  <item.icon className="size-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <TripDialog
        open={tripOpen}
        onOpenChange={setTripOpen}
        initial={editingTrip ? trip : null}
        homeCurrency={homeCurrency}
        onSubmit={(data) => {
          if (editingTrip && trip) updateTrip(trip.id, data);
          else addTrip(data);
        }}
      />
    </div>
  );
}

function navCls(active: boolean) {
  return cn(
    "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-medium",
    active ? "text-primary" : "text-muted-foreground",
  );
}

export function ViewToolbar({
  onAddLocation,
  onAddItem,
  canAddItem,
}: {
  onAddLocation: () => void;
  onAddItem: () => void;
  canAddItem: boolean;
}) {
  return (
    <>
      <Button variant="outline" size="sm" onClick={onAddLocation}>
        <Plus /> Location
      </Button>
      <Button size="sm" onClick={onAddItem} disabled={!canAddItem}>
        <Plus /> Item
      </Button>
    </>
  );
}

export function useTripWorkspace() {
  const trip = useActiveTrip();
  const homeCurrency = useAppStore((s) => s.homeCurrency);
  const rates = useAppStore((s) => s.rates);
  const ratesBase = useAppStore((s) => s.ratesBase);
  const locations = useTripLocations(trip?.id);
  const items = useTripItems(trip?.id);
  const localPerHome = localPerHomeForTrip(trip, {
    homeCurrency,
    rates,
    ratesBase,
  });
  const estimated = sumHome(items, "estimatedLocal", localPerHome);
  const actual = sumHome(items, "actualLocal", localPerHome);
  const addLocation = useAppStore((s) => s.addLocation);
  const updateLocation = useAppStore((s) => s.updateLocation);
  const deleteLocation = useAppStore((s) => s.deleteLocation);
  const addItem = useAppStore((s) => s.addItem);
  const updateItem = useAppStore((s) => s.updateItem);
  const deleteItem = useAppStore((s) => s.deleteItem);

  return {
    trip,
    homeCurrency,
    locations,
    items,
    localPerHome,
    estimated,
    actual,
    addLocation,
    updateLocation,
    deleteLocation,
    addItem,
    updateItem,
    deleteItem,
  };
}

export function TripEditors({
  locationOpen,
  setLocationOpen,
  itemOpen,
  setItemOpen,
  editingLocationId,
  editingItemId,
  defaultLocationId,
  defaultKind,
}: {
  locationOpen: boolean;
  setLocationOpen: (v: boolean) => void;
  itemOpen: boolean;
  setItemOpen: (v: boolean) => void;
  editingLocationId?: string | null;
  editingItemId?: string | null;
  defaultLocationId?: string;
  defaultKind?: "experience" | "food" | "buy";
}) {
  const w = useTripWorkspace();
  const loc = w.locations.find((l) => l.id === editingLocationId) ?? null;
  const item = w.items.find((i) => i.id === editingItemId) ?? null;

  if (!w.trip) return null;

  return (
    <>
      <LocationDialog
        open={locationOpen}
        onOpenChange={setLocationOpen}
        initial={loc}
        defaultDate={w.trip.startDate}
        onSubmit={(data) => {
          if (loc) w.updateLocation(loc.id, data);
          else w.addLocation({ ...data, tripId: w.trip!.id });
        }}
      />
      <ItemDialog
        key={item?.id ?? "new-item"}
        open={itemOpen}
        onOpenChange={setItemOpen}
        initial={item}
        locations={w.locations}
        defaultLocationId={defaultLocationId ?? loc?.id ?? w.locations[0]?.id}
        defaultKind={defaultKind}
        onSubmit={(data) => {
          if (item) w.updateItem(item.id, data);
          else
            w.addItem({
              ...data,
              tripId: w.trip!.id,
              estimatedLocal: null,
              actualLocal: null,
            });
        }}
      />
    </>
  );
}

export function EmptyTrip({
  onAddLocation,
  onNewTrip,
}: {
  onAddLocation?: () => void;
  onNewTrip?: () => void;
}) {
  const loadSample = useAppStore((s) => s.loadSample);
  const trip = useActiveTrip();
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-card px-6 py-16 text-center shadow-card">
      <p className="font-display text-2xl">
        {trip ? "No locations yet" : "No trips yet"}
      </p>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {trip
          ? "Add a dated location, then list experiences, food, and things to buy."
          : "Create a trip to start listing locations and prices."}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {trip && onAddLocation && (
          <Button onClick={onAddLocation}>
            <Plus /> Add location
          </Button>
        )}
        {onNewTrip && (
          <Button variant={trip ? "outline" : "default"} onClick={onNewTrip}>
            New trip
          </Button>
        )}
        <Button variant="outline" onClick={loadSample}>
          Load sample trip
        </Button>
      </div>
    </div>
  );
}

export function MiniBudget() {
  const w = useTripWorkspace();
  if (!w.trip) return null;
  return (
    <BudgetLedger
      budget={w.trip.budgetHome}
      estimated={w.estimated}
      actual={w.actual}
      homeCurrency={w.homeCurrency}
    />
  );
}
