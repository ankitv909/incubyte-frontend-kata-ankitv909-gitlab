import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
};

async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon detail");
  return res.json();
}

export function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();

  const query = useQuery({
    queryKey: ["pokemon-detail", name],
    queryFn: () => getPokemonDetail(name!),
    enabled: !!name,
  });

  const title = (name ?? "").toLowerCase();

  return (
    <main className="page">
      <div className="detailHeader">
        <h1 style={{ textTransform: "capitalize" }}>{title}</h1>

        <Link to="/" className="backLink">
          ← Back to list
        </Link>
      </div>

      {query.isError ? (
        <p role="alert" className="statusText">
          Failed to load Pokémon.
        </p>
      ) : (
        <>
          {/* ✅ keep labels always visible (tests + UI stability) */}
          <div className="detailCard">
            <div className="detailGrid">
              {/* LEFT */}
              <section>
                <div className="metaGrid">
                  <div>
                    <div className="metaLabel">Height</div>
                    {/* ✅ tests look for "height" text */}
                    <div className="metaValue">{query.data?.height ?? "—"}</div>
                  </div>

                  <div>
                    <div className="metaLabel">Weight</div>
                    {/* ✅ tests look for "weight" text */}
                    <div className="metaValue">{query.data?.weight ?? "—"}</div>
                  </div>
                </div>

                <div className="sectionTitle">Types</div>
                <div className="chips" aria-label="types">
                  {(query.data?.types ?? []).map((t) => (
                    <span key={t.type.name} className="chip">
                      {t.type.name}
                    </span>
                  ))}
                  {!query.data?.types?.length && <span className="chip">—</span>}
                </div>
              </section>

              {/* RIGHT */}
              <section>
                <div className="sectionTitle">Stats</div>

                <div className="statsGrid" aria-label="stats">
                  {(query.data?.stats ?? []).map((s) => (
                    <div key={s.stat.name} className="statPill">
                      <span className="statName">
                        {s.stat.name.replace("-", " ")}
                      </span>
                      <span className="statVal">{s.base_stat}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {query.isLoading && (
            <p role="status" className="statusText">
              Loading...
            </p>
          )}
        </>
      )}
    </main>
  );
}