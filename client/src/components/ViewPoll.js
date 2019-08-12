import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import { CAST_VOTE } from '../queries';

function EditVote({ poll, user, points }) {
  const [
    castVote,
    // TODO: error handling
    // { loading: mutationLoading, error: mutationError },
  ] = useMutation(CAST_VOTE);

  const options = [0, 0.5, 1, 2, 3, 5, 8, 13];
  return (
    <div>
      <b>{user} (you): </b>
      <span>
        <select
          className="form-control"
          style={{ display: 'inline', width: 'auto' }}
          required
          value={points}
          onChange={e => {
            castVote({
              variables: {
                id: poll.id,
                user: user,
                points: parseFloat(e.target.value),
              },
            });
          }}
        >
          {options.map(option => (
            <option key={option} name={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}

function ViewPoll({ id, polls, userName }) {
  const poll = polls[id];
  if (!poll) {
    return (
      <div>
        <p>Poll not found</p>
        <button className="btn">
          <Link to={'/'}>Go back...</Link>
        </button>
      </div>
    );
  }

  const myVote = poll.votes.find(p => p.user === userName) || {
    user: userName,
    points: 0,
  };

  return (
    <div>
      <h2>{poll.name}</h2>
      <div className="form-group">
        <label>{poll.description}</label>
      </div>
      <div className="form-group">
        <label>Votes:</label>
        <ul>
          <li>
            <EditVote poll={poll} {...myVote} />
          </li>
          {(poll.votes || []).map(vote => {
            if (vote.user === userName) {
              return null;
            }
            return (
              <li key={vote.user}>
                {vote.user}: {vote.points}
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <button className="btn">
          <Link to={'/'}>Back</Link>
        </button>
      </div>
    </div>
  );
}

export default ViewPoll;
