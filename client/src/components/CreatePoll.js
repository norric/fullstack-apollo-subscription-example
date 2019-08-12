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
    // TODO: error handling
    // { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_POLL);

  return (
    <div>
      <h2>Create poll</h2>
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
        <div className="form-group">
          <label>
            Name:{' '}
            <input className="form-control" type="text" name="name" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Description:{' '}
            <input
              className="form-control"
              type="text"
              name="description"
            />
          </label>
        </div>
        <button className="btn" type="submit">
          <Link to={'/'}>Back</Link>
        </button>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!isDirty}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default CreatePoll;
