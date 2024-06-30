import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function DriverHome() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {};

  if (!email) {
    navigate('/signin');
  }

  return (
    <div>
      <h1>Welcome, {email}</h1>
    </div>
  );
}

export default DriverHome;