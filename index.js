require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");

const { resolvers, typeDefs } = require("./src/graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const GITHUBService = require("./src/services/GITHUB.service");
const UserRegisterService = require("./src/services/UserRegister");
const TasksServicesService = require("./src/services/TasksServices");
const NoPermissionError = require("./src/erros/NoPermissionError/index");
const TaskNotFoundError = require("./src/erros/TaskNotFoundError/index");
const UserNotFoundError = require("./src/erros/UserNotFoundError/index");
const generator = require("./src/helpers/generator");

//primeira coisa para entender de onde vem todo resolvers e todo schema.gql e so acessar o arquivo index.js da pasta module
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  //dataSources e uma maneira de adicionar serviços de forma mais organizada para acessar os serviços dentro da rota
  // basta acessa o 3° parametro do resolver com o contexto para entender melhor vc pode olhar como o serviço esta sendo
  //chamado dentro do de algum resolvers
  dataSources: () => ({
    GITHUBService,
    UserRegisterService,
    TasksServicesService,
  }),
  // a ideia do context e passar todo e qualquer requisiçao aqui dentro entao e o melhor lugar para fazer validação de
  // autenticação oberverse como a validação do token e feito na pasta helpers e como e usado dentro do resolver
  context: ({ req }) => {
    //esse authorization e algo que vc usa nos na hora de chamar a API como eu sou front-end nao conhecia mas
    // e necessario usar esse authorization e passar um token no momento o jeito de criar um token e passando um parametro
    // de login que e um usuario do github e vai ser gerado um token, esse token nao esta sendo salvo em lugar nenhum mas e
    // necessario para fazer realizar o CRUD
    const token = req.headers.authorization;
    return {
      validate() {
        try {
          const { id } = generator.verifyToken(token);
          return id;
        } catch (error) {
          throw new NoPermissionError("Voce nao esta autenticado");
        }
      },
    };
  },
  // O nome aqui e meio intuitivo aqui e uma maneira melhor de adicionar Erros em vez daquele error padrao que o
  // Apollo criar que pode conter informações importantes
  formatError: (err) => {
    if (err.originalError instanceof NoPermissionError) {
      return new Error(err.message);
    }
    if (err.originalError instanceof TaskNotFoundError) {
      return new Error(err.message);
    }
    if (err.originalError instanceof UserNotFoundError) {
      return new Error(err.message);
    }
    return err;
  },
});
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
