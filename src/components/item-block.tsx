import { format, parseISO } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
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
}) {
  return (
    <article
      className={cn(
        "rounded-lg bg-background/60 p-4",
        dense && "p-3",
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
        </div>
      </div>
    </article>
  );
}
