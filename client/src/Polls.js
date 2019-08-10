import React, { useEffect } from 'react';

export function Polls({ polls, subscribeToPolls, createPoll }) {
  useEffect(() => {
    const unsubscribe = subscribeToPolls();
    return function cleanUp() {
      unsubscribe();
    };
  });

  return (
    <div>
      <h1>Polls</h1>
      <button
        type="submit"
        onClick={() => {
          createPoll({
            variables: { name: 'test', description: 'desc' },
          });
        }}
      >
        Add poll
      </button>
      <ol>
        {polls.map(poll => (
          <li key={poll.id}>{JSON.stringify(poll)}</li>
        ))}
      </ol>
    </div>
  );
}
