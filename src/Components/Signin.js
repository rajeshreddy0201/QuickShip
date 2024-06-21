import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Signin.css';

const adminEmail = 'admin@example.com';
const adminPassword = 'adminpassword';

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async (event) => {
    event.preventDefault();
    try {
      if (email === adminEmail && password === adminPassword) {
        // Admin login
        navigate('/adminhome');
      } else {
        // Driver login
        await auth.signInWithEmailAndPassword(email, password);
        navigate('/driverhome');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signin-page">
      <nav className="navbar-i">
        <div className="logo">QuickShip</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>
        </ul>
      </nav>
      <div className="signin-content">
        <div className="side-image"></div>
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSignin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Log in</button>
          </form>
          {error && <p>{error}</p>}
          <div className="signin-link">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;