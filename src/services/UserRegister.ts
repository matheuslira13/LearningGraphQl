import { PrismaClient } from "@prisma/client";
import { UserType } from "../_types";

const prisma = new PrismaClient();

class UserRegisterService {
  async addUser(user: any) {
    const newUser = await prisma.users.create({
      data: { login: user.LoginGit, avatar_url: user.avatar_url },
    });
    return newUser;
  }
  async getUserByLogin(login: any) {
    const user = await prisma.users.findFirst({
      where: {
        login: login,
      },
    });

    return user;
  }
}
export default new UserRegisterService();
