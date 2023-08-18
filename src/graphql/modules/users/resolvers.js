const generator = require("../../../helpers/generator");

module.exports = {
  User: {
    async tasks(user, _, context) {
      return await context.dataSources.TasksServicesService.getTasks(user.id);
    },
  },

  Query: {
    async user(_, { login }, context) {
      const userFound =
        await context.dataSources.UserRegisterService.getUserByLogin(login);

      if (userFound) {
        userFound.token = generator.createToken(userFound.id);

        return userFound;
      }

      const { login: LoginGit, avatar_url } =
        await context.dataSources.GITHUBService.getUser(login);

      const newUser = await context.dataSources.UserRegisterService.addUser({
        LoginGit,
        avatar_url,
      });
      newUser.token = generator.createToken(newUser.id);
      return newUser;
    },
  },
};
