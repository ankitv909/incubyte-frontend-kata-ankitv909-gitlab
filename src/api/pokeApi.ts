export type PokemonListItem = { name: string; url: string };

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

const API = "https://pokeapi.co/api/v2";

export async function getPokemonList(): Promise<PokemonListResponse> {
  const res = await fetch(`${API}/pokemon?limit=20&offset=0`);
  if (!res.ok) throw new Error("Failed to fetch pokemon list");
  return res.json();
}