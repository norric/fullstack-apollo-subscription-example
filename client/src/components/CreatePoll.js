import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

// TODO: keep graphql here or in parent?

function CreatePoll({ onCreatePoll, history }) {
  const [pollData, setPollData] = useState({});
  const [isDirty, setDirty] = useState(false);
  const [isBusy, setBusy] = useState(false);

  return (
    <div>
      <h1>Create poll</h1>
      <form
        onChange={e => {
          setPollData({
            ...pollData,
            [e.target.name]: e.target.value,
          });
          setDirty(true);
        }}
        onSubmit={async e => {
          e.preventDefault();
          console.log('pollData submit', pollData);
          await onCreatePoll({ variables: { ...pollData } });
          history.push('/');
        }}
      >
        <div>
          <label>
            Name: <input type="text" name="name" disabled={isBusy} />
          </label>
        </div>
        <div>
          <label>
            Description:{' '}
            <input type="text" name="description" disabled={isBusy} />
          </label>
        </div>
        <button type="submit" disabled={!isDirty}>
          Save
        </button>
      </form>

      <p>
        <Link to={'/'}>Back...</Link>
      </p>
    </div>
  );
}

export default CreatePoll;
