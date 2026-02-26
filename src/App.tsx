import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { PokemonListPage } from "./pages/PokemonListPage/PokemonListPage";
import { PokemonDetailPage } from "./pages/PokemonDetailPage/PokemonDetailPage";

const router = createBrowserRouter([
  { path: "/", element: <PokemonListPage /> },
  { path: "/pokemon/:name", element: <PokemonDetailPage /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}