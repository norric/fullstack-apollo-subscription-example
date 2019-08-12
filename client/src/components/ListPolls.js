import React from 'react';
import { Link } from 'react-router-dom';

// TODO: indicate on which ones you've cast a vote
function ListPolls({ polls }) {
  return (
    <div>
      <h2>Polls</h2>
      <Link to="/create">
        <button className="btn btn-primary">Create poll...</button>
      </Link>
      <div className="m-2">
        <ol>
          {polls.map(({ id, name, description }) => {
            return (
              <li key={id}>
                <Link to={`/poll/${id}`}>{name}</Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default ListPolls;
