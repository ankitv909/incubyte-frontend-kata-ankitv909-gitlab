import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getPokemonByName } from "../../api/pokeApi";

export function PokemonDetailPage() {
  const { name = "" } = useParams();

  const query = useQuery({
    queryKey: ["pokemon-detail", name],
    queryFn: () => getPokemonByName(name),
    enabled: Boolean(name),
  });

  const types = useMemo(() => {
    const t = query.data?.types ?? [];
    return t
      .slice()
      .sort((a, b) => a.slot - b.slot)
      .map((x) => x.type.name);
  }, [query.data]);

  const stats = useMemo(() => {
    const s = query.data?.stats ?? [];
    return s.map((x) => ({
      name: x.stat.name.replace("-", " "),
      value: x.base_stat,
    }));
  }, [query.data]);

  return (
    <main className="page">
      <div className="detailHeader">
        <h1 style={{ textTransform: "capitalize" }}>{name || "Pokémon"}</h1>

        <Link to="/" className="backLink">
          ← Back to list
        </Link>
      </div>

      {query.isLoading && <p role="status">Loading...</p>}
      {query.isError && <p role="alert">Failed to load Pokémon details.</p>}

      {query.data && (
        <section className="panel" aria-label="pokemon details">
          <div className="metaGrid">
            <div>
              <div className="metaItemTitle">Height</div>
              <div className="metaItemValue">{query.data.height}</div>
            </div>

            <div>
              <div className="metaItemTitle">Weight</div>
              <div className="metaItemValue">{query.data.weight}</div>
            </div>

            <div>
              <div className="metaItemTitle">Types</div>
              <div className="chips" aria-label="pokemon types">
                {types.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="metaItemTitle">Stats</div>
              <div className="statsGrid" aria-label="pokemon stats">
                {stats.map((s) => (
                  <div key={s.name} className="statRow">
                    <span className="statName">{s.name}</span>
                    <span className="statValue">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}