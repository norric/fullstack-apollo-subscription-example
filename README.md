# planning-poker

Fullstack proof of concept app, using GraphQL and subscriptions over websocket.

Code is based on [fullstack-apollo-subscription-example](https://github.com/the-road-to-graphql/) providing a minimal Apollo Server and Client application with subscriptions, and [create-react-app](https://github.com/facebook/create-react-app) for the client environment.

## Installation

### Server

- `cd server`
- `npm install`
- `npm start`
- (GraphQL playground is available on http://localhost:8000/graphql)

### Client

- `cd client`
- `npm install`
- `npm start`
- Browser should automatically open `http://localhost:3000`

### Example usage

1. Sign in with your name, create a poll and cast a vote
2. Open a new window and sign in with a different name, open the same poll and cast a new vote
3. The first user will immediately see the update
