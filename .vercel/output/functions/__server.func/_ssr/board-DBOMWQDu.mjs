import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ITEM_KINDS, d as ViewToolbar, i as EmptyTrip, p as useTripWorkspace, r as Button, t as AppShell, u as TripEditors } from "./app-shell-DU3-c5Bl.mjs";
import { o as Plus } from "../_libs/lucide-react.mjs";
import { r as PricePair, t as KindBadge } from "./price-pair-DE5CkMn-.mjs";
import { a as format, n as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board-DBOMWQDu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BoardPage() {
	const w = useTripWorkspace();
	const [locationOpen, setLocationOpen] = (0, import_react.useState)(false);
	const [itemOpen, setItemOpen] = (0, import_react.useState)(false);
	const [editingLocationId, setEditingLocationId] = (0, import_react.useState)(null);
	const [editingItemId, setEditingItemId] = (0, import_react.useState)(null);
	const [defaultLocationId, setDefaultLocationId] = (0, import_react.useState)();
	const [defaultKind, setDefaultKind] = (0, import_react.useState)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "By location",
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
		children: [!w.trip || w.locations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTrip, { onAddLocation: () => {
			setEditingLocationId(null);
			setLocationOpen(true);
		} }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6",
			children: [w.locations.map((loc) => {
				const locItems = w.items.filter((i) => i.locationId === loc.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex w-72 shrink-0 flex-col rounded-xl bg-card shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "p-4 pb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs tracking-wide text-muted-foreground uppercase",
								children: [format(parseISO(loc.date), "EEE d MMM"), loc.endDate && loc.endDate !== loc.date ? ` - ${format(parseISO(loc.endDate), "EEE d MMM")}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-medium tracking-tight",
								children: loc.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs text-primary underline-offset-2 hover:underline",
									onClick: () => {
										setEditingLocationId(loc.id);
										setLocationOpen(true);
									},
									children: "Edit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs text-muted-foreground underline-offset-2 hover:underline",
									onClick: () => w.deleteLocation(loc.id),
									children: "Remove"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 flex-col gap-5 p-3 pt-1",
						children: ITEM_KINDS.map((kind) => {
							const group = locItems.filter((i) => i.kind === kind.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
									children: kind.section
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									className: "size-8",
									"aria-label": `Add ${kind.label}`,
									onClick: () => {
										setDefaultLocationId(loc.id);
										setDefaultKind(kind.id);
										setEditingItemId(null);
										setItemOpen(true);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [group.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "px-1 text-xs text-muted-foreground",
									children: "Empty"
								}), group.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-md bg-background p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-2 flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium",
												children: item.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindBadge, { kind: item.kind })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricePair, {
											estimatedLocal: item.estimatedLocal,
											actualLocal: item.actualLocal,
											onEstimatedChange: (v) => w.updateItem(item.id, { estimatedLocal: v }),
											onActualChange: (v) => w.updateItem(item.id, { actualLocal: v }),
											localCurrency: w.trip.currency,
											homeCurrency: w.homeCurrency,
											localPerHome: w.localPerHome,
											compact: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex justify-end gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "text-xs text-primary underline-offset-2 hover:underline",
												onClick: () => {
													setEditingItemId(item.id);
													setItemOpen(true);
												},
												children: "Edit"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "text-xs text-muted-foreground underline-offset-2 hover:underline",
												onClick: () => w.deleteItem(item.id),
												children: "Delete"
											})]
										})
									]
								}, item.id))]
							})] }, kind.id);
						})
					})]
				}, loc.id);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setEditingLocationId(null);
					setLocationOpen(true);
				},
				className: "flex w-64 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 px-4 py-10 text-sm text-muted-foreground transition-colors duration-150 hover:bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mb-2 size-5" }), "Add location"]
			})]
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
export { BoardPage as component };
