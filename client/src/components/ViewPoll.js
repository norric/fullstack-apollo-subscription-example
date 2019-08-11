import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ViewPoll({ id, polls }) {
  const poll = polls[id];
  if (!poll) {
    return (
      <div>
        <p>Poll not found</p>
        <Link to={'/'}>Back...</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>View poll</h1>
      <div>id {poll.id}</div>
      <div>name {poll.name}</div>
      <div>votes {JSON.stringify(poll.votes)}</div>

      <Link to={'/'}>Back...</Link>
    </div>
  );
}

export default ViewPoll;
