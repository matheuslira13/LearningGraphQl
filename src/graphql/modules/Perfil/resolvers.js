const dbUser = require("../../../db");

module.exports = {
  Query: {
    perfil() {
      return dbUser.perfils;
    },
  },
};
