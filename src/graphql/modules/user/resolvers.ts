import { UserType } from "../../../_types";
import UserRegister from "../../../services/UserRegister";
import PokemonService from "../../../services/Pokemon_Service";
import GithubService from "../../../services/GITHUB.service";
import { generator } from "../../../helpers/generator";

export default {
  User: {
    async pokemons(user: UserType, _: any, context: any) {
      // return await context.dataSources.TasksServicesService.getTasks(user.id);
      return await PokemonService.getPokemons(user.id);
    },
  },

  Query: {
    async user(_: any, { login }: any, context: any) {
      const userFound =
        //await context.dataSources.UserRegisterService.getUserByLogin(login);
        await UserRegister.getUserByLogin(login);

      if (userFound) {
        userFound.token = generator.createToken(userFound.id);
        console.log(userFound);
        return userFound;
      }

      const { login: LoginGit, avatar_url } =
        // await context.dataSources.GITHUBService.getUser(login);
        await GithubService.getUser(login);

      /* const newUser = await context.dataSources.UserRegisterService.addUser({
        LoginGit,
        avatar_url,
      }); */
      const newUser = await UserRegister.addUser({
        LoginGit,
        avatar_url,
      });

      newUser.token = generator.createToken(newUser.id);
      return newUser;
    },
  },
};
