import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as cn, r as Button } from "./app-shell-DU3-c5Bl.mjs";
import { i as Trash2, s as Pencil, u as Image } from "../_libs/lucide-react.mjs";
import { n as KindIcon, r as PricePair, t as KindBadge } from "./price-pair-DE5CkMn-.mjs";
import { a as format, n as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/item-block-Die3vs0H.js
var import_jsx_runtime = require_jsx_runtime();
function ItemBlock({ item, location, localCurrency, homeCurrency, localPerHome, onUpdate, onEdit, onDelete, dense, accentClassName }) {
	const notes = item.notes ?? "";
	const images = Array.isArray(item.images) ? item.images : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: cn("rounded-2xl border border-border/80 bg-white/80 p-4 shadow-[0_1px_0_rgba(15,23,42,0.02)] transition-colors", dense && "p-3", accentClassName),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 hidden text-primary sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindIcon, { kind: item.kind })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-medium text-pretty",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "sm:hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindBadge, { kind: item.kind }), " "]
									}),
									format(parseISO(item.date), "EEE d MMM"),
									location ? ` · ${location.name}` : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Edit item",
								onClick: onEdit,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Delete item",
								onClick: onDelete,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricePair, {
							estimatedLocal: item.estimatedLocal,
							actualLocal: item.actualLocal,
							onEstimatedChange: (v) => onUpdate({ estimatedLocal: v }),
							onActualChange: (v) => onUpdate({ actualLocal: v }),
							localCurrency,
							homeCurrency,
							localPerHome,
							compact: dense
						})
					}),
					(notes || images.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-md border border-border/70 bg-muted/20 p-3",
						children: [
							notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-wrap text-sm text-foreground/90",
								children: notes
							}),
							images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid gap-2 sm:grid-cols-2",
								children: images.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: image,
									alt: `${item.title} journal ${index + 1}`,
									className: "h-32 w-full rounded-md object-cover border border-border"
								}, `${item.id}-image-${index}`))
							}),
							images.length > 0 && !notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-1 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-3.5" }), "Photo notes"]
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { ItemBlock as t };
