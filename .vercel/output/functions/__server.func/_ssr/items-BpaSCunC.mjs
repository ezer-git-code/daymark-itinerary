import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as cn } from "./utils-BeLqfDNh.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as ITEM_KINDS, c as MiniBudget, d as ViewToolbar, f as useTripWorkspace, i as EmptyTrip, r as Button, t as AppShell, u as TripEditors } from "./app-shell-D1QgtqZa.mjs";
import { r as PricePair, t as KindBadge } from "./price-pair-iLKOT0vW.mjs";
import { a as format, n as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/items-BpaSCunC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ItemsPage() {
	const w = useTripWorkspace();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [locationOpen, setLocationOpen] = (0, import_react.useState)(false);
	const [itemOpen, setItemOpen] = (0, import_react.useState)(false);
	const [editingLocationId, setEditingLocationId] = (0, import_react.useState)(null);
	const [editingItemId, setEditingItemId] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		return (filter === "all" ? w.items : w.items.filter((i) => i.kind === filter)).slice().sort((a, b) => a.date.localeCompare(b.date));
	}, [w.items, filter]);
	const locName = (id) => w.locations.find((l) => l.id === id)?.name ?? "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Item list",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewToolbar, {
			onAddLocation: () => {
				setEditingLocationId(null);
				setLocationOpen(true);
			},
			onAddItem: () => {
				setEditingItemId(null);
				setItemOpen(true);
			},
			canAddItem: w.locations.length > 0
		}),
		children: [!w.trip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTrip, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBudget, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: filter === "all",
						onClick: () => setFilter("all"),
						label: "All"
					}), ITEM_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: filter === k.id,
						onClick: () => setFilter(k.id),
						label: k.section
					}, k.id))]
				}),
				rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTrip, { onAddLocation: () => {
					setEditingLocationId(null);
					setLocationOpen(true);
				} }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-3",
					children: rows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-card p-4 shadow-card sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindBadge, { kind: item.kind }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											format(parseISO(item.date), "EEE d MMM"),
											" ·",
											" ",
											locName(item.locationId)
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-display text-lg font-medium tracking-tight",
									children: item.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => {
										setEditingItemId(item.id);
										setItemOpen(true);
									},
									children: "Edit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => w.deleteItem(item.id),
									children: "Delete"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricePair, {
								estimatedLocal: item.estimatedLocal,
								actualLocal: item.actualLocal,
								onEstimatedChange: (v) => w.updateItem(item.id, { estimatedLocal: v }),
								onActualChange: (v) => w.updateItem(item.id, { actualLocal: v }),
								localCurrency: w.trip.currency,
								homeCurrency: w.homeCurrency,
								localPerHome: w.localPerHome
							})
						})]
					}, item.id))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripEditors, {
			locationOpen,
			setLocationOpen,
			itemOpen,
			setItemOpen,
			editingLocationId,
			editingItemId
		})]
	});
}
function FilterChip({ active, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 rounded-full px-4 text-sm font-medium transition-colors duration-150", active ? "bg-primary text-primary-foreground" : "bg-card text-foreground shadow-card"),
		children: label
	});
}
//#endregion
export { ItemsPage as component };
