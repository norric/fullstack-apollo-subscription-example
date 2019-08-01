import express from 'express';
import { createServer } from 'http';
import { PubSub } from 'apollo-server';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const pubsub = new PubSub();
const MESSAGE_CREATED = 'MESSAGE_CREATED';

const typeDefs = gql`
  type Query {
    messages: [Message!]!
  }

  type Mutation {
    createMessage(content: String!): Message
  }

  type Subscription {
    messageCreated: Message
  }

  type Message {
    id: String
    content: String
  }
`;

const messages = [
  { id: 0, content: 'Hello!' },
  { id: 1, content: 'Bye!' },
];

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    createMessage: (parent, args, context, info) => {
      console.log('createMessage', parent, args, context, info);
      return addMessage(args.content);
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED),
    },
  },
};

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

let id = messages.length;

// TODO: async to actually add message before returning?
const addMessage = content => {
  const newMessage = {
    id: id++,
    content,
  };
  messages.push(newMessage);
  pubsub.publish(MESSAGE_CREATED, {
    messageCreated: newMessage,
  });

  return newMessage;
};

// setInterval(() => {
// addMessage(new Date().toString());
// }, 1000);
