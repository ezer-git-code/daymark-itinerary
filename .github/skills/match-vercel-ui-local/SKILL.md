---
name: match-vercel-ui-local
description: 'Match a Vercel or deployed UI to the local host view. Use when comparing production and local frontend routes, reproducing visual differences, aligning layout or styling, or validating that a local UI change matches the deployed app.'
argument-hint: 'Route or feature to compare, plus the local and deployed URLs if available'
user-invocable: true
disable-model-invocation: false
---

# Match Vercel UI to Local View

Align a local frontend route with its Vercel or deployed counterpart while preserving behavior, data contracts, and the existing design system.

## When to Use

Use this skill when:

- a Vercel/deployed page looks different from the local host version;
- a user asks to "match Vercel UI", "make local look like production", or compare a deployed route with localhost;
- a route has visual regressions involving spacing, typography, colors, borders, responsive layout, or controls;
- the target behavior is visible in a shared browser page or can be reached from a supplied URL.

## Procedure

1. **Establish the comparison.** Identify the exact route, the local URL, and the deployed/Vercel URL. If only one URL is available, inspect the current workspace and use the closest equivalent route. Do not invent a visual target when neither side is accessible; ask for the missing reference only when it blocks a meaningful comparison.
2. **Check the repository contract.** Read the project instructions, package scripts, and the route/component that owns the visible behavior. Note the existing design tokens, UI primitives, responsive breakpoints, and any local data or auth requirements.
3. **Capture both states.** Open the same route at matching desktop and mobile viewport sizes. Record visible text, hierarchy, controls, major dimensions, spacing, colors, borders, loading/empty/error states, and horizontal overflow. Use screenshots or browser inspection when available; do not rely on HTML status alone.
4. **Separate visual from behavioral differences.** Confirm whether the mismatch comes from CSS/layout, different data, route state, feature flags, auth, server rendering, or a runtime error. Reproduce the difference locally before editing. Prefer the smallest falsifiable hypothesis, such as "the local route still uses the old card wrapper".
5. **Trace to the owning abstraction.** If the route only forwards content, step to the nearest component or style token that computes the mismatched layout. Avoid duplicating a deployed snapshot or editing generated build output.
6. **Make the smallest focused edit.** Preserve public APIs, existing interaction behavior, accessibility labels, and local design conventions. Reuse existing UI primitives and tokens. Keep desktop and mobile behavior explicit; do not fix one viewport by breaking the other.
7. **Run focused validation immediately.** After the first edit, run the narrowest available check for the touched slice: a route/browser check, targeted test, typecheck, or lint. Repair local failures before making unrelated changes.
8. **Validate the full delivery path.** Run the relevant production build, then inspect the built route if the project provides a preview command. Recheck both desktop and mobile, including console/page errors, visible content, and horizontal overflow. Confirm that the result matches the target in structure and visual hierarchy, not merely that it returns HTTP 200.
9. **Report the result.** Summarize the changed files, the visual/behavioral differences corrected, and the exact validation commands and outcomes. Mention any target-side limitation, unavailable deployed route, or residual visual uncertainty.

## Decision Points

- **Deployed view unavailable:** use the user-provided screenshot or browser reference when available; otherwise make a best-effort comparison from the local route, project conventions, and any existing production artifacts. Ask for a URL or screenshot only when the missing reference makes the requested visual decision genuinely ambiguous.
- **Data differs but structure matches:** do not change layout code to compensate for fixture or auth differences. Trace the data path and state the assumption.
- **Local view is correct but Vercel is stale:** verify the production build/deployment source and report deployment freshness rather than changing UI code.
- **Only mobile differs:** adjust responsive classes or constraints at the owning component and validate desktop again.
- **Runtime or build error:** fix the error before judging visual parity; a blank page is not a valid comparison.
- **Unrelated dirty changes:** preserve them and limit edits to the requested UI surface.

## Completion Checklist

- [ ] The exact route and comparison target were identified.
- [ ] The mismatch was reproduced or clearly isolated to a known environment difference.
- [ ] The owning component or style token was edited, not generated output.
- [ ] Existing interactions and accessibility behavior remain intact.
- [ ] Desktop and mobile rendering were checked.
- [ ] No new console/page errors or horizontal overflow appeared.
- [ ] Typecheck, lint, test, or build validation was run as available.
- [ ] The final summary names residual assumptions or unavailable evidence.
