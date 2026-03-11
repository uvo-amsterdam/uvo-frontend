# Strapi CMS Setup — UvO Amsterdam

This document describes the exact requirements for the Strapi backend codebase that will serve as a Headless CMS for the UvO Amsterdam Next.js frontend (`uvo-frontend`).

---

## Versions

| Requirement | Value |
|---|---|
| Strapi | v5 (latest stable) |
| Node.js | 22 LTS |
| Package manager | npm or yarn (Strapi default) |
| Database (local) | SQLite (zero-config default) |
| Database (production) | PostgreSQL |

Add the following to `package.json`:
```json
"engines": {
  "node": "22.x"
}
```

Add a `.nvmrc` file at the project root containing:
```
22
```

---

## Content Types

### 1. `board-member` — Collection Type

Replaces the hard-coded `BOARD` array in the frontend.

| Field | Type | Notes |
|---|---|---|
| `firstName` | Short text | |
| `lastName` | Short text | |
| `role` | Short text | e.g. "President", "Secretary" |
| `email` | Email | |
| `altEmail` | Email | Optional |

---

### 3. `hero-slide` — Collection Type

Replaces the hard-coded `SLIDES` array in the `HeroSlideshow` component.

| Field | Type | Notes |
|---|---|---|
| `image` | Media (single image) | Uploaded via Strapi media library |
| `alt` | Short text | Alt text for accessibility |
| `order` | Integer | Controls display order |

---

### 4. `membership-fee` — Collection Type

Replaces the hard-coded fee tables on the sign-up page (`COMPETITION_ROWS`, `TRAINING_ONLY_ROWS`, `BEGINNERS_ROWS`).

| Field | Type | Notes |
|---|---|---|
| `category` | Enumeration | `competition`, `training_only`, `beginners` |
| `period` | Short text | e.g. "Whole year (Sep–Jun)" |
| `studentPrice` | Short text | e.g. "€ 235,-" |
| `nonStudentPrice` | Short text | e.g. "€ 355,-" |

---

### 5. `sign-up-settings` — Single Type

Replaces the hard-coded Google Forms URL in `src/constants/forms.ts`.

| Field | Type | Notes |
|---|---|---|
| `googleFormsUrl` | Short text | Embedded Google Form URL |

---

### 6. `team` — Collection Type

For the teams page. Each document represents one team.

| Field | Type | Notes |
|---|---|---|
| `name` | Short text | e.g. "Dames 1", "Heren 2" |
| `image` | Media (single image) | Team photo |
| `players` | Component (repeatable) | See component definition below |

**`player` component fields:**

| Field | Type | Notes |
|---|---|---|
| `name` | Short text | Player's full name |

---

### 7. `training-schedule` — Collection Type

There will be exactly **4 documents** representing every combination of day and week parity. The timeslots for each are fixed:

- **Monday** — 4 timeslots (18:00, 19:20, 20:40, 22:00)
- **Thursday** — 3 timeslots (18:00, 19:20, 20:40)

| Field | Type | Notes |
|---|---|---|
| `day` | Enumeration | `monday`, `thursday` |
| `weekType` | Enumeration | `even`, `odd` |
| `timeslots` | Component (repeatable) | See component definition below |

**`timeslot` component fields:**

| Field | Type | Notes |
|---|---|---|
| `time` | Short text | Fixed value, e.g. "18:00", "19:20", "20:40", "22:00" |
| `description` | Rich text | Which teams/groups train at this slot |

The 4 schedule documents to seed:
1. Monday — Even week
2. Monday — Odd week
3. Thursday — Even week
4. Thursday — Odd week

---

### 8. `committee` — Collection Type

For the committees page (currently under construction in the frontend).

| Field | Type | Notes |
|---|---|---|
| `name` | Short text | |
| `description` | Rich text | |
| `image` | Media (single image) | Optional |

---

## API Configuration

### Authentication
Create a **read-only API token** (type: "Read-only") in Strapi's admin panel under *Settings → API Tokens*. The frontend will use this token for all requests.

### CORS
In `config/middlewares.ts`, ensure the following origins are allowed:
- `http://localhost:3000` (Next.js dev server)
- The production frontend domain when deployed

### Public permissions
All content types listed above should have **find** and **findOne** permissions enabled for the `Public` role (under *Settings → Roles → Public*), since auth is handled via the API token at the server level from Next.js.

---

## Environment Variables

The Strapi project should expose these in its own `.env`:
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
JWT_SECRET=...

# Production only
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

The **Next.js frontend** will consume Strapi via these environment variables (add to `uvo-frontend/.env.local`):
```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<read-only token from Strapi admin>
```

---

## Notes for the Frontend Integration

- All data fetching will be **server-side** using Next.js App Router (`fetch` in Server Components or Route Handlers).
- Use `next: { revalidate: 3600 }` (ISR) on fetch calls for content that changes infrequently (board members, fees, teams, committees, training schedules).
- For the hero slideshow images served from Strapi's media library (`/uploads/...`), the following must be added to `next.config.ts` in the frontend:

```ts
images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '1337',
      pathname: '/uploads/**',
    },
    // add production Strapi hostname here when deploying
  ],
},
```

- The Strapi v5 REST API returns data in the shape `{ data: [...], meta: {...} }`. The frontend integration code should be written against this v5 response shape (not the v4 shape which was different).
