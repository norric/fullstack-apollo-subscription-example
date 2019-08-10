import gql from 'graphql-tag';

export const GET_POLLS = gql`
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

export const CREATE_POLL = gql`
  mutation CreatePoll($name: String!, $description: String!) {
    createPoll(name: $name, description: $description) {
      id
    }
  }
`;

// export const CAST_VOTE = gql`
//   mutation {
//     castVote(id: Int!, user: String!, points: Float!) {
//       id
//       user
//       points
//     }
//   }
// `;
