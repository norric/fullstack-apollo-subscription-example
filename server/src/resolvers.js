import { PubSub } from 'apollo-server';
const POLL_UPDATED = 'POLL_UPDATED';
const pubsub = new PubSub();

// TODO: to be replaced with proper persistent storage

// TODO: obj? immutable records?
const polls = [
  // TODO: randomize nice ids
  {
    id: 0,
    name: 'Test poll 1',
    description: 'test description 1',
    votes: [],
  },
  {
    id: 1,
    name: 'Test poll 2',
    description: 'test description 2',
    votes: [],
  },
];

const createPoll = content => {
  const newPoll = {
    id: polls.length++,
    ...content,
    votes: [],
  };
  polls.push(newPoll);
  pubsub.publish(POLL_UPDATED, {
    pollUpdated: newPoll,
  });
};

// TODO: async to actually add message before returning?
const castVote = content => {
  const poll = polls.find(p => p.id === content.id);

  // TODO: include vote, update if already exists etc
  // let currentVote = poll.votes.find(v => v.name === content.name);
  // if(!currentVote) {
  //   currentVote = content;
  // }

  pubsub.publish(POLL_UPDATED, {
    pollUpdated: poll,
  });

  return poll;
};

const resolvers = {
  Query: {
    polls: () => polls,
  },
  Mutation: {
    createPoll: (parent, args, context, info) => {
      console.log('createPoll', parent, args, context, info);
      return createPoll(args.content);
    },
    castVote: (parent, args, context, info) => {
      console.log('createPoll', parent, args, context, info);
      return castVote(args.content);
    },
  },
  Subscription: {
    pollUpdated: {
      subscribe: () => pubsub.asyncIterator(POLL_UPDATED),
    },
  },
};

// for testing subs

// setInterval(() => {
// addMessage(new Date().toString());
// }, 1000);

module.exports = resolvers;
