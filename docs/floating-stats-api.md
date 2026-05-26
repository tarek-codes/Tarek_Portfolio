# Floating Stats API Usage Guide

This document explains how the floating competitive-programming stats panel loads and displays LeetCode data, including source APIs, fallbacks, and extension points.

## Feature Overview

UI component: `components/features/stats/FloatingStats.tsx`

The floating stats panel shows LeetCode solved count and global ranking.

The panel is opened from a floating action button and fetches data lazily (on first open).

## Data Sources

The Codeforces integration has been removed from the project. The floating panel now focuses solely on LeetCode.

### LeetCode

Helper: `lib/api/leetcode.ts`

Used function:

- `getLeetCodeStats(username)`

External endpoint called by helper:

- `https://alfa-leetcode-api.onrender.com/<username>/solved`

Return contract used by UI:

```ts
export interface LeetCodeStats {
  totalSolved: number;
  ranking: number;
}
```

Failure behavior:

- Uses internal fallback data (`FALLBACK_DATA`)
- Returns stable shape for UI rendering

## Runtime Flow in FloatingStats

1. User clicks floating button.
2. Panel opens.
3. Component fetches LeetCode data when the panel is opened.
4. Data is stored in local state.
5. Optional guards prevent repeated fetches during the same session.

Key states:

- `isExpanded`: panel visibility
- `loading`: fetch status
- `hasFetched`: one-time fetch guard
- `codeforcesData`, `leetcodeData`: resolved stats payloads

## Performance Notes

Current implementation optimizations:

- Deferred fetch (only after panel open)
- Mobile-friendly motion simplification
- Safe fallbacks for API errors to avoid UI breakage

Potential future optimizations:

- Add server route proxy with centralized cache and rate-limit control
- Persist latest successful stats in local/session storage
- Show last-updated timestamp from cached payload

## Configuration Source

Handles and profile links are read from:

- `lib/constants.ts` (`PERSONAL_INFO`)

Used keys:

- `leetcodeHandle`
- `leetcodeUrl`

## Error Handling Model

The API helper layer is intentionally fault-tolerant:

- Never throws into UI path for expected network/API issues
- Logs errors for diagnostics
- Returns nullable/fallback values

This keeps the floating panel responsive even during third-party outages.

## API Usage Example

Using helpers directly in another component:

```ts
import { getLeetCodeStats } from "@/lib/api/leetcode";

const lc = await getLeetCodeStats("SharifdotG");
```

Always handle nullable/fallback responses in UI.

## Related Files

- `components/features/stats/FloatingStats.tsx`
- `lib/api/codeforces.ts`
- `lib/api/leetcode.ts`
- `lib/constants.ts`
