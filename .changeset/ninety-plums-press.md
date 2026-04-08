---
"uvo-frontend": patch
---

Added a canonical no-store HTML cache policy to prevent stale website snapshots from being stored or reused by browsers, plus a temporary browser cache purge header for migration safety. Limited the custom /_next/static immutable cache header to production only to avoid stale assets during development. Meant to be temporary for a few weeks.
