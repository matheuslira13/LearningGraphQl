const dbUser = require("../../../db");

const generatorId = (listadeArray) => {
  let novoId;
  let ultimoID = listadeArray[listadeArray.length - 1];
  if (!ultimoID) {
    novoId = 0;
  } else {
    novoId = ultimoID;
  }
  return ++novoId;
};

module.exports = {
  User: {
    perfil(obg) {
      return dbUser.perfils.find((perfil) => perfil.id === obg.perfil);
    },
  },
  Query: {
    usuario(_, args) {
      return dbUser.usuarios.find((usuarioDB) => usuarioDB.id === args.id);
    },
    usuarios() {
      return dbUser.usuarios;
    },
  },
  Mutation: {
    addUser(_, args) {
      const newUser = {
        ...args,
        id: generatorId(dbUser.usuarios),
        perfil: 2,
      };
      dbUser.usuarios.push(newUser);

      return newUser;
    },
  },
};
