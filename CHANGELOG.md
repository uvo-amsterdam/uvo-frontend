# uvo-frontend

## 1.0.0

### Major Changes

- f372529: Adding Directus API implementation. Headless CMS that allows non-technical users to change content on website. This major change requires adding Directus connection variables, or else the build will fail.

### Minor Changes

- 8c385bc: Implemented Nevobo API and Competition Page
- 426f138: Implemented team pages based on Directus
- 71ca6fb: Main page setup & base components added
- 902f626: Implemented Training page based on data from Directus API
- Updated deps & reading nevobo excel reading. Also changed next link to stop prefetching
- 02e91fa: Created a unified card component

### Patch Changes

- 0dfa7b2: Committee and not found page upgrade
- ae46b14: Updated workflows with manual trigger and automatic pr
- 4725acc: Enhance footer with sponsors & better styling
- 4321e67: Dependency updates: @types/node: Updated to 25.5.2, Sass: Updated to 1.99.0, @aws-sdk/client-s3: Updated to 3.1024.0, Biome: Updated to 2.4.10, Next.js: Updated to 16.2.2, @tabler/icons-react: Updated to 3.41.1, read-excel-file: updated to 8.03, PNPM: Updated to 10.33.0
- 716e47f: Update header styling & add sidebar functionality
- 2baaea2: Added increments to the see more matches button
- 4a90315: Fix time methods to display correct time in match table
- f2816f2: AoA page, dep update & PR template update
- f507823: Improved contact page
- 2baaea2: Added expandable set score table rows for desktop users
- 89b4127: Updates the following dependencies: "@aws-sdk/client-s3": "3.1019.0", "@biomejs/biome": "2.4.9", "@tabler/icons-react": "3.41.0", "read-excel-file": "7.0.3", "stylelint": "17.6.0", "lint-staged": "16.4.0", "typescript": "6.0.2"
- 9d44ffa: Adds hero component & Merch page
- b069eba: Fix rebase location
- 6d5a674: add GitHub Actions workflow to build and push Docker images
- 858a0b3: Implemented Signup Page
- 858a0b3: Implemented Member info page
- 9fb0154: Added a canonical no-store HTML cache policy and temporary browser cache purge header on the homepage only to prevent stale website snapshots during migration while reducing repeated cache clears on other routes. Limited the custom /_next/static immutable cache header to production only to avoid stale assets during development. Meant to be temporary for a few weeks.
- 863761d: Fix contact page titles
- 89b108a: Added interval steps to the increase of 'see more matches'
- c647e49: Update board & Fix match fetching
- ab3e628: Add copilot instructions
- f31ae7d: Updated text to better match TC focus
- 9c1bf8c: dependency updates
- 4289393: Update photo usage on the gallery and hero-slideshow
- c203d2a: Added step to push the new version to package.json and changelog
- 6046c56: Dependency updates for: "@types/node": "25.6.0","stylelint": "17.7.0","react": "19.2.5","react-dom": "19.2.5","next": "16.2.3","@directus/sdk": "21.2.2","@biomejs/biome": "2.4.11","@aws-sdk/client-s3": "3.1029.0"
- b37a943: AOA page hero
- 4cc4957: Reshowed sign-up button at TC request
- 648ea81: Implemented Ticket Page
- 1382ab9: Fixed training schedule sorting to be in correct order
- d4b35f7: Add deployment webhook

## 0.2.0

### Minor Changes

- 16a62fc: Enhance changeset workflow & update next.js

## 0.1.0

### Minor Changes

- ddb218b: Initial version
