import React from 'react';

function SignOut({ userName, setUserName }) {
  return (
    <small className="text-muted">
      Signed in as <b>{userName}</b>
      {' - '}
      <a
        href="/#"
        className="margin-top"
        onClick={() => {
          sessionStorage.setItem('userName', '');
          setUserName(null);
        }}
      >
        Sign out
      </a>
    </small>
  );
}

export default SignOut;
