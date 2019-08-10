import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

const POLL_UPDATED = gql`
  subscription {
    pollUpdated {
      id
      name
      description
    }
  }
`;

const App = () => (
  <Query query={GET_POLLS}>
    {({ data, loading, subscribeToMore }) => {
      console.log('data', data);
      if (!data) {
        return null;
      }

      if (loading) {
        return <span>Loading ...</span>;
      }

      return (
        <Polls polls={data.polls} subscribeToMore={subscribeToMore} />
      );
    }}
  </Query>
);

// TODO: functional comps
class Polls extends React.Component {
  componentDidMount() {
    this.props.subscribeToMore({
      document: POLL_UPDATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          polls: [...prev.polls, subscriptionData.data.pollUpdated],
        };
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Polls</h1>
        <ul>
          {this.props.polls.map(poll => (
            <li key={poll.id}>{JSON.stringify(poll)}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
