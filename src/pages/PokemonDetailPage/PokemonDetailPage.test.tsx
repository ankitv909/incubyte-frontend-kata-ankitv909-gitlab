import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AppProviders } from "../../app/AppProviders";
import { PokemonListPage } from "../PokemonListPage/PokemonListPage";
import { PokemonDetailPage } from "./PokemonDetailPage";

function renderAppAt(path: string) {
  const router = createMemoryRouter(
    [
      { path: "/", element: <PokemonListPage /> },
      { path: "/pokemon/:name", element: <PokemonDetailPage /> },
    ],
    { initialEntries: [path] }
  );

  render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

test("shows loading then renders pokemon detail", async () => {
  renderAppAt("/pokemon/bulbasaur");

  expect(screen.getByRole("status")).toHaveTextContent(/loading/i);

  expect(await screen.findByRole("heading", { name: /bulbasaur/i }))
    .toBeInTheDocument();

  expect(screen.getByText(/height/i)).toBeInTheDocument();
  expect(screen.getByText(/weight/i)).toBeInTheDocument();
});