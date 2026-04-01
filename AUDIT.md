# Repository Audit: Redundancy & Performance Issues

> **Scope:** Full codebase audit of the `joshjones7654` Next.js application.  
> **Goal:** Identify redundancy and performance issues only. No code changes are proposed.  
> **Date:** 2026-03-20

---

## A. Redundancy

---

### A1. Empty stub files shadow real state-component implementations

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Confidence** | High |
| **Files** | `components/music-section/components/LoadingSkeleton.tsx` (empty) <br> `components/music-section/components/EmptyState.tsx` (empty) <br> `components/music-section/components/ErrorState.tsx` (empty) |
| **Real implementations** | `components/music-section/components/states/LoadingSkeleton.tsx` <br> `components/music-section/components/states/EmptyState.tsx` <br> `components/music-section/components/states/ErrorState.tsx` |

**Why redundant:** The three top-level files are completely empty (zero bytes). The actual implementations live in the `states/` subdirectory and are imported correctly. The empty files serve no purpose; they exist as left-over stubs from a refactoring move and create a confusing shadow in the directory listing.

**Expected impact:** No runtime effect, but the extra files mislead developers looking for component source and add noise to IDE search results.

**Suggested direction:** Delete the three empty stub files.

---

### A2. Near-identical quota-handling and in-memory caching logic duplicated across two API routes

| Field | Value |
|-------|-------|
| **Severity** | High |
| **Confidence** | High |
| **Files** | `app/api/youtube/latest/route.ts` (lines 11–14, 63–103, 140–163) <br> `app/api/youtube/games/route.ts` (lines 10–13, 43–78, 83–103) |

**Why redundant:** Both routes independently define:
- The same constants: `QUOTA_COOLDOWN_MS = 15 * 60 * 1000` and `FALLBACK_MAX_AGE_MS = 3 * 60 * 60 * 1000`.
- Identical `isQuotaExceededError(error)` functions (line-for-line identical).
- Nearly identical `jsonOk()` helpers that return a `200` response with the same `Cache-Control` header.
- Near-identical fallback-retrieval logic that iterates the module-level `Map` for a fresh entry within `FALLBACK_MAX_AGE_MS`.
- The same three-path error flow: quota exceeded → fallback → upstream error → fallback → raw 500.

Any change to the quota or caching strategy must be made in two places.

**Expected impact:** Maintenance burden; risk of divergence when one route is updated but not the other (already slightly diverged: `latest` uses a per-cache-key lookup while `games` uses a per-handle lookup).

**Suggested direction:** Extract a shared module (e.g., `lib/api/youtube-quota-cache.ts`) containing the constants, `isQuotaExceededError`, `jsonOk`-style response builder, and a generic `QuotaCache<T>` class or factory, then have both routes consume it.

---

### A3. Identical localStorage cache helpers duplicated in two data-fetching hooks

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Confidence** | High |
| **Files** | `components/youtube-section/hooks/useYoutubePagination.ts` (lines 12–43) <br> `components/games-josh-plays/hooks/useGamesJoshPlaysData.ts` (lines 7–34) |

**Why redundant:** Both hooks independently declare:
- `const CACHE_KEY = '...'`
- `const CACHE_MAX_AGE_MS = 3 * 60 * 60 * 1000`
- `function loadFromCache()` — parses JSON, checks `cachedAt`, returns `null` on expiry or parse failure.
- `function saveToCache(data)` — merges `cachedAt: Date.now()` and writes to `localStorage`.

The logic is structurally identical; only the key name and the shape of the cached type differ.

**Expected impact:** Any cache-staleness bug or `localStorage` edge case must be fixed twice. The 3-hour TTL is currently hard-coded in both places independently.

**Suggested direction:** Extract a generic `createLocalStorageCache<T>(key: string, maxAgeMs: number)` factory to `lib/browser/local-storage-cache.ts` and import it from both hooks.

---

### A4. `gsap.registerPlugin(ScrollTrigger)` called in 9 separate animation hooks

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | High |
| **Files** | `components/the-better-day/hooks/useTheBetterDayAnimations.ts:9` <br> `components/music-section/hooks/useMusicSectionAnimations.ts:9` <br> `components/games-josh-plays/hooks/useGridAnimation.ts:9` <br> `components/games-josh-plays/hooks/useHeaderAnimation.ts:8` <br> `components/games-josh-plays/hooks/useSectionAnimation.ts:8` <br> `components/about-joshua/hooks/useAboutJoshuaAnimations.ts:8` <br> `components/footer/hooks/useFooterAnimations.ts:8` <br> `components/youtube-section/hooks/useYoutubeSectionAnimations.ts:7` <br> `components/parallax-hero/hooks/useParallaxHeroAnimations.ts:14` |

**Why redundant:** GSAP only registers a plugin once (idempotent), so repeated registrations are harmless but wasteful boilerplate. Each new animation file must remember to add the call, and forgetting causes a subtle runtime failure.

**Expected impact:** Minor — adds noise and a footgun for new contributors.

**Suggested direction:** Move the single `gsap.registerPlugin(ScrollTrigger)` call to `app/layout.tsx` (or a dedicated `lib/gsap/register.ts` module imported there) and remove it from all nine hook files.

---

### A5. Three separate implementations of "format a large integer as K/M"

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Confidence** | High |
| **Files** | `components/music-section/utils/formatters.ts` (lines 1–7): `formatPlayCount()` <br> `components/live-banner/utils/formatters.ts` (lines 1–12): `formatViewerCount()` <br> `lib/youtube/youtube.utils.ts` (lines 37–49): `formatViews()` |

**Why redundant:** All three format a numeric value into a human-readable short string using the same K/M bucketing:
- `formatPlayCount`: handles only ≥1 000 → `"1.0k"` (lowercase k, no millions, no trailing-zero trim).
- `formatViewerCount`: handles only ≥1 000 → `"1K"` (uppercase K, no millions, manual `.replace(/\.0$/, '')`).
- `formatViews`: handles ≥1 000 000 → `"1M"` and ≥1 000 → `"1K"` with a shared `trimTrailingZero` helper — the most complete implementation.

The inconsistency means play counts display as `"1.0k"` while view counts display as `"1K"`.

**Expected impact:** UI inconsistency; maintenance burden when formatting rules change.

**Suggested direction:** Use `formatViews` from `lib/youtube/youtube.utils.ts` (possibly widening its input type to `number | string`) as the single source of truth, and delete the two per-component duplicates.

---

### A6. Duplicate fetch-and-parse pattern across two utility files

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | High |
| **Files** | `components/youtube-section/utils/fetchYoutubePage.ts` (lines 3–26) <br> `components/games-josh-plays/utils/fetchGamesJoshPlays.ts` (lines 3–12) |

**Why redundant:** Both utilities follow the same three-step pattern:
1. `await fetch(url, { method: 'GET' })`
2. `await response.json() as ExpectedType | { message?: string }`
3. `if (!response.ok) throw new Error(payload.message ?? 'fallback message')`

The only difference is the URL and the return type.

**Expected impact:** Minor — two small files, but any HTTP error-handling improvement (e.g., including the status code in the error) must be applied in two places.

**Suggested direction:** Extract a typed `fetchJson<T>(url: string, fallbackMessage: string): Promise<T>` helper to `lib/api/fetch-json.ts`.

---

### A7. `useLoadingScreen` hook contains an empty `useEffect` body

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | High |
| **File** | `components/loading-screen/hooks/useLoadingScreen.ts` (lines 7–11) |

**Why redundant:** The `useEffect` block contains only a Spanish comment explaining intent but zero implementation. The hook is functionally equivalent to a plain `useState` call. The extra abstraction layer (hook file + export) adds indirection for callers without benefit.

**Expected impact:** Very low — one extra file and one extra hook invocation per mount of the loading screen.

**Suggested direction:** Either implement the originally-intended effect or inline the `useState`/`handleComplete` pattern directly into `LoadingScreenWrapper`.

---

### A8. Animation hooks share an identical structural pattern across 9+ files

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | Medium |
| **Files** | All `use*Animations.ts` hooks under `components/*/hooks/` |

**Why redundant:** Every animation hook follows the same skeleton:
1. Accept a set of `RefObject` parameters.
2. Call `usePrefersReducedMotion()`.
3. Wrap everything in a single `useEffect` that creates a `gsap.context()`, sets up ScrollTrigger timelines, and returns `context.revert()`.

The structural boilerplate (context creation, revert, reduced-motion guard) is copy-pasted into every hook; only the animation specifics differ.

**Expected impact:** Low runtime impact, but high maintenance cost when the animation lifecycle strategy changes.

**Suggested direction:** Introduce a `useGsapContext(setupFn, deps)` utility hook that owns the `gsap.context` + `revert` lifecycle, leaving each animation hook to supply only its setup callback.

---

## B. Performance

---

### B1. Multiple `useState` calls for a single logical data unit cause excess re-renders

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Confidence** | High |
| **File** | `components/youtube-section/hooks/useYoutubePagination.ts` (lines 45–58) |

**Why inefficient:** The hook declares 8–9 independent `useState` variables that are always updated together during a page fetch (`videos`, `totalVideoCount`, `isLoading`, `isPaging`, `fetchError`, `degradedNotice`, `tokenStack`, `currentIndex`, `nextToken`). Each individual `setState` call schedules a separate render. React will batch synchronous updates in the same event handler (React 18+), but async update sequences (e.g., sequential `setIsLoading(false)`, `setVideos(data)`, `setNextToken(token)`) still trigger multiple render passes.

**Expected impact:** Extra renders during pagination transitions, possibly visible as brief intermediate UI states.

**Suggested direction:** Consolidate into a single state object (updated with one `setState` call per transition) or a `useReducer` with explicit action types.

---

### B2. `useLiveStreamData` uses three independent `useEffect` calls that coordinate shared state

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Confidence** | High |
| **File** | `components/live-banner/hooks/useLiveStreamData.ts` (lines 56–112) |

**Why inefficient:**
- **Effect 1** (lines 56–91): Manages a `setInterval` poll and a `visibilitychange` listener; depends on `checkLiveStatus` callback.
- **Effect 2** (lines 93–101): Manages a separate `setInterval` for elapsed-time display; depends on `data?.isLive` and `data?.startedAt`.
- **Effect 3** (lines 103–112): Attaches a `keydown` listener for Escape-to-dismiss.

The first effect depends on `checkLiveStatus` (a `useCallback`). If anything causes `checkLiveStatus` to change identity (e.g., a dependency missed in the `useCallback` array), the entire polling loop tears down and re-establishes — potentially starting a new `setInterval` before the old cleanup fires. Additionally, the module-level mutable variables (`inFlightLiveRequest`, `lastLivePayload`, `lastFetchAt`) leak across component remounts.

**Expected impact:** Potential duplicate polling intervals on rapid mount/unmount cycles; stale closures if `checkLiveStatus` identity changes.

**Suggested direction:** Consolidate the polling and elapsed-time intervals into a single effect; consider moving module-level request state into a singleton or React context to avoid cross-mount leakage.

---

### B3. `barRefs.current.filter(Boolean)` creates a new array on every animation frame

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Confidence** | High |
| **File** | `components/music-section/MusicSection.tsx` (line 26 ref declaration) → `components/music-section/hooks/useMusicSectionAnimations.ts` (line 77 usage) |

**Why inefficient:** `barRefs.current.filter(Boolean)` allocates a new array every time the animation effect's setup callback runs. Because `barRefs` is a `useRef`, React will not skip the effect on re-renders even when the refs haven't changed; the filter runs unconditionally. The same pattern exists for `cardRefs` in `YoutubeSection.tsx` and `chapterRefs` in `AboutJoshuaSection.tsx`.

**Expected impact:** Minor per-render garbage; could cause jank during rapid resizes if animations are frequently rebuilt.

**Suggested direction:** Cache the filtered array with `useMemo` keyed on the ref array length, or filter once inside the effect and reuse the local variable.

---

### B4. GSAP animation context reverts and recreates all animations when `isMobile` changes

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Confidence** | High |
| **Files** | All animation hooks that include `isMobile` or `isTablet` in the `useEffect` dependency array |

**Why inefficient:** When the viewport is resized across a breakpoint, `useResponsiveSection` updates `isMobile`, which triggers a full `context.revert()` followed by recreation of every ScrollTrigger and timeline. This involves:
- Killing all active GSAP tweens.
- Recomputing offsets for each animated element.
- Re-registering ScrollTrigger instances.

This is expensive and can cause visible animation artifacts (elements snapping back then re-animating) on window resize.

**Expected impact:** Noticeable jank on resize or orientation change on mobile/tablet; elevated CPU usage during resize events.

**Suggested direction:** Separate the responsive branching from the ScrollTrigger setup. Use `ScrollTrigger.refresh()` on resize instead of full context reverting, and handle `isMobile`-specific values inside the animation callbacks using `gsap.matchMedia()`.

---

### B5. `usePrefersReducedMotion` creates a `matchMedia` listener in every animation hook simultaneously

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | High |
| **Files** | Called 31 times across the codebase; 9 simultaneous instances on the main page |

**Why inefficient:** Each call to `usePrefersReducedMotion` creates an independent `matchMedia` subscription and independently holds a piece of state. On the main page, 9+ components/hooks each independently subscribe to the same `(prefers-reduced-motion: reduce)` media query. A single user preference change fires 9 separate state updates, each potentially triggering a re-render of its owner.

**Expected impact:** Low practical impact (media query changes are rare), but unnecessary resource use.

**Suggested direction:** Lift the single `matchMedia` subscription to a React context provider or a global singleton, so all consumers share one subscription and one state update.

---

### B6. Game-detection loop performs `await` in a nested inner loop (potential sequential awaits)

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | Medium |
| **File** | `lib/youtube/youtube-games.service.ts` (lines 210–265) |

**Why inefficient:** The outer loop iterates playlist items; the inner loop iterates game candidates. Inside the inner loop, `catalogResolver.resolve()` is called with `await`. If the resolver performs any I/O (network, disk, or DB lookup) per candidate, the sequential awaits within the nested loop serialize all lookups for every item × candidate combination rather than parallelizing them. Even if `resolve()` only hits an in-memory Map, the `await` creates microtask overhead on every call.

**Expected impact:** Proportional to catalog resolver I/O cost — negligible if it is purely in-memory, potentially significant if it makes network calls.

**Suggested direction:** Confirm whether `catalogResolver.resolve()` is purely synchronous. If so, remove the `await`. If not, batch or parallelize lookups across candidates before entering the inner loop.

---

### B7. Game data cache files committed to source control; parsed on every server start

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Confidence** | High |
| **Files** | `data/game-catalog-cache.json` <br> `data/game-catalog-cache.bak.json` <br> `data/games-scan-state.json` <br> `data/games-scan-state.bak.json` |

**Why inefficient / poor practice:** These are runtime-generated artefacts committed alongside source code. They are re-read and parsed into memory on every server startup. `.bak` variants exist alongside the live files, indicating a manual rotation strategy, which is fragile. Storing mutable runtime state in source control prevents stateless deployments and means different server instances may serve different (stale) data depending on which code revision is deployed.

**Expected impact:** Stale game data after deployment; confusing diffs in PRs; breaks in multi-instance deployments where each instance reads its own committed snapshot.

**Suggested direction:** Add `data/*.json` to `.gitignore`. Generate or seed the cache at build time (e.g., a `prebuild` script), or store it externally (object storage, key-value store).

---

### B8. Module-level in-memory caches in API routes are not shared across server instances

| Field | Value |
|-------|-------|
| **Severity** | Medium |
| **Confidence** | High |
| **Files** | `app/api/youtube/latest/route.ts` (lines 14–15) <br> `app/api/youtube/games/route.ts` (lines 13–14) |

**Why inefficient:** `latestCache`, `gamesCache`, and `quotaCooldownByHandle` are module-level `Map` objects. In a multi-instance or serverless deployment (Vercel Edge, multiple Node workers) each instance holds its own independent cache. This means:
- YouTube quota cooldowns are not coordinated: one instance may block while another continues making API calls.
- Fallback data may be absent on a fresh cold-start instance even when warm instances have cached data.
- Cache warming under load is multiplied by the number of instances.

**Expected impact:** Excess YouTube API quota consumption; cold-start latency; users on different instances may see inconsistent degraded/non-degraded states.

**Suggested direction:** Use a shared cache layer (e.g., Redis, Upstash, Vercel KV) for quota cooldown state and fallback payloads, or rely on Next.js `unstable_cache` / `fetch` cache for server-side deduplication.

---

## C. Low-Confidence Observations

---

### C1. `useYoutubePagination` `tokenStack` may grow unboundedly

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | Medium |
| **File** | `components/youtube-section/hooks/useYoutubePagination.ts` |

**Observation:** The `tokenStack` state array accumulates a page token for every page visited. If a user pages forward many times and the array is never trimmed, it holds the entire navigation history in memory. For typical channel sizes this is harmless (few dozen tokens), but there is no eviction strategy. May be intentional to support backward pagination.

---

### C2. `shimmer` CSS keyframe animation defined inline per `LoadingSkeleton` render

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | Medium |
| **File** | `components/music-section/components/states/LoadingSkeleton.tsx` |

**Observation:** The `@keyframes shimmer` rule is injected via a `<style>` tag inside the component JSX. In React this re-creates the style element on every render and adds a rule to the document on every mount. A global CSS class or a Tailwind animation utility would be more efficient and consistent.

---

### C3. `useResponsiveSection` hook may trigger render on every pixel of window resize

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | Medium |
| **File** | `hooks/useResponsiveSection.ts` |

**Observation:** If `useResponsiveSection` attaches a raw `resize` event listener and updates state on every event, all 10+ consuming components will re-render on each pixel of a drag-resize. The `matchMedia`-based approach (which fires only on breakpoint crossings) would be more efficient. This depends on the implementation; if it already uses `matchMedia` or a debounced listener the concern is moot.

---

### C4. `useSiteMenuAnimations` accepts 9 `RefObject` parameters

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | Medium |
| **File** | `components/site-menu/hooks/useSiteMenuAnimations.ts` |

**Observation:** Passing 9 individual refs as function parameters is a design smell. It tightly couples the hook to one specific component layout and makes the hook difficult to test or reuse. This may be intentional given the site-menu is a unique singleton component, but it warrants review if the menu structure changes.

---

### C5. `.idea/` directory tracked in source control

| Field | Value |
|-------|-------|
| **Severity** | Low |
| **Confidence** | High |
| **File** | `.idea/` (root) |

**Observation:** The JetBrains IDE settings directory is committed. This is not a performance or redundancy issue in the runtime sense, but it exposes IDE-specific configuration (file associations, run configs, inspections) to all contributors regardless of their tooling. Should be added to `.gitignore`.

---

## Top 5 Highest-Value Issues

| # | Issue | Effort | ROI |
|---|-------|--------|-----|
| 1 | **A2 — Deduplicate API route quota/cache logic** | ~2 h | High — eliminates ongoing divergence risk in production API paths |
| 2 | **A3 — Extract shared `localStorage` cache utility** | ~1.5 h | High — single source of truth for client-side cache TTL and error handling |
| 3 | **A5 — Consolidate the three number-formatting functions** | ~30 min | High — fixes UI inconsistency (`"1.0k"` vs `"1K"`) with minimal effort |
| 4 | **B7 — Stop committing generated cache JSON files** | ~15 min | High — enables stateless deployments; eliminates stale data surprises |
| 5 | **B8 — Move quota/fallback caches to a shared store** | ~3 h | High — prevents excess YouTube API quota burn in multi-instance deployments |

---

## Repeated Patterns Across Multiple Files

| Pattern | Count | Locations |
|---------|-------|-----------|
| `gsap.registerPlugin(ScrollTrigger)` at module scope | 9 | All `use*Animations.ts` hooks |
| `useEffect → gsap.context → ScrollTrigger → return context.revert()` | 9+ | All animation hooks |
| `usePrefersReducedMotion()` called independently | 31 | Every animated component |
| `QUOTA_COOLDOWN_MS` / `FALLBACK_MAX_AGE_MS` constants | 2 | Both YouTube API routes |
| `isQuotaExceededError()` function | 2 | Both YouTube API routes |
| `loadFromCache` / `saveToCache` helpers | 2 | `useYoutubePagination`, `useGamesJoshPlaysData` |
| `fetch → json → !response.ok → throw` wrapper | 2 | `fetchYoutubePage`, `fetchGamesJoshPlays` |
| `{ isMobile, isTablet } = useResponsiveSection()` | 10+ | All major section components |

---

## Architectural Summary

**Main redundancy smell — Copy-paste instead of shared utilities.**  
The codebase consistently solves the same sub-problems (number formatting, localStorage caching, fetch error handling, GSAP plugin registration) by duplicating code rather than extracting shared modules. The `lib/` directory exists and is the right home for these utilities, but it is underutilised.

**Main performance smell — Distributed, non-coordinated state across hooks and API routes.**  
Multiple hooks independently manage overlapping concerns (media queries, localStorage, polling intervals), and multiple API routes manage independent in-memory caches that cannot be shared across server instances. Lifting this shared state into contexts or external stores would reduce both redundancy and per-render overhead.

**Structural strength.**  
The per-section component organisation (`components/<section>/hooks/`, `/utils/`, `/types/`) is consistent and aids navigation. The error-boundary / degraded-mode pattern in the API routes is well-designed. Both are worth preserving in any refactoring effort.
