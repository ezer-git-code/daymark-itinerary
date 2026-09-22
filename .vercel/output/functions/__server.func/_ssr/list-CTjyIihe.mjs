import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ViewToolbar, i as EmptyTrip, p as useTripWorkspace, t as AppShell, u as TripEditors } from "./app-shell-BECy1Q7E.mjs";
import { a as format, n as parseISO } from "../_libs/date-fns.mjs";
import { t as ItemBlock } from "./item-block-B2XGiqhC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/list-CTjyIihe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LOCATION_TONES = [
	"border-l-sky-500 bg-sky-50/60",
	"border-l-amber-500 bg-amber-50/60",
	"border-l-rose-500 bg-rose-50/60",
	"border-l-emerald-500 bg-emerald-50/60",
	"border-l-violet-500 bg-violet-50/60"
];
var LOCATION_DOTS = [
	"bg-sky-500",
	"bg-amber-500",
	"bg-rose-500",
	"bg-emerald-500",
	"bg-violet-500"
];
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
		children: [!w.trip || w.locations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTrip, { onAddLocation: openNewLocation }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-border/80 bg-card/80 p-3 sm:p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-1 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase",
						children: "Locations"
					}), w.locations.map((loc, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-2.5 py-1.5 text-sm text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `size-2 rounded-full ${LOCATION_DOTS[index % LOCATION_DOTS.length]}`,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loc.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground",
								onClick: () => {
									setEditingLocationId(loc.id);
									setLocationOpen(true);
								},
								children: "Edit"
							})
						]
					}, loc.id))]
				})
			}), w.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-border bg-card/60 px-5 py-12 text-center text-sm text-muted-foreground shadow-card",
				children: "Nothing listed yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-4",
				children: w.items.map((item, index) => {
					const location = w.locations.find((loc) => loc.id === item.locationId);
					const locationIndex = location ? w.locations.findIndex((loc) => loc.id === location.id) : 0;
					const showDateHeading = index === 0 || item.date !== w.items[index - 1]?.date;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [showDateHeading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase",
						children: format(parseISO(item.date), "EEE, MMM d")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemBlock, {
						item,
						location,
						localCurrency: w.trip.currency,
						homeCurrency: w.homeCurrency,
						localPerHome: w.localPerHome,
						accentClassName: `border-l-2 ${LOCATION_TONES[locationIndex % LOCATION_TONES.length]}`,
						onUpdate: (patch) => w.updateItem(item.id, patch),
						onEdit: () => {
							setEditingItemId(item.id);
							setItemOpen(true);
						},
						onDelete: () => w.deleteItem(item.id)
					})] }, item.id);
				})
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
export { ListPage as component };
