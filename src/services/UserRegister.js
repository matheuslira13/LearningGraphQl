const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class UserRegisterService {
  async addUser(user) {
    const newUser = await prisma.users.create({
      data: { login: user.LoginGit, avatar_url: user.avatar_url },
    });
    return newUser;
  }
  async getUserByLogin(login) {
    const user = await prisma.users.findFirst({
      where: {
        login: login,
      },
    });

    return user;
  }
}
module.exports = new UserRegisterService();
