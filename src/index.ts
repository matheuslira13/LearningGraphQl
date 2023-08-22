import { ApolloServer } from "@apollo/server";
import { PubSub } from "graphql-subscriptions";
import { startStandaloneServer } from "@apollo/server/standalone";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";

import { createServer } from "http";
import resolvers from "./resolvers";
import { typeDefs } from "./schemas";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

const pub = new PubSub();
const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

async function call() {
  const { url } = await startStandaloneServer(server, {
    context: async () => ({ pub }),
    listen: { port: 4000 },
  });

  console.log(`Esta rodando ${url}`);
}

call();
