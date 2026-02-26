import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const API = "https://pokeapi.co/api/v2";

type PokemonDetail = {
  name: string;
  height: number;
  weight: number;
};

async function fetchPokemonDetail(name: string): Promise<PokemonDetail> {
  const res = await fetch(`${API}/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon detail");
  return res.json();
}

export function PokemonDetailPage() {
  const { name = "" } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon-detail", name],
    queryFn: () => fetchPokemonDetail(name),
    enabled: !!name,
  });

  return (
    <main style={{ padding: 16 }}>
      {isLoading && <div role="status">Loading...</div>}

      {data && (
        <>
          <h1>{data.name}</h1>
          <p>Height: {data.height}</p>
          <p>Weight: {data.weight}</p>
        </>
      )}
    </main>
  );
}