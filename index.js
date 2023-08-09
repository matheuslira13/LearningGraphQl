const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { resolvers, typeDefs } = require("./src/graphql");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
});
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
