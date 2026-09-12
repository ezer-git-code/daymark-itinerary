import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatMoney, formatRate, localToHome, parseMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

function MoneyField({
  label,
  value,
  onChange,
  localCurrency,
  homeCurrency,
  localPerHome,
  compact,
}: {
  label: string;
  value: number | null;
  onChange: (next: number | null) => void;
  localCurrency: string;
  homeCurrency: string;
  localPerHome: number | null;
  compact?: boolean;
}) {
  const [draft, setDraft] = useState(value == null ? "" : String(value));
  useEffect(() => {
    setDraft(value == null ? "" : String(value));
  }, [value]);

  const parsed = parseMoney(draft);
  const converted = parsed == null ? null : localToHome(parsed, localPerHome);

  function commit() {
    onChange(parseMoney(draft));
  }

  return (
    <div className={cn("flex min-w-0 flex-col gap-1", compact && "gap-0.5")}>
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs text-muted-foreground">
            {localCurrency}
          </span>
          <Input
            inputMode="decimal"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
            placeholder="—"
            className="h-11 pl-12 tabular-nums"
            aria-label={label}
          />
        </div>
        <Converted
          amount={converted}
          homeCurrency={homeCurrency}
          localAmount={parsed}
          localCurrency={localCurrency}
          localPerHome={localPerHome}
        />
      </div>
    </div>
  );
}

function Converted({
  amount,
  homeCurrency,
  localAmount,
  localCurrency,
  localPerHome,
}: {
  amount: number | null;
  homeCurrency: string;
  localAmount: number | null;
  localCurrency: string;
  localPerHome: number | null;
}) {
  const text =
    amount == null ? "—" : formatMoney(amount, homeCurrency, { compact: true });
  const tip =
    localAmount == null || localPerHome == null
      ? "Add a rate to convert to home currency"
      : `${formatMoney(localAmount, localCurrency)} · ${formatRate(localPerHome, localCurrency, homeCurrency)}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="w-24 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
          {text}
        </span>
      </TooltipTrigger>
      <TooltipContent>{tip}</TooltipContent>
    </Tooltip>
  );
}

export function PricePair({
  estimatedLocal,
  actualLocal,
  onEstimatedChange,
  onActualChange,
  localCurrency,
  homeCurrency,
  localPerHome,
  compact,
}: {
  estimatedLocal: number | null;
  actualLocal: number | null;
  onEstimatedChange: (v: number | null) => void;
  onActualChange: (v: number | null) => void;
  localCurrency: string;
  homeCurrency: string;
  localPerHome: number | null;
  compact?: boolean;
}) {
  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
      <MoneyField
        label="Estimated"
        value={estimatedLocal}
        onChange={onEstimatedChange}
        localCurrency={localCurrency}
        homeCurrency={homeCurrency}
        localPerHome={localPerHome}
        compact={compact}
      />
      <MoneyField
        label="Actual"
        value={actualLocal}
        onChange={onActualChange}
        localCurrency={localCurrency}
        homeCurrency={homeCurrency}
        localPerHome={localPerHome}
        compact={compact}
      />
    </div>
  );
}

export function ConvertedAmount({
  local,
  localCurrency,
  homeCurrency,
  localPerHome,
  className,
}: {
  local: number | null;
  localCurrency: string;
  homeCurrency: string;
  localPerHome: number | null;
  className?: string;
}) {
  if (local == null) {
    return <span className={cn("tabular-nums text-muted-foreground", className)}>—</span>;
  }
  const home = localToHome(local, localPerHome);
  return (
    <span className={cn("tabular-nums", className)}>
      <span className="text-foreground">{formatMoney(local, localCurrency)}</span>
      {home != null && localCurrency !== homeCurrency && (
        <span className="text-muted-foreground">
          {" "}
          → {formatMoney(home, homeCurrency, { compact: true })}
        </span>
      )}
    </span>
  );
}
