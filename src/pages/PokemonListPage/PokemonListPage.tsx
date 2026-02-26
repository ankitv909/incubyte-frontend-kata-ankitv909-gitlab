import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokeApi";
import { Link } from "react-router-dom";

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

  const showEmpty =
    query.data && !query.isLoading && !query.isError && filtered.length === 0;

  return (
    <main className="page">
      <header className="header">
        <h1>Pokémon</h1>

        <label className="label">
          <span className="labelText">Filter by name</span>
          <input
            aria-label="Filter by name"
            className="input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. bulba"
          />
        </label>
      </header>

      {query.isLoading && (
        <p role="status" className="status">
          Loading...
        </p>
      )}

      {query.isError && (
        <p role="alert" className="status">
          Failed to load Pokémon.
        </p>
      )}

      {showEmpty && (
        <p className="status">
          No Pokémon found for <strong>{q.trim()}</strong>
        </p>
      )}

      {query.data && !query.isLoading && !query.isError && (
        <ul aria-label="pokemon list" className="grid">
          {filtered.map((p) => (
            <li key={p.name} className="gridItem">
              <Link to={`/pokemon/${p.name}`} className="card">
                <div className="cardTitle">{p.name}</div>
                <div className="cardSub">View details →</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}