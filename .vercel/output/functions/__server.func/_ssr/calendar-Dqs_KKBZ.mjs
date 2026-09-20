import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as cn, d as ViewToolbar, i as EmptyTrip, p as useTripWorkspace, r as Button, t as AppShell, u as TripEditors } from "./app-shell-4jlYCk8G.mjs";
import { g as ChevronLeft, h as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as KindIcon } from "./price-pair-F6FLP4dm.mjs";
import { a as format, c as eachDayOfInterval, d as startOfWeek, f as addMonths, i as isSameMonth, l as endOfMonth, n as parseISO, o as endOfWeek, r as isWithinInterval, s as startOfMonth, t as subMonths, u as isSameDay } from "../_libs/date-fns.mjs";
import { t as ItemBlock } from "./item-block-CG6Pk7Oo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-Dqs_KKBZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CalendarPage() {
	const w = useTripWorkspace();
	const initial = w.trip ? parseISO(w.trip.startDate) : /* @__PURE__ */ new Date();
	const [month, setMonth] = (0, import_react.useState)(startOfMonth(initial));
	const [selected, setSelected] = (0, import_react.useState)(w.trip ? parseISO(w.trip.startDate) : /* @__PURE__ */ new Date());
	const [locationOpen, setLocationOpen] = (0, import_react.useState)(false);
	const [itemOpen, setItemOpen] = (0, import_react.useState)(false);
	const [editingLocationId, setEditingLocationId] = (0, import_react.useState)(null);
	const [editingItemId, setEditingItemId] = (0, import_react.useState)(null);
	const days = (0, import_react.useMemo)(() => {
		const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
		const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
		return eachDayOfInterval({
			start,
			end
		});
	}, [month]);
	const key = format(selected, "yyyy-MM-dd");
	const dayItems = w.items.filter((i) => i.date === key);
	const dayLocs = w.locations.filter((l) => {
		const start = parseISO(l.date);
		const end = parseISO(l.endDate ?? l.date);
		return isWithinInterval(selected, {
			start,
			end
		});
	});
	const tripInterval = w.trip && {
		start: parseISO(w.trip.startDate),
		end: parseISO(w.trip.endDate)
	};
	const counts = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of w.items) map.set(item.date, (map.get(item.date) ?? 0) + 1);
		for (const loc of w.locations) {
			const start = parseISO(loc.date);
			const end = parseISO(loc.endDate ?? loc.date);
			for (const day of eachDayOfInterval({
				start,
				end
			})) {
				const iso = format(day, "yyyy-MM-dd");
				if (!map.has(iso)) map.set(iso, 0);
			}
		}
		return map;
	}, [w.items, w.locations]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Calendar",
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
			className: "grid gap-6 lg:grid-cols-[1fr_22rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-card p-4 shadow-card sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-medium",
							children: format(month, "MMMM yyyy")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Previous month",
								onClick: () => setMonth((m) => subMonths(m, 1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Next month",
								onClick: () => setMonth((m) => addMonths(m, 1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-7 gap-1 text-center text-xs tracking-wide text-muted-foreground uppercase",
						children: "Mon Tue Wed Thu Fri Sat Sun".split(" ").map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-1",
							children: d
						}, d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 grid grid-cols-7 gap-1",
						children: days.map((day) => {
							const iso = format(day, "yyyy-MM-dd");
							const inMonth = isSameMonth(day, month);
							const isSel = isSameDay(day, selected);
							const inTrip = tripInterval && isWithinInterval(day, tripInterval);
							const n = counts.get(iso) ?? 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelected(day),
								className: cn("flex min-h-12 flex-col items-center justify-center rounded-md text-sm transition-colors duration-150", !inMonth && "text-muted-foreground/40", inTrip && inMonth && "bg-primary/10", isSel && "bg-primary text-primary-foreground"),
								children: [format(day, "d"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-0.5 size-1 rounded-full", n > 0 ? isSel ? "bg-primary-foreground" : "bg-primary" : "bg-transparent") })]
							}, iso);
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex min-h-80 flex-col rounded-xl bg-card p-4 shadow-card sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-medium",
						children: format(selected, "EEEE d MMMM")
					}),
					dayLocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: dayLocs.map((l) => l.name).join(" · ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-1 flex-col gap-2",
						children: dayItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nothing dated for this day."
						}) : dayItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindIcon, {
								kind: item.kind,
								className: "mt-4 text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemBlock, {
								item,
								location: w.locations.find((l) => l.id === item.locationId),
								localCurrency: w.trip.currency,
								homeCurrency: w.homeCurrency,
								localPerHome: w.localPerHome,
								onUpdate: (patch) => w.updateItem(item.id, patch),
								onEdit: () => {
									setEditingItemId(item.id);
									setItemOpen(true);
								},
								onDelete: () => w.deleteItem(item.id),
								dense: true
							})]
						}, item.id))
					})
				]
			})]
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
//#endregion
export { CalendarPage as component };
