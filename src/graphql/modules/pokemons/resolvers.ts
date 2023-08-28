import UserRegister from "../../../services/UserRegister";
import PokemonService from "../../../services/Pokemon_Service";
import GithubService from "../../../services/GITHUB.service";
import { generator } from "../../../helpers/generator";

export default {
  Query: {
    async pokemons(_: any, __: any, context: any) {
      const userID = context.validate();
      return await PokemonService.getPokemons(userID);
    },
    async getPokemonById(_: any, args: any, context: any) {
      const userID = context.validate();
      return await PokemonService.getPokemonById(userID, args.id);
    },
  },
  Mutation: {
    async addPokemon(_: any, { data }: any, context: any) {
      const userID = context.validate();
      console.log(userID);
      return await PokemonService.addPokemon(userID, data);
    },
    async updatePokemon(_: any, { id, data }: any, context: any) {
      const userID = context.validate();
      return await PokemonService.updatePokemon(userID, id, data);
    },
    async deletePokemon(_: any, { id }: any, context: any) {
      const userID = context.validate();
      return await PokemonService.deletePokemon(userID, id);
    },
  },
};
