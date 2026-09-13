# Incubyte Frontend Engineering Kata — Pokémon App

A React + TypeScript Pokémon application built as a frontend engineering kata with a **test-first workflow**, server-state caching, routing, and mocked API tests.

## Features

### Pokémon Listing

- Fetches Pokémon data from PokeAPI
- Responsive card/grid presentation
- Case-insensitive name filtering
- Loading and API error states
- React Query caching for server state

### Pokémon Details

- Route-based navigation from the list to a Pokémon detail view
- Loads detail data by Pokémon name
- Displays core attributes such as height, weight, types, and stats
- Handles loading, error, and not-found cases

## Engineering Approach

The project separates UI behavior from server-state concerns and uses a testing stack that can exercise the application without depending on live API availability.

- **TanStack React Query** for fetching, caching, and request state
- **React Router** for page navigation
- **Vitest** for the test runner
- **Testing Library** for user-facing component tests
- **MSW** for API mocking
- **TypeScript** for static typing

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- Vitest
- Testing Library
- MSW
- ESLint

## Getting Started

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Run tests

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

### Lint

```bash
npm run lint
```

### Production build

```bash
npm run build
```

## Project Goals

This repository demonstrates a maintainable frontend implementation rather than a single-page API demo: typed UI code, route-level behavior, explicit loading/error handling, server-state caching, and automated tests with network mocking.

## API

The application uses the public PokeAPI as its data source. Tests use MSW so test execution does not need to depend on the live service.
