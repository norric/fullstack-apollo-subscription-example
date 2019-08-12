import React, { useState } from 'react';

function SignIn({ signInAs }) {
  const [userName, setUserName] = useState(
    sessionStorage.getItem('userName'),
  );
  return (
    <div>
      <h1>Welcome to Planning Poker</h1>
      <p>Please sign in</p>
      <form
        onSubmit={e => {
          e.preventDefault();
          sessionStorage.setItem('userName', userName);
          console.debug('signing in as', userName);
          signInAs(userName);
        }}
      >
        <div className="form-group">
          <label>
            Your name:{' '}
            <input
              type="text"
              name="username"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <button
            type="submit"
            disabled={!userName}
            className="btn btn-primary"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
