import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListPolls({ polls, createPoll }) {
  console.log('polls', polls);
  return (
    <div>
      <h1>Polls</h1>
      <Link to="/create">
        <button>Add poll...</button>
      </Link>
      <ol>
        {/* TODO this is actually indices as we're on an array */}
        {polls.map(({ name, description }, id) => {
          return (
            <Link key={id} to={`/poll/${id}`}>
              <li>{name}</li>
            </Link>
          );
        })}
      </ol>
    </div>
  );
}

export default ListPolls;
