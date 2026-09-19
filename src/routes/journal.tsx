import { createFileRoute } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { BookOpen, Image as ImageIcon, Pencil } from "lucide-react";
import { useState } from "react";
import {
  AppShell,
  EmptyTrip,
  TripEditors,
  useTripWorkspace,
} from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/journal")({ component: JournalPage });

function JournalPage() {
  const w = useTripWorkspace();
  const [itemOpen, setItemOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const entries = w.items.filter((item) => {
    const notes = item.notes ?? "";
    const images = Array.isArray(item.images) ? item.images : [];
    return notes.trim() !== "" || images.length > 0;
  });

  function editItem(id: string) {
    setEditingItemId(id);
    setItemOpen(true);
  }

  return (
    <AppShell title="Journal">
      {!w.trip ? (
        <EmptyTrip />
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-card px-6 py-16 text-center shadow-card">
          <BookOpen className="size-8 text-primary" />
          <p className="mt-4 font-display text-2xl">Your journal is empty</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Add notes or photos to an item and they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {entries.map((item) => {
            const notes = item.notes ?? "";
            const images = Array.isArray(item.images) ? item.images : [];
            const location = w.locations.find((entry) => entry.id === item.locationId);
            return (
              <article key={item.id} className="rounded-xl bg-card p-5 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {format(parseISO(item.date), "EEE d MMM yyyy")}
                      {location ? ` · ${location.name}` : ""}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">
                      {item.title}
                    </h2>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit journal entry for ${item.title}`}
                    onClick={() => editItem(item.id)}
                  >
                    <Pencil />
                  </Button>
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
                        key={`${item.id}-image-${index}`}
                        src={image}
                        alt={`${item.title} journal photo ${index + 1}`}
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
