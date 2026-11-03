---
name: match-vercel-ui-local
description: 'Compare a Vercel or deployed UI with the updated local app. Use when checking production against local, matching a deployed route to local, or investigating visual drift. Treat local as the source of truth unless the user says otherwise.'
argument-hint: 'Route or feature to compare, plus the local and deployed URLs if available'
user-invocable: true
disable-model-invocation: false
---

# Match Deployed UI to Updated Local View

Compare a Vercel or deployed frontend with its updated local counterpart. The local app is canonical: use it to identify what the deployed app should look like, and never regress local code just to reproduce an older deployed state unless the user explicitly changes that priority.

## When to Use

Use this skill when:

- a Vercel/deployed page looks different from the local host version;
- a user asks to "match Vercel UI", "make local look like production", or compare a deployed route with localhost;
- a route has visual regressions involving spacing, typography, colors, borders, responsive layout, or controls;
- the target behavior is visible in a shared browser page or can be reached from a supplied URL.
- the local app has newer changes and the deployed app needs to be checked against them.

## Procedure

1. **Establish the comparison.** Identify the exact route, local URL, and deployed/Vercel URL. Reuse shared browser pages and user screenshots when available. If one URL is missing, inspect project routes and find the closest equivalent; ask only if the missing reference blocks comparison.
2. **Confirm local is canonical.** Load the local route and inspect the owning source, recent changes, repository instructions, and design conventions. Verify that local renders the updated intended state before using it as the reference. Do not infer the desired design from a potentially stale deployment.
3. **Capture equivalent states.** Open the same route at matching desktop and mobile sizes on both local and deployed. Keep data, viewport, route state, and auth conditions as comparable as possible. Record hierarchy, text, controls, layout, colors, loading/empty/error states, overflow, and console/page errors. Use visual inspection, not status codes alone.
4. **Classify each difference.** Decide whether it is a UI regression, stale deployment, data/state mismatch, feature flag/auth difference, runtime error, or expected environment variation. Compare build/version evidence when useful. A deployed difference does not by itself justify changing local code.
5. **Choose the correct owner.** For a stale deployment, fix the source/build/deployment path; preserve the newer local implementation. For a real local defect, trace to the component or style token that controls it. Treat deployed-only behavior as stale by default; note evidence of an intentional release difference, but do not copy it into local unless the user changes the source-of-truth instruction.
6. **Make focused local changes only when needed.** Preserve local behavior, APIs, accessibility, and design-system conventions. Avoid copying generated output or duplicating a production snapshot. Do not deploy unless the user requests deployment.
7. **Validate immediately and end to end.** Run the narrowest check after the first edit. Then verify local rendering and, when feasible, the production build on desktop and mobile. Check interactions, visible content, console/page errors, and overflow; do not claim deployed parity until the deployed version has actually been checked.
8. **Report the comparison.** State which side is newer, whether the deployment matches local, any local fixes made, exact validation performed, and limitations such as an inaccessible deployment or unverified redeploy.

## Decision Points

- **Deployed view unavailable:** compare the user screenshot with local, or report that deployed parity could not be verified. Do not invent deployed details.
- **Local view is correct but deployment is stale:** keep local unchanged; investigate the build/deployment source and report the version gap. Do not deploy without authorization.
- **Data or auth differs:** distinguish content/state variation from visual drift. Do not alter layout to compensate for mismatched data; document the assumption.
- **Possible intentional deployed-only behavior:** keep local as the expected result, report the evidence, and ask only before taking an action that would alter deployment scope or reverse the user's local-first instruction.
- **Only mobile differs:** adjust responsive styles at the owning component and recheck desktop.
- **Runtime/build error:** resolve it before judging visual parity; an error or blank screen is not a valid comparison.
- **Unrelated dirty changes:** preserve them and limit edits to the requested surface.

## Completion Checklist

- [ ] The exact route and local/deployed versions were identified.
- [ ] Local was verified as the intended, updated reference.
- [ ] Differences were separated into UI, data/state, runtime, and deployment causes.
- [ ] Any code edit targeted the owning source, not generated output.
- [ ] Existing interactions and accessibility behavior remain intact.
- [ ] Local desktop and mobile rendering were checked; deployed rendering was checked when accessible.
- [ ] No new console/page errors or horizontal overflow appeared.
- [ ] Relevant typecheck, lint, tests, or build validation passed.
- [ ] The summary says whether deployment was actually verified or remains stale/unverified.
