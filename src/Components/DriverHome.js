import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import DriverCurrentPackages from './DriverCurrentPackages';
import DriverHistory from './DriverHistory'; 
import './DriverHome.css';

function DriverHome() {
  return (
    <div className="driver-home-page">
      <aside className="sidebar">
        <div className="logo">QuickShip</div>
        <ul className="sidebar-menu">
          <li><Link to="/driverhome">Home</Link></li>
          <li><Link to="/driver-current-packages">Current Packages</Link></li>
          <li><Link to="/driverhistory">History</Link></li>
          <li><Link to="/">Log Out</Link></li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Driver Inbox</h1>
        </header>
        <section className="content">
          <Routes>
            <Route path="/driver-current-packages" element={<DriverCurrentPackages />} />
            <Route path="/driverhistory" element={<DriverHistory />} />
          </Routes>
          <Routes>
            <Route path="*" element={
              <>
                <h1>Welcome to QuickShip</h1>
                <div className="welcome-content">
                  <p>QuickShip is your reliable partner for all your package delivery needs. As a driver with QuickShip, you play a crucial role in ensuring timely and safe delivery of packages. Here are some of the features you can explore:</p>
                  <ul>
                    <li><strong>Current Packages:</strong> View and manage the packages assigned to you for delivery.</li>
                    <li><strong>History:</strong> Check the status of your delivered packages and keep track of your delivery history.</li>
                  </ul>
                  <p>We value your dedication and commitment to providing excellent service. Thank you for being a part of the QuickShip team!</p>
                </div>
              </>
            } />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default DriverHome;