# Directus CMS Setup — UvO Amsterdam

This document describes the exact requirements for the Directus backend that serves as a Headless CMS for the UvO Amsterdam Next.js frontend (`uvo-frontend`).

---

## Versions

| Requirement | Value |
|---|---|
| Directus | v11 (latest stable) |
| Node.js | 22 LTS |
| Database (local) | SQLite (zero-config default) |
| Database (production) | PostgreSQL |

---

## Collections

### 1. `Team_Compositions` — Collection

Each document represents one player entry in a team.

| Field | Type | Notes |
|---|---|---|
| `id` | Integer | Auto-incremented primary key |
| `Team` | String | Team name, e.g. `"Dames 1"`, `"Heren 2"` |
| `Name` | String | Player's full name |
| `Position` | String | Player's position, e.g. `"Setter"`, `"Libero"` |
| `user_created` | UUID | Directus system field |
| `user_updated` | UUID | Directus system field |
| `date_updated` | Timestamp | Directus system field |

---

### 2. Training Schedule Collections

There are **4 collections** representing every combination of day and week parity. Each document in a collection represents one timeslot.

| Collection | Description |
|---|---|
| `Monday_Even_Schedule` | Monday timeslots on even weeks |
| `Monday_Uneven_Schedule` | Monday timeslots on uneven weeks |
| `Thursday_Even_Schedule` | Thursday timeslots on even weeks |
| `Thursday_Uneven_Schedule` | Thursday timeslots on uneven weeks |

Each collection shares the same field structure:

| Field | Type | Notes |
|---|---|---|
| `id` | Integer | Auto-incremented primary key |
| `Time` | String | Timeslot start time, e.g. `"18:00"`, `"19:20"`, `"20:40"`, `"22:00"` |
| `Field_1` | String (nullable) | Description for field/court 1 |
| `Field_2` | String (nullable) | Description for field/court 2 |
| `Field_3` | String (nullable) | Description for field/court 3 |
| `Field_4` | String (nullable) | Description for field/court 4 (Monday only) |

Fixed timeslots to seed:
- **Monday** — 4 timeslots: `18:00`, `19:20`, `20:40`, `22:00`
- **Thursday** — 3 timeslots: `18:00`, `19:20`, `20:40`

---

## Authentication

Create a **static token** in Directus under *Settings → Access Tokens*. The frontend uses this token for all server-side requests via the `@directus/sdk` `staticToken` authenticator.

Keep this token secret — it is only used server-side and must never be exposed to the browser.

---

## Environment Variables

Add the following to `uvo-frontend/.env.local`:

```
# Used by server-side Directus client (src/lib/server/directus.ts)
DIRECTUS_URL=http://localhost:8055
DIRECTUS_TOKEN=<static token from Directus admin>

# Used by the public Directus client (src/lib/directus.ts) — optional, falls back to http://localhost:8055
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055

# Used to authenticate incoming Directus webhook calls
DIRECTUS_WEBHOOK_SECRET=<random secret string>
```

> **Note:** `DIRECTUS_URL` is server-only (no `NEXT_PUBLIC_` prefix) and must not be exposed to the browser.

---

## Webhook Configuration

The frontend exposes a webhook endpoint at `POST /api/webhook/directus?secret=<DIRECTUS_WEBHOOK_SECRET>`.

Configure Directus to call this endpoint on collection change events. The webhook invalidates the relevant Next.js static cache via `revalidatePath`:

| Directus Collection(s) | Revalidated Path |
|---|---|
| `Monday_Even_Schedule`, `Monday_Uneven_Schedule`, `Thursday_Even_Schedule`, `Thursday_Uneven_Schedule` | `/api/training-schedules` |
| `Team_Compositions` | `/api/team-compositions` |
| Any other collection | `/` (full layout cache) |

The expected webhook payload shape:
```json
{
  "collection": "Team_Compositions",
  "keys": [1, 2],
  "event": "items.update"
}
```

---

## Notes for the Frontend Integration

- All Directus data fetching is **server-side only** using the `@directus/sdk` `readItems` method in Next.js App Router Route Handlers (`src/app/api/`).
- Route handlers are set to `export const dynamic = 'force-static'` so responses are statically cached and only invalidated via the webhook.
- The server-side Directus client is in `src/lib/server/directus.ts` and must not be imported in client components.
- A public Directus client is available in `src/lib/directus.ts` for optional client-side use; it falls back to `http://localhost:8055` if `NEXT_PUBLIC_DIRECTUS_URL` is not set.
- The `Team_Compositions` collection schema is typed via `src/interfaces/team-composition.interface.ts`.
- The training schedule response shape is typed via `src/interfaces/training-schedule.interface.ts`.
