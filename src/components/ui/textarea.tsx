import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm text-foreground shadow-card placeholder:text-muted-foreground/80 focus-visible:outline-none focus-visible:shadow-card-hover disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
