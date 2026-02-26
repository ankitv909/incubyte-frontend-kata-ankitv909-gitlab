# Incubyte Frontend Engineering Kata – Pokémon App

## Live Demo
- Live URL: <PASTE_DEPLOYED_LINK_HERE>

## Screenshots
### Pokémon Listing Page
![Listing](docs/screenshots/listing.png)

### Pokémon Detail Page
![Detail](docs/screenshots/detail.png)

---

## Features
### 1) Pokémon Listing Page
- Fetches Pokémon list from PokeAPI
- Renders Pokémon as cards in a list/grid
- Filter by name (case-insensitive)
- Handles loading state

### 2) Pokémon Detail Page
- Navigates from list → detail on click
- Fetches Pokémon details by `name`
- Shows loading state
- Shows height & weight (from API response)
- Handles error state (404/failed request)

---

## Tech Stack
- React + TypeScript (Vite)
- React Router
- React Query (data fetching + caching)
- Vitest + Testing Library
- MSW (mock API in tests)

---

## Setup Instructions
### Prerequisites
- Node.js (LTS recommended)
- npm

### Install
```bash
npm install