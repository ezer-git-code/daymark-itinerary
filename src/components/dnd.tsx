import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { GripVertical } from "lucide-react";
import { useState, type ReactNode } from "react";
import { KindBadge } from "@/components/kind-badge";
import { resolveItemDrop, type DropTarget, type ItemDragPayload } from "@/lib/dnd";
import { formatJournalDate } from "@/lib/journal";
import type { TripItem } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Drag-and-drop for trip items, shared by the list, calendar, board, and
 * items views. An 8px activation distance keeps taps and touch scrolling
 * from accidentally starting a drag.
 */
export function ItemDndContext({
  moveItem,
  children,
}: {
  moveItem: (id: string, locationId: string, date?: string) => void;
  children: ReactNode;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const [activeItem, setActiveItem] = useState<TripItem | null>(null);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={(event) =>
        setActiveItem((event.active.data.current as ItemDragPayload | undefined)?.item ?? null)
      }
      onDragEnd={(event) => {
        applyItemDrop(event, moveItem);
        setActiveItem(null);
      }}
      onDragCancel={() => setActiveItem(null)}
    >
      {children}
      <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
        {activeItem ? <DragPreview item={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

/**
 * Wraps an item card as draggable. `children` receives the drag handle node
 * so each view can place it where it fits the layout.
 */
export function DraggableItem({
  item,
  children,
  className,
}: {
  item: TripItem;
  children: (handle: ReactNode) => ReactNode;
  className?: string;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    data: { type: "item", item } satisfies ItemDragPayload,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(isDragging && "opacity-40", className)}
      style={
        transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined
      }
    >
      {children(
        <button
          type="button"
          aria-label={`Drag ${item.title}`}
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none rounded-xs p-0.5 align-middle text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground active:cursor-grabbing"
        >
          <GripVertical className="size-4" />
        </button>,
      )}
    </div>
  );
}

/** Registers a drop target and highlights it while an item hovers. */
export function DropZone({
  id,
  data,
  children,
  className,
  activeClassName,
}: {
  id: string;
  data: DropTarget;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}) {
  const { isOver, setNodeRef } = useDroppable({ id, data });

  return (
    <div ref={setNodeRef} className={cn(className, isOver && activeClassName)}>
      {children}
    </div>
  );
}

/** Floating card shown under the cursor while dragging. */
function DragPreview({ item }: { item: TripItem }) {
  return (
    <div className="flex max-w-72 items-center gap-2 rounded-xl bg-card p-3 shadow-pop">
      <KindBadge kind={item.kind} />
      <span className="min-w-0 truncate text-sm font-medium">{item.title}</span>
      <span className="shrink-0 text-xs text-muted-foreground">{formatJournalDate(item.date)}</span>
    </div>
  );
}

/** Read the dragged item + drop target out of a drag end event and apply
 * it via the store's moveItem. Returns true when a move happened. */
export function applyItemDrop(
  event: DragEndEvent,
  move: (id: string, locationId: string, date?: string) => void,
): boolean {
  const payload = event.active.data.current as ItemDragPayload | undefined;
  const target = event.over?.data.current as DropTarget | undefined;
  if (!payload?.item || !target) return false;

  const move_ = resolveItemDrop(payload.item, target);
  if (!move_) return false;

  move(payload.item.id, move_.locationId ?? payload.item.locationId, move_.date);
  return true;
}
