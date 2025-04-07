import React from 'react';

function UserList({ users, currentUserId }) {
  return (
    <div className='user-list peer-box max-h-[200px] overflow-y-auto'>
      <h2>Connected Users ({users.length})</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className={user.id === currentUserId ? 'current-user' : ''}
          >
            {user.id} {user.id === currentUserId ? '(You)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
