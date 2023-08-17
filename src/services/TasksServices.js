const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class TasksServicesService {
  async getTasks(userId) {
    console.log("foi", userId);

    const tasksFind = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    return tasksFind;
  }
}
module.exports = new TasksServicesService();
