const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const TaskNotFoundError = require("../erros/TaskNotFoundError");
const NoPermission = require("../erros/TaskNotFoundError");

class TasksServicesService {
  async getTasks(userId) {
    const tasksFind = await prisma.task.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
    return tasksFind;
  }

  async getTaskByID(userId, id) {
    console.log("userID ", userId, "id", id);
    const taskSelected = await prisma.task.findFirst({
      where: {
        id: id,
      },
    });
    if (!taskSelected) {
      throw new TaskNotFoundError("Tarefa não encontrada");
    }

    if (taskSelected.userId != userId) {
      throw new NoPermission("Essa tarefa nao é sua");
    }
    return taskSelected;
  }

  async addTask(userId, data) {
    const add = await prisma.task.create({
      data: {
        userId: parseInt(userId),
        title: data.title,
        subtitle: data.subtitle,
      },
    });
    return add;
  }
  async deleteTask(userId, id) {
    const avaibleTask = await this.getTaskByID(userId, id);
    await prisma.task.delete({
      where: {
        id: avaibleTask.id,
      },
    });
    return "Tarefa deletada com Sucesso";
  }
  async updateTask(userId, id, data) {
    const avaibleTask = await this.getTaskByID(userId, id);
    console.log("aqui e o data", avaibleTask);
    const update = prisma.task.update({
      where: {
        id: avaibleTask.id,
      },
      data: {
        title: data.title,
        subtitle: data.subtitle,
      },
    });
    return update;
  }
}
module.exports = new TasksServicesService();
