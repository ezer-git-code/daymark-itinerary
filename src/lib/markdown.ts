/**
 * Conservative check for whether a note uses markdown syntax. Notes that
 * don't match any pattern render verbatim as plain text, so casual notes
 * (prices, "2*3", snake_case) are never mangled by the markdown renderer.
 */
export function looksLikeMarkdown(text: string): boolean {
  if (!text) return false;

  const patterns: RegExp[] = [
    /^#{1,6}\s+\S/m, // heading: "# Title"
    /^[ \t]*([-*+]|\d+[.)])[ \t]+\S/m, // list item: "- a" / "1. a"
    /^[ \t]*>[ \t]*\S/m, // blockquote: "> quoted"
    /```/, // fenced code
    /\*\*[^*\n]+\*\*/, // bold: **x**
    /__[^_\n]+__/, // bold: __x__
    /~~[^~\n]+~~/, // strikethrough: ~~x~~
    /`[^`\n]+`/, // inline code: `x`
    /!\[[^\]\n]*\]\([^)\s]+\)/, // image: ![alt](src)
    /\[[^\]\n]+\]\([^)\s]+\)/, // link: [text](url)
    /(^|[ \t(])\*[^*\n]+\*(?![*\w])/m, // italic: *x* (not "2*3")
    /(^|[ \t(])_[^_\n]+_(?![\w_])/m, // italic: _x_ (not snake_case)
    /^[ \t]*\|.+\|[ \t]*\n[ \t]*\|[ \t]*:?-+[ \t]*\|/m, // GFM table
  ];

  return patterns.some((pattern) => pattern.test(text));
}
