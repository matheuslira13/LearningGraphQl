module.exports = {
  Query: {
    async tasks(_, __, context) {
      const userID = context.validate();
      return await context.dataSources.TasksServicesService.getTasks(userID);
    },
    async getTaskById(_, args, context) {
      const userID = context.validate();
      return await context.dataSources.TasksServicesService.getTaskByID(
        userID,
        args.id
      );
    },
  },
  Mutation: {
    async addTask(_, { data }, context) {
      const userID = context.validate();
      return await context.dataSources.TasksServicesService.addTask(
        userID,
        data
      );
    },
    async updateTask(_, { id, data }, context) {
      const userID = context.validate();
      return await context.dataSources.TasksServicesService.updateTask(
        userID,
        id,
        data
      );
    },
    async deleteTask(_, { id }, context) {
      const userID = context.validate();
      return await context.dataSources.TasksServicesService.deleteTask(
        userID,
        id
      );
    },
  },
};
