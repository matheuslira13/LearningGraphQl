const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class UsuarioService {
  constructor(service) {
    this.service = service;
  }
  contatos = async () => {
    return prisma.user.findMany();
  };
  criarContato = async (data) => {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        telefone: data.telefone,
      },
    });
    return newUser;
  };
  atualizarContato = async (id, data) => {
    const upDateContato = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        telefone: data.telefone,
      },
    });
    return upDateContato;
  };
  deletarContato = async (filtro) => {
    const encontraUsuario = await prisma.user.findFirst({
      where: {
        OR: [{ id: filtro.id }, { email: filtro.email }],
      },
    });
    if (!encontraUsuario) {
      throw new Error("Usuario nao encontrado na base de dados");
    }
    await prisma.user.delete({
      where: {
        id: encontraUsuario.id,
      },
    });

    return true;
  };
}

module.exports = new UsuarioService(prisma);
