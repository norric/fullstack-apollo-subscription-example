import gql from 'graphql-tag';

export const GET_POLLS = gql`
  query {
    polls {
      id
      name
      description
      votes {
        user
        points
      }
    }
  }
`;

export const POLL_UPDATED = gql`
  subscription {
    pollUpdated {
      id
      name
      description
      votes {
        user
        points
      }
    }
  }
`;

export const CREATE_POLL = gql`
  mutation CreatePoll($name: String!, $description: String!) {
    createPoll(name: $name, description: $description) {
      id
    }
  }
`;

export const CAST_VOTE = gql`
  mutation CastVote($id: Int!, $user: String!, $points: Float!) {
    castVote(id: $id, user: $user, points: $points) {
      id
      name
      votes {
        user
        points
      }
    }
  }
`;
