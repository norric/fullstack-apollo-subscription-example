import React, { useEffect } from 'react';
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import ListPolls from './ListPolls';
import CreatePoll from './CreatePoll';
import ViewPoll from './ViewPoll';

function AppRouter({ polls, subscribeToPolls, createPoll }) {
  // const { params } = match;
  useEffect(() => {
    const unsubscribe = subscribeToPolls();
    return function cleanUp() {
      unsubscribe();
    };
  });

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <ListPolls polls={polls} />}
        />
        <Route
          path="/create"
          render={props => (
            <CreatePoll
              onCreatePoll={createPoll}
              history={props.history}
            />
          )}
        />
        <Route
          path="/poll/:id"
          render={props => (
            <ViewPoll polls={polls} id={props.match.params.id} />
          )}
        />
        <Route component={() => 'Not found'} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
