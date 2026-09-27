import test from "node:test";
import assert from "node:assert/strict";
import { looksLikeMarkdown } from "./markdown.ts";

test("detects headings, lists, quotes, and fenced code", () => {
  for (const text of [
    "# Heading",
    "## Day one\nsome text",
    "- lantern\n- temples",
    "* star bullet",
    "1. first\n2. second",
    "1) paren list",
    "> quoted memory",
    "```\ncode block\n```",
  ]) {
    assert.equal(looksLikeMarkdown(text), true, JSON.stringify(text));
  }
});

test("detects emphasis, code, links, images, and tables", () => {
  for (const text of [
    "this is **bold**",
    "so __bold__ too",
    "*quiet* evening",
    "_quiet_ evening",
    "~~cancelled~~",
    "run `npm run dev`",
    "see [the guide](https://example.com)",
    "photo ![shrine](data:image/png;base64,AAA)",
    "| a | b |\n| --- | --- |\n| 1 | 2 |",
  ]) {
    assert.equal(looksLikeMarkdown(text), true, JSON.stringify(text));
  }
});

test("treats plain prose, lists of words, and arithmetic as plain text", () => {
  for (const text of [
    "Lanterns everywhere, magical walk.",
    "Line one\nLine two\nLine three",
    "Budget: 2*3 = 6 per person",
    "snake_case and under_scored words",
    "matched with a*b in the notes",
    "5 stars * rated highly",
    "a - b, c * d",
    "Price ~10 and ~20 yen",
    "got 100% (no markdown)",
    "",
  ]) {
    assert.equal(looksLikeMarkdown(text), false, JSON.stringify(text));
  }
});

test("does not treat bare underscores or hyphenated words as emphasis", () => {
  assert.equal(looksLikeMarkdown("well-known_word here"), false);
  assert.equal(looksLikeMarkdown("foo_bar and foo_bar_2"), false);
});
