# Project instructions

## Libraries and Frameworks

---

- Frontend: React with Next.js (TypeScript).
- Linting/Formatting: Biome, Stylelint.
- UI framework: Radix UI
- Icons: Tabler Icons
- CMS: Directus

## Git & PR hygiene

---

- Use Conventional commit prefixes: feat:, fix:, chore:, refactor:, test:, docs:
- Keep commits small (don't do 10 unrelated things in one commit).
- PRs should be small & focused on a single feature or bug fix. Avoid mixing unrelated changes.

## Coding Standards

---

- Follow Biome and Stylelint rules. Run formatters and linters before committing.
- Structure: Type-based inside `src/` (`components`, `hooks`, `api`, etc.).
- **Error Handling**: Wrap external IO (fetch, API, storage). No silent `catch {}` blocks.

### Prohibited Patterns

---

- Large anonymous utility files (split by responsibility)
- Unbounded recursion or polling without backoff