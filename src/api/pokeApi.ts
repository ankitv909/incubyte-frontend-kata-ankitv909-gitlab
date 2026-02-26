export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
};

const API = "https://pokeapi.co/api/v2";


// ✅ List API
export async function getPokemonList(): Promise<PokemonListResponse> {
  const res = await fetch(`${API}/pokemon?limit=20&offset=0`);

  if (!res.ok) {
    throw new Error("Failed to fetch pokemon list");
  }

  return res.json();
}


// ✅ Detail API
export async function getPokemonByName(
  name: string
): Promise<PokemonDetail> {

  const res = await fetch(`${API}/pokemon/${name}`);

  if (!res.ok) {
    throw new Error("Failed to fetch pokemon detail");
  }

  return res.json();
}