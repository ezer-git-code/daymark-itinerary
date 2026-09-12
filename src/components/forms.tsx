import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCIES } from "@/lib/money";
import type { ItemKind, Location, Trip, TripItem } from "@/lib/types";
import { ITEM_KINDS } from "@/lib/types";

export function TripDialog({
  open,
  onOpenChange,
  initial,
  homeCurrency,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Trip | null;
  homeCurrency: string;
  onSubmit: (trip: Omit<Trip, "id">) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [country, setCountry] = useState(initial?.country ?? "");
  const [currency, setCurrency] = useState(initial?.currency ?? "JPY");
  const [startDate, setStartDate] = useState(initial?.startDate ?? "");
  const [endDate, setEndDate] = useState(initial?.endDate ?? "");
  const [budgetHome, setBudgetHome] = useState(
    initial ? String(initial.budgetHome) : "",
  );
  const [customRate, setCustomRate] = useState(
    initial?.customRate != null ? String(initial.customRate) : "",
  );

  function resetFrom(next: Trip | null | undefined) {
    setName(next?.name ?? "");
    setCountry(next?.country ?? "");
    setCurrency(next?.currency ?? "JPY");
    setStartDate(next?.startDate ?? "");
    setEndDate(next?.endDate ?? "");
    setBudgetHome(next ? String(next.budgetHome) : "");
    setCustomRate(next?.customRate != null ? String(next.customRate) : "");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) resetFrom(initial);
        onOpenChange(v);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit trip" : "New trip"}</DialogTitle>
          <DialogDescription>
            Dates, country, and a budget in {homeCurrency}. Prices are entered
            in the local currency.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const budget = Number(budgetHome) || 0;
            const rateRaw = customRate.trim();
            const rate = rateRaw === "" ? null : Number(rateRaw);
            onSubmit({
              name: name.trim() || "Untitled trip",
              country: country.trim() || "—",
              currency,
              startDate: startDate || new Date().toISOString().slice(0, 10),
              endDate: endDate || startDate || new Date().toISOString().slice(0, 10),
              budgetHome: budget,
              customRate: rate != null && Number.isFinite(rate) && rate > 0 ? rate : null,
            });
            onOpenChange(false);
          }}
        >
          <Field label="Trip name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Kyoto in April"
              required
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Country">
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Japan"
                required
              />
            </Field>
            <Field label="Local currency">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} · {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Start date">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Field>
            <Field label="End date">
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`Budget (${homeCurrency})`}>
              <Input
                inputMode="decimal"
                value={budgetHome}
                onChange={(e) => setBudgetHome(e.target.value)}
                placeholder="800"
                required
              />
            </Field>
            <Field label={`Rate · 1 ${homeCurrency} in ${currency}`}>
              <Input
                inputMode="decimal"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                placeholder="Auto"
              />
            </Field>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initial ? "Save trip" : "Create trip"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function LocationDialog({
  open,
  onOpenChange,
  initial,
  defaultDate,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Location | null;
  defaultDate?: string;
  onSubmit: (loc: { name: string; date: string }) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [date, setDate] = useState(initial?.date ?? defaultDate ?? "");

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) {
          setName(initial?.name ?? "");
          setDate(initial?.date ?? defaultDate ?? "");
        }
        onOpenChange(v);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit location" : "Add location"}</DialogTitle>
          <DialogDescription>
            Each stop on the trip. Set the date yourself.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              name: name.trim() || "Untitled",
              date: date || new Date().toISOString().slice(0, 10),
            });
            onOpenChange(false);
          }}
        >
          <Field label="Location">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Gion"
              required
            />
          </Field>
          <Field label="Date">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initial ? "Save" : "Add location"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ItemDialog({
  open,
  onOpenChange,
  initial,
  locations,
  defaultLocationId,
  defaultKind,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: TripItem | null;
  locations: Location[];
  defaultLocationId?: string;
  defaultKind?: ItemKind;
  onSubmit: (item: {
    locationId: string;
    kind: ItemKind;
    title: string;
    date: string;
  }) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [kind, setKind] = useState<ItemKind>(initial?.kind ?? defaultKind ?? "experience");
  const [locationId, setLocationId] = useState(
    initial?.locationId ?? defaultLocationId ?? locations[0]?.id ?? "",
  );
  const [date, setDate] = useState(initial?.date ?? "");

  const loc = locations.find((l) => l.id === locationId);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) {
          setTitle(initial?.title ?? "");
          setKind(initial?.kind ?? defaultKind ?? "experience");
          setLocationId(initial?.locationId ?? defaultLocationId ?? locations[0]?.id ?? "");
          setDate(initial?.date ?? "");
        }
        onOpenChange(v);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit item" : "Add to the list"}</DialogTitle>
          <DialogDescription>
            Experiences, food, or things to buy. Date defaults to the location.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!locationId) return;
            onSubmit({
              title: title.trim() || "Untitled",
              kind,
              locationId,
              date: date || loc?.date || new Date().toISOString().slice(0, 10),
            });
            onOpenChange(false);
          }}
        >
          <Field label="Title">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Matcha parfait"
              required
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type">
              <Select value={kind} onValueChange={(v) => setKind(v as ItemKind)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ITEM_KINDS.map((k) => (
                    <SelectItem key={k.id} value={k.id}>
                      {k.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Location">
              <Select
                value={locationId}
                onValueChange={(id) => {
                  setLocationId(id);
                  const next = locations.find((l) => l.id === id);
                  if (next && !date) setDate(next.date);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field label="Date">
            <Input
              type="date"
              value={date || loc?.date || ""}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!locationId}>
              {initial ? "Save" : "Add item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
