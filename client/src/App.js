import React from 'react';
import { useQuery } from 'react-apollo';
import { GET_POLLS, POLL_UPDATED } from './queries';

import AppRouter from './components/AppRouter';

const App = () => {
  const { data, loading, subscribeToMore } = useQuery(GET_POLLS);
  if (!data) {
    return null;
  }

  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <AppRouter
      polls={data.polls}
      subscribeToPolls={() =>
        subscribeToMore({
          document: POLL_UPDATED,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const update = subscriptionData.data.pollUpdated;
            const existing = prev.polls.find(p => p.id === update.id);
            if (existing) {
              existing.polls = update.polls;
              return {
                polls: prev.polls,
              };
            }
            return {
              polls: [...prev.polls, update],
            };
          },
        })
      }
    />
  );
};

export default App;
