import { useState } from 'react';
import './Login.css';

const Register = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = new FormData();
    registerData.append('userID', userID);
    registerData.append('password', password);

    try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/signup', {
            method: 'POST',
            body: registerData,
          });
      const data = await response.json();
      console.log(data);
      setSuccessMessage('Account created successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-form">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
      <p>{successMessage}</p>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default Register;