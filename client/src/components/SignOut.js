import React from 'react';

function SignOut({ userName, setUserName }) {
  return (
    <div>
      <div>
        Signed in as <b>{userName}</b>
      </div>
      <div>
        <button
          onClick={() => {
            sessionStorage.setItem('userName', '');
            setUserName(null);
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default SignOut;
