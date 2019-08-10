import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, useQuery } from 'react-apollo';
import { Polls } from './Polls';

// TODO: separate into queries?
const GET_POLLS = gql`
  query {
    polls {
      id
      name
      description
    }
  }
`;

export const POLL_UPDATED = gql`
  subscription {
    pollUpdated {
      id
      name
      description
    }
  }
`;

const App = () => {
  const { data, loading, subscribeToMore } = useQuery(GET_POLLS);
  console.log('data', data);
  if (!data) {
    return null;
  }

  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <Polls
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
