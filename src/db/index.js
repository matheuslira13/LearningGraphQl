const db = {
  usuarios: [
    {
      idade: 29,
      salario: 4500.0,
      nome: "Matheus Lira Barbosa",
      id: 1,
      perfil: 1,
    },
    {
      idade: 26,
      salario: 2500.0,
      nome: "Viviany Irias",
      id: 2,
      perfil: 2,
    },
  ],
  perfils: [
    { id: 1, descricao: "ADM" },
    { id: 2, descricao: "USER" },
  ],
};

module.exports = db;
