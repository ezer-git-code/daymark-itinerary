import { createFileRoute } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { BookOpen, Image as ImageIcon, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AppShell,
  EmptyTrip,
  TripEditors,
  useTripWorkspace,
} from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/journal")({ component: JournalPage });

type StoredJournalEntry = {
  id?: string;
  itinerary_item_id?: string;
  title?: string;
  content?: string;
  notes?: string;
  image_urls?: string[];
  images?: string[];
  day?: string;
  location?: string;
};

function JournalPage() {
  const w = useTripWorkspace();
  const [itemOpen, setItemOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [state, setState] = useState<StoredJournalEntry[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("daymark_journal");
    try {
      const parsed = JSON.parse(data ?? "[]");
      setState(Array.isArray(parsed) ? parsed : []);
    } catch {
      setState([]);
    }
  }, []);

  function editItem(id: string) {
    setEditingItemId(id);
    setItemOpen(true);
  }

  return (
    <AppShell title="Journal">
      {!w.trip ? (
        <EmptyTrip />
      ) : state.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-card px-6 py-16 text-center shadow-card">
          <BookOpen className="size-8 text-primary" />
          <p className="mt-4 font-display text-2xl">Your journal is empty</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Add notes or photos to an item and they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {state.map((entry, index) => {
            const notes = entry.notes ?? entry.content ?? "";
            const images = Array.isArray(entry.images)
              ? entry.images
              : Array.isArray(entry.image_urls)
                ? entry.image_urls
                : [];
            const item = w.items.find(
              (candidate) => candidate.id === entry.itinerary_item_id,
            );
            const title = entry.title ?? item?.title ?? "Journal entry";
            const location = entry.location ?? "";
            const day = entry.day ?? item?.date;
            return (
              <article
                key={entry.id ?? `${entry.itinerary_item_id ?? "entry"}-${index}`}
                className="rounded-xl bg-card p-5 shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {day ? format(parseISO(day), "EEE d MMM yyyy") : "Journal"}
                      {location ? ` · ${location}` : ""}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">
                      {title}
                    </h2>
                  </div>
                  {item && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Edit journal entry for ${title}`}
                      onClick={() => editItem(item.id)}
                    >
                      <Pencil />
                    </Button>
                  )}
                </div>
                {notes && (
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-foreground/90">
                    {notes}
                  </p>
                )}
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {images.map((image, index) => (
                      <img
                        key={`${entry.id ?? index}-image-${index}`}
                        src={image}
                        alt={`${title} journal photo ${index + 1}`}
                        className="aspect-[4/3] w-full rounded-md border border-border object-cover"
                      />
                    ))}
                  </div>
                )}
                {images.length > 0 && (
                  <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <ImageIcon className="size-3.5" />
                    {images.length} {images.length === 1 ? "photo" : "photos"}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
      <TripEditors
        locationOpen={false}
        setLocationOpen={() => {}}
        itemOpen={itemOpen}
        setItemOpen={setItemOpen}
        editingLocationId={null}
        editingItemId={editingItemId}
      />
    </AppShell>
  );
}
