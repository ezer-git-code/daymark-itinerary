import { q as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { w as cn } from "./app-shell-Cbdmk3ju.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
import { t as remarkGfm } from "../_libs/remark-gfm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/markdown-notes-Cpf1C4ws.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Conservative check for whether a note uses markdown syntax. Notes that
* don't match any pattern render verbatim as plain text, so casual notes
* (prices, "2*3", snake_case) are never mangled by the markdown renderer.
*/
function looksLikeMarkdown(text) {
	if (!text) return false;
	return [
		/^#{1,6}\s+\S/m,
		/^[ \t]*([-*+]|\d+[.)])[ \t]+\S/m,
		/^[ \t]*>[ \t]*\S/m,
		/```/,
		/\*\*[^*\n]+\*\*/,
		/__[^_\n]+__/,
		/~~[^~\n]+~~/,
		/`[^`\n]+`/,
		/!\[[^\]\n]*\]\([^)\s]+\)/,
		/\[[^\]\n]+\]\([^)\s]+\)/,
		/(^|[ \t(])\*[^*\n]+\*(?![*\w])/m,
		/(^|[ \t(])_[^_\n]+_(?![\w_])/m,
		/^[ \t]*\|.+\|[ \t]*\n[ \t]*\|[ \t]*:?-+[ \t]*\|/m
	].some((pattern) => pattern.test(text));
}
/**
* Notes renderer shared by the journal page and item blocks. Plain notes
* render verbatim with preserved line breaks; markdown notes render with
* GFM (headings, lists, tables, task lists, strikethrough, autolinks).
*/
function MarkdownNotes({ text, className }) {
	if (!looksLikeMarkdown(text)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("whitespace-pre-wrap", className),
		children: text
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("markdown-notes", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			remarkPlugins: [remarkGfm],
			components: { a: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				...props,
				target: "_blank",
				rel: "noreferrer noopener",
				className: "font-medium text-primary underline underline-offset-2 hover:opacity-80"
			}) },
			children: text
		})
	});
}
//#endregion
export { MarkdownNotes as t };
