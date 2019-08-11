import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import {
  GET_POLLS,
  POLL_UPDATED,
  CREATE_POLL,
  // CAST_VOTE,
} from './queries';
import AppRouter from './components/AppRouter';

const App = () => {
  const { data, loading, subscribeToMore } = useQuery(GET_POLLS);
  const [
    createPoll,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_POLL);

  console.log('data', data);
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
      createPoll={createPoll}
    />
  );
};

export default App;
