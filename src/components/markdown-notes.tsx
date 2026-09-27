import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { looksLikeMarkdown } from "@/lib/markdown";
import { cn } from "@/lib/utils";

/**
 * Notes renderer shared by the journal page and item blocks. Plain notes
 * render verbatim with preserved line breaks; markdown notes render with
 * GFM (headings, lists, tables, task lists, strikethrough, autolinks).
 */
export function MarkdownNotes({ text, className }: { text: string; className?: string }) {
  if (!looksLikeMarkdown(text)) {
    return <p className={cn("whitespace-pre-wrap", className)}>{text}</p>;
  }

  return (
    <div className={cn("markdown-notes", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => (
            <a
              {...props}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
            />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
