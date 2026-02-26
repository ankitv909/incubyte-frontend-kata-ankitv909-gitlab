import { http, HttpResponse } from "msw";

const API = "https://pokeapi.co/api/v2";

export const handlers = [
  http.get(`${API}/pokemon`, () => {
    return HttpResponse.json({
      count: 1302,
      next: `${API}/pokemon?limit=20&offset=20`,
      previous: null,
      results: [
        { name: "bulbasaur", url: `${API}/pokemon/1/` },
        { name: "ivysaur", url: `${API}/pokemon/2/` },
        { name: "venusaur", url: `${API}/pokemon/3/` },
      ],
    });
  }),

  http.get(`${API}/pokemon/:name`, ({ params }) => {
    if (params.name === "bulbasaur") {
      return HttpResponse.json({
        id: 1,
        name: "bulbasaur",
        height: 7,
        weight: 69,
        types: [{ slot: 1, type: { name: "grass" } }],
        stats: [{ base_stat: 45, stat: { name: "hp" } }],
      });
    }
    return new HttpResponse(null, { status: 404 });
  }),
];