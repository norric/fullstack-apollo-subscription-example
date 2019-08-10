import React, { useEffect } from 'react';

export function Polls({ polls, subscribeToPolls }) {
  useEffect(() => {
    const unsubscribe = subscribeToPolls();
    return function cleanUp() {
      unsubscribe();
    };
  });

  return (
    <div>
      <h1>Polls</h1>
      <ul>
        {polls.map(poll => (
          <li key={poll.id}>{JSON.stringify(poll)}</li>
        ))}
      </ul>
    </div>
  );
}
