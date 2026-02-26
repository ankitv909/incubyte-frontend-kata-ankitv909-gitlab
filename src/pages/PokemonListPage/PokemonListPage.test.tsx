import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AppProviders } from "../../app/AppProviders";
import { PokemonListPage } from "./PokemonListPage";

function renderPage() {
  const router = createMemoryRouter([{ path: "/", element: <PokemonListPage /> }], {
    initialEntries: ["/"],
  });

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

test("shows loading then renders pokemon cards from API", async () => {
  renderPage();

  // Loading state
  expect(screen.getByRole("status")).toHaveTextContent(/loading/i);

  // Cards after MSW response
  expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  expect(screen.getByText(/venusaur/i)).toBeInTheDocument();
});

test("filters pokemon by name", async () => {
  renderPage();
  await screen.findByText(/bulbasaur/i);

  const input = screen.getByRole("textbox", { name: /filter by name/i });
  await userEvent.type(input, "bulb");

  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.queryByText(/ivysaur/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/venusaur/i)).not.toBeInTheDocument();
});