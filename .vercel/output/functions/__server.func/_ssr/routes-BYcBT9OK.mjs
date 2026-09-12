import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as formatRate, n as cn, u as useAppStore } from "./utils-BbOUFaVl.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as MapPin, f as Columns3, l as List, o as Plus, p as ClipboardList, s as Pencil, v as CalendarDays } from "../_libs/lucide-react.mjs";
import { f as useTripWorkspace, i as EmptyTrip, l as TripDialog, n as BudgetLedger, r as Button, t as AppShell } from "./app-shell-BOnkccWv.mjs";
import { a as format, n as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BYcBT9OK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIEWS = [
	{
		to: "/list",
		title: "Full list",
		copy: "Every location, dated, with experiences, food, and things to buy.",
		icon: List
	},
	{
		to: "/calendar",
		title: "Calendar",
		copy: "A month of stops. Pick a day to fill in prices.",
		icon: CalendarDays
	},
	{
		to: "/board",
		title: "By location",
		copy: "A kanban of each stop. Scan the trip left to right.",
		icon: Columns3
	},
	{
		to: "/items",
		title: "Item list",
		copy: "A flat ledger of every line, filterable by type.",
		icon: ClipboardList
	}
];
function Home() {
	const w = useTripWorkspace();
	const addTrip = useAppStore((s) => s.addTrip);
	const updateTrip = useAppStore((s) => s.updateTrip);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [!w.trip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTrip, { onNewTrip: () => {
		setEditing(false);
		setOpen(true);
	} }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pt-2 sm:pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-primary uppercase",
						children: "Current trip"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl",
						children: w.trip.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								format(parseISO(w.trip.startDate), "d MMM"),
								" – ",
								format(parseISO(w.trip.endDate), "d MMM yyyy")
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), w.trip.country]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: w.trip.currency }),
							w.localPerHome != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatRate(w.localPerHome, w.trip.currency, w.homeCurrency) })] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => {
								setEditing(true);
								setOpen(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), " Edit trip"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => {
								setEditing(false);
								setOpen(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " New trip"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetLedger, {
				budget: w.trip.budgetHome,
				estimated: w.estimated,
				actual: w.actual,
				homeCurrency: w.homeCurrency
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase",
				children: "Open a view"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: VIEWS.map((view) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: view.to,
					className: cn("group flex items-start gap-4 rounded-xl bg-card p-5 shadow-card transition-[box-shadow,transform] duration-150 ease-out", "hover:shadow-card-hover active:scale-[0.99]"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(view.icon, {
							className: "size-5",
							strokeWidth: 1.75
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-xl font-medium tracking-tight",
							children: view.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted-foreground",
							children: view.copy
						})]
					})]
				}, view.to))
			})] })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripDialog, {
		open,
		onOpenChange: setOpen,
		initial: editing ? w.trip : null,
		homeCurrency: w.homeCurrency,
		onSubmit: (data) => {
			if (editing && w.trip) updateTrip(w.trip.id, data);
			else addTrip(data);
		}
	})] });
}
//#endregion
export { Home as component };
