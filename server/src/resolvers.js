import { PubSub } from 'apollo-server';
const POLL_UPDATED = 'POLL_UPDATED';
const pubsub = new PubSub();

// TODO: to be replaced with proper persistent storage (e.g. mongo)
const polls = [
  // TODO: we could add more stuff, like
  // timestamp, author, nicer alpha IDs etc
  {
    id: 0,
    name: 'Test poll 1',
    description: 'test description 1',
    votes: [
      { user: 'Rickard', points: 3 },
      { user: 'user2', points: 10 },
    ],
  },
  {
    id: 1,
    name: 'Test poll 2',
    description: 'test description 2',
    votes: [
      { user: 'test', points: 1 },
      { user: 'Rickard', points: 0 },
    ],
  },
];

const createPoll = content => {
  console.debug('content', content);
  const newPoll = {
    id: polls.length,
    ...content,
    votes: [],
  };
  console.debug('newPoll', newPoll);
  polls.push(newPoll);
  pubsub.publish(POLL_UPDATED, {
    pollUpdated: newPoll,
  });
  return newPoll;
};

const castVote = update => {
  const poll = polls.find(p => p.id === update.id);
  const existing = poll.votes.find(v => v.user === update.user);
  if (existing) {
    console.debug(
      `${update.user} already voted. new value: ${update.points}`,
    );
    existing.points = update.points;
  } else {
    console.debug(
      `${update.user} cast a new vote. value: ${update.points}`,
    );
    poll.votes.push(update);
  }

  console.debug('updated poll', poll);

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
    createPoll: (parent, args, context, info) => createPoll(args),
    castVote: (parent, args, context, info) => castVote(args),
  },
  Subscription: {
    pollUpdated: {
      subscribe: () => pubsub.asyncIterator(POLL_UPDATED),
    },
  },
};

module.exports = resolvers;
