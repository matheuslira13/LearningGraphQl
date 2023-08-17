module.exports = {
  Query: {
    contatos: async (obj, args, context, info) => {
      return await context.usuarioService.contatos();
    },
  },
  Mutation: {
    criarContato: async (_, { data }, context) => {
      return await context.usuarioService.criarContato(data);
    },
    atualizarContato: async (_, { id, data }, context) => {
      return await context.usuarioService.atualizarContato(id, data);
    },
    deletarContato: async (_, { filtro }, context) => {
      return await context.usuarioService.deletarContato(filtro);
    },
  },
};
