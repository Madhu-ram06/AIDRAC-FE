import "./Login.css";
//import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "./UserContext";

const Login = () => {
  const { setUserID:setUserContextID } = useContext(UserContext);
  const [userID, setLocalUserID] = useState('');
  const [password, setPassword] = useState('');
  const [accountNotFound, setAccountNotFound] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = new FormData();
    loginData.append('userID', userID);
    loginData.append('password', password);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        body: loginData,
      });

      if (response.ok) {
        alert("Succesfully logged in ! Routing to the home page...");
        console.log(userID);
        setUserContextID(userID);
      } 
      else if (response.status === 404) {
        setAccountNotFound(true);
      } else {
      }
      const extracted = await response.json();
      console.log(extracted);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="userID">User ID:</label>
          <input
            type="text"
            id="userID"
            value={userID}
            onChange={(e) => setLocalUserID(e.target.value)}
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

          {accountNotFound && <p>Account not found</p>}
          <button type="submit">
            Login
          </button>
        </form>
      </div>
      <p className="register">
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
};

export default Login;