import { gql } from 'apollo-server';

// const typeDefs = gql`
//   type Query {
//     messages: [Message!]!
//   }

//   type Mutation {
//     createMessage(content: String!): Message
//   }

//   type Subscription {
//     messageCreated: Message
//   }

//   type Message {
//     id: String
//     content: String
//   }
// `;

const typeDefs = gql`
  type Poll {
    id: Int!
    name: String!
    description: String
    votes: [Vote]!
  }

  type Vote {
    user: String!
    points: Float!
  }

  type Mutation {
    createPoll(name: String!, description: String!): Poll
  }

  type Mutation {
    voteOnPoll(id: Int!, user: String!, points: Float!): Poll
  }

  type Subscription {
    pollUpdated: Poll
  }
`;

module.exports = typeDefs;
