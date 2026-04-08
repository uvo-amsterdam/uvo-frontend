---
"uvo-frontend": patch
---

Added a canonical no-store HTML cache policy and temporary browser cache purge header on the homepage only to prevent stale website snapshots during migration while reducing repeated cache clears on other routes. Limited the custom /_next/static immutable cache header to production only to avoid stale assets during development. Meant to be temporary for a few weeks.
