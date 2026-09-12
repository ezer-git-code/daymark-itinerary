import { Compass, ShoppingBag, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ItemKind } from "@/lib/types";
import { ITEM_KINDS } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS = {
  experience: Compass,
  food: Utensils,
  buy: ShoppingBag,
} as const;

export function KindIcon({
  kind,
  className,
}: {
  kind: ItemKind;
  className?: string;
}) {
  const Icon = ICONS[kind];
  return <Icon className={cn("size-4", className)} strokeWidth={1.75} />;
}

export function KindBadge({ kind }: { kind: ItemKind }) {
  const meta = ITEM_KINDS.find((k) => k.id === kind)!;
  return (
    <Badge variant={kind} className="gap-1 normal-case tracking-normal">
      <KindIcon kind={kind} className="size-3" />
      {meta.label}
    </Badge>
  );
}
