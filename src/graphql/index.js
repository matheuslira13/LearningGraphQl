/* Aqui e um arquivo para fazer a uniao de resolvers e schemagraql de forma sepata posi nao todos os schema  e resolvers
ficariam dentro do arquivo indexedDB,js dentro do cliente apollo entao foi adicionado essa biblioteste load-files */

const { join } = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
// Abserve bem o nome modules e depois tudo que tiver gql
// ou seja essa constante allType esta pegando todos os schema.gql dentro da pasta module para colocar aonde
//e necessario la no aquivo index.js aonde esta o cliente apollo
const allType = loadFilesSync(join(__dirname, "modules", "**", "*.gql"));
//aqui e a mesma coisa so que com o nome de arquivo resolvers.js se vc criar um resolvers com nome diferente nao vai ser encontrado
const allResolvers = loadFilesSync(
  join(__dirname, "modules", "**", "resolvers.js")
);

const typeDefs = mergeTypeDefs(allType);

const resolvers = mergeResolvers(allResolvers);

module.exports = { typeDefs, resolvers };
