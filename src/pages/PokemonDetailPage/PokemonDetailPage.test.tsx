import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AppProviders } from "../../app/AppProviders";
import { PokemonListPage } from "../PokemonListPage/PokemonListPage";
import { PokemonDetailPage } from "./PokemonDetailPage";

function renderApp() {
  const router = createMemoryRouter(
    [
      { path: "/", element: <PokemonListPage /> },
      { path: "/pokemon/:name", element: <PokemonDetailPage /> },
    ],
    { initialEntries: ["/"] }
  );

  render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

test("navigates to pokemon detail page when a pokemon is clicked", async () => {
  renderApp();

  // wait for list
  const bulba = await screen.findByRole("link", { name: /bulbasaur/i });

  await userEvent.click(bulba);

  // detail page should load and show heading/name
  expect(await screen.findByRole("heading", { name: /bulbasaur/i })).toBeInTheDocument();
});