import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import { CREATE_POLL } from '../queries';

function CreatePoll({ history }) {
  const [pollData, setPollData] = useState({
    name: '',
    description: '',
  });
  const [isDirty, setDirty] = useState(false);
  const [
    createPoll,
    // { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_POLL);

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
          console.debug('pollData submit', pollData);
          const { data } = await createPoll({
            variables: { ...pollData },
          });
          const newId = data.createPoll.id;
          history.push(`/poll/${newId}`);
        }}
      >
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Description: <input type="text" name="description" />
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
