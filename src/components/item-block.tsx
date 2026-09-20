import { format, parseISO } from "date-fns";
import { Image as ImageIcon, Pencil, Trash2 } from "lucide-react";
import { KindBadge, KindIcon } from "@/components/kind-badge";
import { PricePair } from "@/components/price-pair";
import { Button } from "@/components/ui/button";
import type { Location, TripItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ItemBlock({
  item,
  location,
  localCurrency,
  homeCurrency,
  localPerHome,
  onUpdate,
  onEdit,
  onDelete,
  dense,
  accentClassName,
}: {
  item: TripItem;
  location?: Location;
  localCurrency: string;
  homeCurrency: string;
  localPerHome: number | null;
  onUpdate: (patch: Partial<TripItem>) => void;
  onEdit: () => void;
  onDelete: () => void;
  dense?: boolean;
  accentClassName?: string;
}) {
  const notes = item.notes ?? "";
  const images = Array.isArray(item.images) ? item.images : [];

  return (
    <article
      className={cn(
        "rounded-lg bg-background/60 p-4",
        dense && "p-3",
        accentClassName,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 hidden text-primary sm:block">
          <KindIcon kind={item.kind} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-pretty">{item.title}</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                <span className="sm:hidden">
                  <KindBadge kind={item.kind} />{" "}
                </span>
                {format(parseISO(item.date), "EEE d MMM")}
                {location ? ` · ${location.name}` : ""}
              </p>
            </div>
            <div className="flex shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Edit item"
                onClick={onEdit}
              >
                <Pencil />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Delete item"
                onClick={onDelete}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          <div className="mt-3">
            <PricePair
              estimatedLocal={item.estimatedLocal}
              actualLocal={item.actualLocal}
              onEstimatedChange={(v) => onUpdate({ estimatedLocal: v })}
              onActualChange={(v) => onUpdate({ actualLocal: v })}
              localCurrency={localCurrency}
              homeCurrency={homeCurrency}
              localPerHome={localPerHome}
              compact={dense}
            />
          </div>
          {(notes || images.length > 0) && (
            <div className="mt-3 rounded-md border border-border/70 bg-muted/20 p-3">
              {notes && (
                <p className="whitespace-pre-wrap text-sm text-foreground/90">
                  {notes}
                </p>
              )}
              {images.length > 0 && (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {images.map((image, index) => (
                    <img
                      key={`${item.id}-image-${index}`}
                      src={image}
                      alt={`${item.title} journal ${index + 1}`}
                      className="h-32 w-full rounded-md object-cover border border-border"
                    />
                  ))}
                </div>
              )}
              {images.length > 0 && !notes && (
                <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <ImageIcon className="size-3.5" />
                  Photo notes
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
