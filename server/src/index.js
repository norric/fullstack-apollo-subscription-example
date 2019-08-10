import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
