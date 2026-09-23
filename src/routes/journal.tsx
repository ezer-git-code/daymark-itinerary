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
import { TripItem, Location } from "@/lib/types";

export const Route = createFileRoute("/journal")({ component: JournalPage });

function JournalPage() {
  const w = useTripWorkspace();
  const [itemOpen, setItemOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const journalItems = w.items.filter(item => (item.notes ?? "").trim() !== "");

  function editItem(id: string) {
    setEditingItemId(id);
    setItemOpen(true);
  }

  //Export journal to markdown file
  function exportMarkdown() {
  const markdown = journalToMarkdown(journalItems, w.locations);
  const blob = new Blob([markdown], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${w.trip?.name ?? "journal"}.md`;
  link.click();

  URL.revokeObjectURL(url);
}

  return (
    <AppShell 
      title="Journal"
      actions={
        <Button variant="outline" onClick={exportMarkdown}>
          Export Markdown
        </Button>
      }
      >
      {!w.trip ? (
        <EmptyTrip />
      ) : journalItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-card px-6 py-16 text-center shadow-card">
          <BookOpen className="size-8 text-primary" />
          <p className="mt-4 font-display text-2xl">Your journal is empty</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Add notes or photos to an item and they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {journalItems.map((item) => {
            const location = w.locations.find(
              (candidate) => candidate.id === item.locationId,
            );
            
            return (
              <article
                key={item.id}
                className="rounded-xl bg-card p-5 shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.date}
                      {location ? ` · ${location}` : ""}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">
                      {item.title}
                    </h2>
                  </div>

                  {item && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Edit journal entry for ${item.title}`}
                      onClick={() => editItem(item.id)}
                    >
                      <Pencil />
                    </Button>
                  )}
                </div>
                {item.notes && (
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-foreground/90">
                    {item.notes}
                  </p>
                )}
                {item.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {item.images.map((image, index) => (
                      <img
                        key={`${item.id ?? index}-image-${index}`}
                        src={image}
                        alt={`${item.title} journal photo ${index + 1}`}
                        className="aspect-[4/3] w-full rounded-md border border-border object-cover"
                      />
                    ))}
                  </div>
                )}
                {item.images.length > 0 && (
                  <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <ImageIcon className="size-3.5" />
                    {item.images.length} {item.images.length === 1 ? "photo" : "photos"}
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
function journalToMarkdown(journalItems: TripItem[], locations: Location[]) {
  const entries = journalItems.map((item) => {
    const location = locations.find(
      (candidate) => candidate.id === item.locationId,
    );
    const parsedDate = parseISO(item.date);
    const date = Number.isNaN(parsedDate.getTime())
      ? item.date
      : format(parsedDate, "MMMM d, yyyy");
    const lines = [`## ${item.title}`, `**${date}**`];

    if (location) {
      lines.push(`**Location:** ${location.name}`);
    }

    if (item.notes.trim()) {
      lines.push("", item.notes.trim());
    }

    if (item.images.length > 0) {
      lines.push(
        "",
        ...item.images.map((image, index) =>
          `![${item.title} journal photo ${index + 1}](${image})`,
        ),
      );
    }

    return lines.join("\n");
  });

  return `# Journal\n\n${entries.join("\n\n")}${entries.length ? "\n" : ""}`;
}

