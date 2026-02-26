import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokeApi";

export function PokemonListPage() {
  const [q, setQ] = useState("");

  const query = useQuery({
    queryKey: ["pokemon-list"],
    queryFn: getPokemonList,
  });

  const filtered = useMemo(() => {
    const items = query.data?.results ?? [];
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((p) => p.name.toLowerCase().includes(term));
  }, [q, query.data]);

  return (
    <main style={{ padding: 16 }}>
      <h1>Pokémon</h1>

      <label style={{ display: "block", marginTop: 12 }}>
        <span style={{ display: "block", marginBottom: 6 }}>Filter by name</span>
        <input
          aria-label="Filter by name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. bulba"
        />
      </label>

      {query.isLoading && <p role="status">Loading...</p>}
      {query.isError && <p role="alert">Failed to load Pokémon.</p>}

      {query.data && (
        <ul aria-label="pokemon list" style={{ marginTop: 12 }}>
          {filtered.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}