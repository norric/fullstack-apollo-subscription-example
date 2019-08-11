import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';

import SignIn from './SignIn';
import ListPolls from './ListPolls';
import CreatePoll from './CreatePoll';
import ViewPoll from './ViewPoll';
import SignOut from './SignOut';

function AppRouter({ polls, subscribeToPolls, createPoll }) {
  const [userName, setUserName] = useState(
    sessionStorage.getItem('userName'),
  );

  useEffect(() => {
    const unsubscribe = subscribeToPolls();
    return function cleanUp() {
      unsubscribe();
    };
  });

  if (!userName) {
    return <SignIn signInAs={setUserName} />;
  }

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <ListPolls polls={polls} />
              <SignOut
                userName={userName}
                setUserName={setUserName} // TODO: signOut func?
              />
            </>
          )}
        />
        <Route
          path="/create"
          render={props => <CreatePoll history={props.history} />}
        />
        <Route
          path="/poll/:id"
          render={({ match }) => (
            <ViewPoll
              polls={polls}
              id={match.params.id}
              userName={userName}
            />
          )}
        />
        <Route component={() => 'Not found'} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
