import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import { CAST_VOTE } from '../queries';

function EditVote({ poll, user, points }) {
  const [
    castVote,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CAST_VOTE);

  const options = [0, 0.5, 1, 2, 3, 5, 8, 13];
  return (
    <li>
      <b>{user} (you): </b>
      <span>
        <select
          required
          value={points}
          onChange={() => {
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
    </li>
  );
}

function ViewPoll({ id, polls, userName }) {
  const poll = polls[id];
  if (!poll) {
    return (
      <div>
        <p>Poll not found</p>
        <Link to={'/'}>Go back...</Link>
      </div>
    );
  }

  const myVote = poll.votes.find(p => p.user === userName) || {
    user: userName,
    points: 0,
  };

  return (
    <div>
      <h1>View poll</h1>
      <div>
        <label>Name: {poll.name}</label>
      </div>
      <div>
        <label>Description: {poll.description}</label>
      </div>
      <div>
        <label>Votes:</label>
        <ul>
          <li>
            <EditVote poll={poll} {...myVote} />
          </li>
          {(poll.votes || []).map(vote => {
            if (vote.user === userName) {
              return;
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
        <Link to={'/'}>Back...</Link>
      </div>
    </div>
  );
}

export default ViewPoll;
