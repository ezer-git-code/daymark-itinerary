import { useEffect, useMemo, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { CURRENCIES } from "@/lib/money";
import { normalizeJournalData } from "@/lib/journal";
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

  useEffect(() => {
    if (open) resetFrom(initial);
  }, [open, initial?.id]);

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
  onSubmit: (loc: { name: string; date: string; endDate?: string }) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [date, setDate] = useState(initial?.date ?? defaultDate ?? "");
  const [endDate, setEndDate] = useState(initial?.endDate ?? "");

  useEffect(() => {
    if (!open) return;
    setName(initial?.name ?? "");
    setDate(initial?.date ?? defaultDate ?? "");
    setEndDate(initial?.endDate ?? "");
  }, [open, initial?.id, defaultDate]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) {
          setName(initial?.name ?? "");
          setDate(initial?.date ?? defaultDate ?? "");
          setEndDate(initial?.endDate ?? "");
        }
        onOpenChange(v);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit location" : "Add location"}</DialogTitle>
          <DialogDescription>
            Each stop on the trip. Add an end date for multi-day stays.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              name: name.trim() || "Untitled",
              date: date || new Date().toISOString().slice(0, 10),
              endDate: endDate && endDate >= date ? endDate : undefined,
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
          <Field label="End date (optional)">
            <Input
              type="date"
              value={endDate}
              min={date || undefined}
              onChange={(e) => setEndDate(e.target.value)}
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
    notes: string;
    images: string[];
  }) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [kind, setKind] = useState<ItemKind>(initial?.kind ?? defaultKind ?? "experience");
  const [locationId, setLocationId] = useState(
    initial?.locationId ?? defaultLocationId ?? locations[0]?.id ?? "",
  );
  const [date, setDate] = useState(initial?.date ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [images, setImages] = useState<string[]>(initial?.images ?? []);

  useEffect(() => {
    if (!open) return;
    setTitle(initial?.title ?? "");
    setKind(initial?.kind ?? defaultKind ?? "experience");
    setLocationId(
      initial?.locationId ?? defaultLocationId ?? locations[0]?.id ?? "",
    );
    setDate(initial?.date ?? "");
    setNotes(initial?.notes ?? "");
    setImages(Array.isArray(initial?.images) ? initial.images : []);
  }, [open, initial?.id, defaultKind, defaultLocationId, locations[0]?.id]);

  const loc = locations.find((l) => l.id === locationId);
  const imageCount = useMemo(() => images.filter(Boolean).length, [images]);

  function handleImageFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const next = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result ?? ""));
        reader.onerror = () => reject(new Error("Could not read image file"));
        reader.readAsDataURL(file);
      }));

    void Promise.all(next).then((values) => {
      setImages((current) => [...current, ...values.filter(Boolean)]);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) {
          setTitle(initial?.title ?? "");
          setKind(initial?.kind ?? defaultKind ?? "experience");
          setLocationId(initial?.locationId ?? defaultLocationId ?? locations[0]?.id ?? "");
          setDate(initial?.date ?? "");
          setNotes(initial?.notes ?? "");
          setImages(initial?.images ?? []);
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
            const normalized = normalizeJournalData(notes, images);
            onSubmit({
              title: title.trim() || "Untitled",
              kind,
              locationId,
              date: date || loc?.date || new Date().toISOString().slice(0, 10),
              notes: normalized.notes,
              images: normalized.images,
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
          <Field label="Journal notes">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note about this moment, memory, or takeaway..."
            />
          </Field>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <Label>Photos</Label>
              {imageCount > 0 && (
                <span className="text-xs text-muted-foreground">{imageCount} added</span>
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageFiles(e.target.files)}
            />
            {images.length > 0 && (
              <div className="grid gap-2 sm:grid-cols-3">
                {images.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative">
                    <img
                      src={image}
                      alt={`Journal preview ${index + 1}`}
                      className="h-24 w-full rounded-md object-cover border border-border"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 rounded-full bg-destructive px-1.5 py-0.5 text-[10px] text-destructive-foreground"
                      onClick={() => setImages((current) => current.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
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
