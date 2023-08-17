require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");

const { resolvers, typeDefs } = require("./src/graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const GITHUBService = require("./src/services/GITHUB.service");
const UserRegisterService = require("./src/services/UserRegister");
const TasksServicesService = require("./src/services/TasksServices");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    GITHUBService,
    UserRegisterService,
    TasksServicesService,
  }),
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
