import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { q as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useTripWorkspace, i as EmptyTrip, m as journalToMarkdown, p as formatJournalDate, r as Button, t as AppShell, u as TripEditors } from "./app-shell-Cbdmk3ju.mjs";
import { b as BookOpen, s as Pencil, u as Image } from "../_libs/lucide-react.mjs";
import { t as MarkdownNotes } from "./markdown-notes-Cpf1C4ws.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-BWq11rN1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JournalPage() {
	const w = useTripWorkspace();
	const [itemOpen, setItemOpen] = (0, import_react.useState)(false);
	const [editingItemId, setEditingItemId] = (0, import_react.useState)(null);
	const journalItems = w.items.filter((item) => (item.notes ?? "").trim() !== "" || (item.images ?? []).length > 0);
	function editItem(id) {
		setEditingItemId(id);
		setItemOpen(true);
	}
	function exportMarkdown() {
		const markdown = journalToMarkdown(journalItems, w.locations);
		const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${w.trip?.name ?? "journal"}.md`;
		link.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Journal",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			onClick: exportMarkdown,
			children: "Export Markdown"
		}),
		children: [!w.trip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTrip, {}) : journalItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			children: journalItems.map((item) => {
				const location = w.locations.find((candidate) => candidate.id === item.locationId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-card p-5 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [formatJournalDate(item.date), location ? ` · ${location.name}` : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-2xl font-medium tracking-tight",
								children: item.title
							})] }), item && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": `Edit journal entry for ${item.title}`,
								onClick: () => editItem(item.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
							})]
						}),
						item.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownNotes, {
							text: item.notes,
							className: "mt-4 text-sm leading-6 text-foreground/90"
						}),
						item.images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-2 gap-2",
							children: item.images.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: image,
								alt: `${item.title} journal photo ${index + 1}`,
								className: "aspect-[4/3] w-full rounded-md border border-border object-cover"
							}, `${item.id ?? index}-image-${index}`))
						}),
						item.images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 flex items-center gap-1 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-3.5" }),
								item.images.length,
								" ",
								item.images.length === 1 ? "photo" : "photos"
							]
						})
					]
				}, item.id);
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
