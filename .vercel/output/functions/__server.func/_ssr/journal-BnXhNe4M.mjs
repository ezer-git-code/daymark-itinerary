import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as EmptyTrip, p as useTripWorkspace, r as Button, t as AppShell, u as TripEditors } from "./app-shell-C7Hmusn-.mjs";
import { b as BookOpen, s as Pencil, u as Image } from "../_libs/lucide-react.mjs";
import { a as format, n as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-BnXhNe4M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JournalPage() {
	const w = useTripWorkspace();
	const [itemOpen, setItemOpen] = (0, import_react.useState)(false);
	const [editingItemId, setEditingItemId] = (0, import_react.useState)(null);
	const [state, setState] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const data = localStorage.getItem("daymark_journal");
		try {
			const parsed = JSON.parse(data ?? "[]");
			setState(Array.isArray(parsed) ? parsed : []);
		} catch {
			setState([]);
		}
	}, []);
	function editItem(id) {
		setEditingItemId(id);
		setItemOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Journal",
		children: [!w.trip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTrip, {}) : state.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center rounded-xl bg-card px-6 py-16 text-center shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-8 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-2xl",
					children: "Your journal is empty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-sm text-sm text-muted-foreground",
					children: "Add notes or photos to an item and they will appear here."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: state.map((entry, index) => {
				const notes = entry.notes ?? entry.content ?? "";
				const images = Array.isArray(entry.images) ? entry.images : Array.isArray(entry.image_urls) ? entry.image_urls : [];
				const item = w.items.find((candidate) => candidate.id === entry.itinerary_item_id);
				const title = entry.title ?? item?.title ?? "Journal entry";
				const location = entry.location ?? "";
				const day = entry.day ?? item?.date;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-card p-5 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs tracking-wide text-muted-foreground uppercase",
								children: [day ? format(parseISO(day), "EEE d MMM yyyy") : "Journal", location ? ` · ${location}` : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-2xl font-medium tracking-tight",
								children: title
							})] }), item && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": `Edit journal entry for ${title}`,
								onClick: () => editItem(item.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
							})]
						}),
						notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 whitespace-pre-wrap text-sm leading-6 text-foreground/90",
							children: notes
						}),
						images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-2 gap-2",
							children: images.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: image,
								alt: `${title} journal photo ${index + 1}`,
								className: "aspect-[4/3] w-full rounded-md border border-border object-cover"
							}, `${entry.id ?? index}-image-${index}`))
						}),
						images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 flex items-center gap-1 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-3.5" }),
								images.length,
								" ",
								images.length === 1 ? "photo" : "photos"
							]
						})
					]
				}, entry.id ?? `${entry.itinerary_item_id ?? "entry"}-${index}`);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripEditors, {
			locationOpen: false,
			setLocationOpen: () => {},
			itemOpen,
			setItemOpen,
			editingLocationId: null,
			editingItemId
		})]
	});
}
//#endregion
export { JournalPage as component };
