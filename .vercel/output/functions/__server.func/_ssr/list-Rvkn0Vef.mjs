import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ITEM_KINDS, d as ViewToolbar, i as EmptyTrip, p as useTripWorkspace, r as Button, t as AppShell, u as TripEditors } from "./app-shell-4jlYCk8G.mjs";
import { o as Plus } from "../_libs/lucide-react.mjs";
import { a as format, n as parseISO } from "../_libs/date-fns.mjs";
import { t as ItemBlock } from "./item-block-B6KD7MbN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/list-Rvkn0Vef.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ListPage() {
	const w = useTripWorkspace();
	const [locationOpen, setLocationOpen] = (0, import_react.useState)(false);
	const [itemOpen, setItemOpen] = (0, import_react.useState)(false);
	const [editingLocationId, setEditingLocationId] = (0, import_react.useState)(null);
	const [editingItemId, setEditingItemId] = (0, import_react.useState)(null);
	const [defaultLocationId, setDefaultLocationId] = (0, import_react.useState)();
	const [defaultKind, setDefaultKind] = (0, import_react.useState)();
	function openNewLocation() {
		setEditingLocationId(null);
		setLocationOpen(true);
	}
	function openNewItem(locationId, kind) {
		setEditingItemId(null);
		setDefaultLocationId(locationId);
		setDefaultKind(kind);
		setItemOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Full list",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewToolbar, {
			onAddLocation: openNewLocation,
			onAddItem: () => openNewItem(),
			canAddItem: w.locations.length > 0
		}),
		children: [!w.trip || w.locations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTrip, { onAddLocation: openNewLocation }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex flex-col gap-8",
			children: w.locations.map((loc) => {
				const locItems = w.items.filter((i) => i.locationId === loc.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-4 sm:grid-cols-[7rem_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-2xl font-medium tracking-tight",
								children: [format(parseISO(loc.date), "d"), loc.endDate && loc.endDate !== loc.date ? `-${format(parseISO(loc.endDate), "d")}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs tracking-wide text-muted-foreground uppercase",
								children: [format(parseISO(loc.date), "EEE MMM"), loc.endDate && loc.endDate !== loc.date ? ` - ${format(parseISO(loc.endDate), "EEE MMM")}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-2 text-xs text-primary underline-offset-2 hover:underline",
								onClick: () => {
									setEditingLocationId(loc.id);
									setLocationOpen(true);
								},
								children: "Edit stop"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-card p-4 shadow-card sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-medium tracking-tight",
								children: loc.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => w.deleteLocation(loc.id),
								children: "Remove"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-col gap-6",
							children: ITEM_KINDS.map((kind) => {
								const group = locItems.filter((i) => i.kind === kind.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
										children: kind.section
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => openNewItem(loc.id, kind.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Add"]
									})]
								}), group.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Nothing listed."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-2",
									children: group.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemBlock, {
										item,
										localCurrency: w.trip.currency,
										homeCurrency: w.homeCurrency,
										localPerHome: w.localPerHome,
										onUpdate: (patch) => w.updateItem(item.id, patch),
										onEdit: () => {
											setEditingItemId(item.id);
											setItemOpen(true);
										},
										onDelete: () => w.deleteItem(item.id)
									}, item.id))
								})] }, kind.id);
							})
						})]
					})]
				}, loc.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripEditors, {
			locationOpen,
			setLocationOpen,
			itemOpen,
			setItemOpen,
			editingLocationId,
			editingItemId,
			defaultLocationId,
			defaultKind
		})]
	});
}
//#endregion
export { ListPage as component };
