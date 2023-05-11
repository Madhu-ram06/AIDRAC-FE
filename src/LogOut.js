import { useState } from 'react';
import './Login.css'

const Logout = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Logout;