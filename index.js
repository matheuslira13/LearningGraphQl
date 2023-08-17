require("dotenv").config();

const usuarioService = require("./src/services/Usuario");

const { ApolloServer, gql } = require("apollo-server");

const { resolvers, typeDefs } = require("./src/graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: () => {
    return { usuarioService };
  },
  formatError: (err) => {
    if (err.message.startsWith("Usuario ja existente no mock fake nome")) {
      return new Error(err.message);
    }
    return err;
  },
});
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
