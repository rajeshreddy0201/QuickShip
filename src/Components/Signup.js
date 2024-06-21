import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [driversLicense, setDriversLicense] = useState('');
  const [insurance, setInsurance] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/driverhome');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-page">
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/aboutus">About Us</a></li>
          <li><a href="/contactus">Contact Us</a></li>
        </ul>
      </nav>
      <div className="signup-content">
        <div className="side-image"></div>
        <div className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Date of Birth"
              required
            />
            <div className="radio-group">
              <label>Do you have a valid driver's license?</label>
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={driversLicense === 'yes'}
                  onChange={(e) => setDriversLicense(e.target.value)}
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={driversLicense === 'no'}
                  onChange={(e) => setDriversLicense(e.target.value)}
                /> No
              </label>
            </div>
            <div className="radio-group">
              <label>Do you have proof of insurance?</label>
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={insurance === 'yes'}
                  onChange={(e) => setInsurance(e.target.value)}
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={insurance === 'no'}
                  onChange={(e) => setInsurance(e.target.value)}
                /> No
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter Password"
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          {error && <p>{error}</p>}
          <div className="signin-link">
            <p>Already have an account? <a href="/signin">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;