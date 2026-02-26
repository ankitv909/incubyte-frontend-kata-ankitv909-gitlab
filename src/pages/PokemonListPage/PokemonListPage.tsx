import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokeApi";

export function PokemonListPage() {
  const query = useQuery({
    queryKey: ["pokemon-list"],
    queryFn: getPokemonList,
  });

  return (
    <main style={{ padding: 16 }}>
      <h1>Pokémon</h1>

      {query.isLoading && <p role="status">Loading...</p>}
      {query.isError && <p role="alert">Failed to load Pokémon.</p>}

      {query.data && (
        <ul aria-label="pokemon list">
          {query.data.results.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}