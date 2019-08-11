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
            return {
              polls: [
                ...prev.polls,
                subscriptionData.data.pollUpdated,
              ],
            };
          },
        })
      }
    />
  );
};

export default App;
