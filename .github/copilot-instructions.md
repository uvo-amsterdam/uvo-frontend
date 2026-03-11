# Project Coding Instructions

## Libraries & Frameworks
- Frontend: React with Next.js (TypeScript)
- Linting/Formatting: Biome, Stylelint
- UI: Radix UI
- Icons: Tabler Icons
- CMS: Directus

## Code Style & Formatting
- Run Biome and Stylelint before committing. Fix all errors/warnings.
- Use clear, descriptive names for files, variables, and functions.
- Prefer named exports over default exports.
- Use TypeScript types and interfaces for all props, API responses, and state.
- Keep code DRY: avoid duplication, extract reusable logic into hooks/components.

## Project Structure
- Organize by type in `src/`:
  - `components/`: UI components
  - `hooks/`: custom hooks
  - `api/`: API logic
  - `constants/`: static values
  - `interfaces/`: TypeScript types/interfaces
- Avoid large utility files; split by responsibility.

## Import Conventions
- Use absolute imports from `src/` when possible.
- Order imports: external libraries, internal modules, styles.

## Environment Variables
- Store secrets in `.env.local`, never commit them.
- Access env vars via `process.env` in server code, `NEXT_PUBLIC_` prefix for client.
- Document required env vars in `README.md`.

## Error Handling
- Wrap all external IO (fetch, API, storage) in try/catch.
- Never use silent `catch {}` blocks; always handle/log errors.
- Provide user feedback for errors (UI messages, fallback states).

## Best Practices (Next.js/React)
- Use SSR/SSG where appropriate for performance and SEO.
- Use React hooks for state and side effects.
- Ensure accessibility: semantic HTML, ARIA attributes, keyboard navigation.
- Avoid deprecated APIs and anti-patterns (e.g., unbounded recursion, polling without backoff).

## Git & PR Hygiene
- Use Conventional commit prefixes: feat:, fix:, chore:, refactor:, test:, docs:
- Keep commits small and focused; avoid unrelated changes in one commit.
- PRs should be small, focused, and reference a single feature or bug fix.

## Prohibited Patterns
- Large anonymous utility files (split by responsibility)
- Unbounded recursion or polling without backoff
- Silent error handling (catch {})
- Committing secrets or sensitive data

## Additional Guidelines
- Review and test your code before submitting PRs.
- Add comments only when necessary (e.g., for complex logic or unclear code). Avoid comments for obvious or self-explanatory code.
- Keep documentation up to date.
