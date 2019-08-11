import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// TODO: indicate on which ones you've cast a vote
function ListPolls({ polls }) {
  return (
    <div>
      <h1>Polls</h1>
      <Link to="/create">
        <button>Create poll...</button>
      </Link>
      <ol>
        {polls.map(({ id, name, description }) => {
          return (
            <li>
              <Link key={id} to={`/poll/${id}`}>
                {name}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default ListPolls;
