import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AppProviders } from "../../app/AppProviders";
import { PokemonListPage } from "./PokemonListPage";

function renderPage() {
  const router = createMemoryRouter(
    [{ path: "/", element: <PokemonListPage /> }],
    { initialEntries: ["/"] }
  );

  render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

test("renders pokemon page title", () => {
  renderPage();
  expect(screen.getByRole("heading", { name: /pokémon/i })).toBeInTheDocument();
});