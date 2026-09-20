import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { A as parseMoney, D as formatMoney, O as formatRate, S as cn, a as ITEM_KINDS, k as localToHome, o as Input, s as Label$1 } from "./app-shell-8nqwo2p7.mjs";
import { a as ShoppingBag, f as Compass, n as Utensils } from "../_libs/lucide-react.mjs";
import { i as TooltipTrigger, n as Tooltip, r as TooltipContent } from "./router-CO7sX-im.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/price-pair-DCh2Zwfu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-wide uppercase", {
	variants: { variant: {
		default: "bg-primary/10 text-primary",
		muted: "bg-muted text-muted-foreground",
		outline: "border border-border text-muted-foreground",
		experience: "bg-primary/10 text-primary",
		food: "bg-good/10 text-good",
		buy: "bg-warn/10 text-warn"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var ICONS = {
	experience: Compass,
	food: Utensils,
	buy: ShoppingBag
};
function KindIcon({ kind, className }) {
	const Icon = ICONS[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className: cn("size-4", className),
		strokeWidth: 1.75
	});
}
function KindBadge({ kind }) {
	const meta = ITEM_KINDS.find((k) => k.id === kind);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: kind,
		className: "gap-1 normal-case tracking-normal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindIcon, {
			kind,
			className: "size-3"
		}), meta.label]
	});
}
function MoneyField({ label, value, onChange, localCurrency, homeCurrency, localPerHome, compact }) {
	const [draft, setDraft] = (0, import_react.useState)(value == null ? "" : String(value));
	(0, import_react.useEffect)(() => {
		setDraft(value == null ? "" : String(value));
	}, [value]);
	const parsed = parseMoney(draft);
	const converted = parsed == null ? null : localToHome(parsed, localPerHome);
	function commit() {
		onChange(parseMoney(draft));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-w-0 flex-col gap-1", compact && "gap-0.5"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs text-muted-foreground",
					children: localCurrency
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					inputMode: "decimal",
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					onBlur: commit,
					onKeyDown: (e) => {
						if (e.key === "Enter") e.target.blur();
					},
					placeholder: "—",
					className: "h-11 pl-12 tabular-nums",
					"aria-label": label
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Converted, {
				amount: converted,
				homeCurrency,
				localAmount: parsed,
				localCurrency,
				localPerHome
			})]
		})]
	});
}
function Converted({ amount, homeCurrency, localAmount, localCurrency, localPerHome }) {
	const text = amount == null ? "—" : formatMoney(amount, homeCurrency, { compact: true });
	const tip = localAmount == null || localPerHome == null ? "Add a rate to convert to home currency" : `${formatMoney(localAmount, localCurrency)} · ${formatRate(localPerHome, localCurrency, homeCurrency)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-24 shrink-0 text-right text-sm tabular-nums text-muted-foreground",
			children: text
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: tip })] });
}
function PricePair({ estimatedLocal, actualLocal, onEstimatedChange, onActualChange, localCurrency, homeCurrency, localPerHome, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-3", compact ? "grid-cols-1" : "sm:grid-cols-2"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
			label: "Estimated",
			value: estimatedLocal,
			onChange: onEstimatedChange,
			localCurrency,
			homeCurrency,
			localPerHome,
			compact
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
			label: "Actual",
			value: actualLocal,
			onChange: onActualChange,
			localCurrency,
			homeCurrency,
			localPerHome,
			compact
		})]
	});
}
//#endregion
export { KindIcon as n, PricePair as r, KindBadge as t };
