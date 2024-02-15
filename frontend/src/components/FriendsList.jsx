import React from 'react';

function FriendsList({ data }) {
  if (!data || !data.user) {
    return <div>Loading...</div>;
  }
  const { friends } = data.user;

  return (
    <div>
      <h2>Friends List</h2>
      {friends.length === 0 ? (
        <p>Get some friends!</p>
      ) : (
        <div>
          <p>Total Friends: {friends.length}</p>
          <ul>
            {friends.map(friends => (
              <li key={friends._id}>
                <span>{friends.username}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FriendsList;
