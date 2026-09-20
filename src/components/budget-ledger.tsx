import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

export function BudgetLedger({
  budget,
  estimated,
  actual,
  homeCurrency,
}: {
  budget: number;
  estimated: number;
  actual: number;
  homeCurrency: string;
}) {
  const remaining = budget - actual;
  const estPct = budget > 0 ? Math.min(100, (estimated / budget) * 100) : 0;
  const actPct = budget > 0 ? Math.min(100, (actual / budget) * 100) : 0;
  const over = actual > budget && budget > 0;

  return (
    <section className="rounded-xl bg-card p-5 shadow-card sm:p-6">
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-3">
        <Stat label="Total budget" value={formatMoney(budget, homeCurrency)} />
        <Stat
          label="Estimated"
          value={formatMoney(estimated, homeCurrency)}
          hint={budget > 0 ? `${Math.round(estPct)}% of budget` : undefined}
        />
        <Stat
          label="Actual spent"
          value={formatMoney(actual, homeCurrency)}
          hint={budget > 0 ? `${Math.round(actPct)}% of budget` : undefined}
          warn={over}
        />
      </div>
      <div className="mt-5">
        <div
          className="relative h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={Math.max(budget, estimated, actual, 1)}
          aria-valuenow={actual}
          aria-label="Spend against budget"
        >
          <div
            className="absolute inset-y-0 left-0 bg-primary/30"
            style={{ width: `${estPct}%` }}
          />
          <div
            className={cn(
              "absolute inset-y-0 left-0",
              over ? "bg-destructive" : "bg-primary",
            )}
            style={{ width: `${actPct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {over
            ? `${formatMoney(actual - budget, homeCurrency)} over budget`
            : `${formatMoney(Math.max(0, remaining), homeCurrency)} remaining`}
        </p>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  hint,
  warn,
}: {
  label: string;
  value: string;
  hint?: string;
  warn?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 whitespace-nowrap font-display text-2xl font-medium tracking-tight tabular-nums",
          warn ? "text-destructive" : "text-foreground",
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
