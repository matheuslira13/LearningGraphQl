export type PokemonsType = {
  id: number;
  name: string;
  ability: string;
};

export type UserType = {
  id: number;
  login: string;
  avatar_url: string;
  pokemons: [PokemonsType];
  token: string;
};
