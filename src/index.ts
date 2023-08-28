import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import bodyParser from "body-parser";
import cors from "cors";
import { resolvers, typeDefs } from "./graphql/export";

import { PubSub } from "graphql-subscriptions";
import { generator } from "./helpers/generator";

(async () => {
  const pub = new PubSub();
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        pub,
        show: "teste",
        validate() {
          const token = req.headers.authorization;

          try {
            //@ts-ignore
            const { id } = generator.verifyToken(token);

            return id;
          } catch (error) {
            // throw new NoPermissionError("Voce nao esta autenticado");

            console.log("Voce nao esta autenticado", error);
          }
        },
      }),
    })
  );

  httpServer.listen(4000, () => {
    console.log("Server runing on 4000/graphql localhost");
  });
})();
