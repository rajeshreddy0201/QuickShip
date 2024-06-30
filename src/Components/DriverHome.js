import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import History from './History';
import { database } from '../firebase';
import './DriverHome.css';

function DriverHome() {
  const [driverPackages, setDriverPackages] = useState([]);

  useEffect(() => {
    const driverId = 'driverId'; 
    const packagesRef = ref(database, `drivers/${driverId}/packages`);

    onValue(packagesRef, (snapshot) => {
      const data = snapshot.val();
      setDriverPackages(data ? Object.values(data) : []);
    });
  }, []);

  return (
    <div className="driver-home-page">
      <aside className="sidebar">
        <div className="logo">QuickShip</div>
        <ul className="sidebar-menu">
          <li><Link to="/driverhome">Home</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/">Log Out</Link></li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Driver Inbox</h1>
        </header>
        <section className="content">
          <Routes>
            <Route path="/history" element={<History />} />
          </Routes>
          <Routes>
            <Route path="*" element={
              <>
                <h1>Hi, Welcome to QuickShip</h1>
                <h1 className="summary">Your Packages</h1>
                <div className="packages-grid">
                  {driverPackages.map((pkg, index) => (
                    <div className="package-card" key={index}>
                      <h3>{pkg.name}</h3>
                      <p>From: {pkg.from}</p>
                      <p>To: {pkg.to}</p>
                      <p>Quantity: {pkg.quantity}</p>
                      <p>Status: {pkg.status}</p>
                    </div>
                  ))}
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