import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import DriverHistory from './DriverHistory';
import './DriverCurrentPackages.css';

function DriverCurrentPackages() {
  const [currentPackages, setCurrentPackages] = useState([]);

  useEffect(() => {
    const driverId = 'driverId'; // Replace with actual driver ID from authentication context
    const packagesRef = ref(database, 'packages');

    onValue(packagesRef, (snapshot) => {
      const data = snapshot.val();
      const packagesArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      const assignedPackages = packagesArray.filter(pkg => pkg.driverId === driverId);
      setCurrentPackages(assignedPackages);
    });
  }, []);

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
            <Route path="/driverhistory" element={<DriverHistory />} />
          </Routes>
          <div className="packages-page">
            <h2>Current Packages</h2>
            <div className="packages-grid">
              {currentPackages.map((pkg, index) => (
                <div className="package-card" key={pkg.id}>
                  <h3>{pkg.name}</h3>
                  <p>From: {pkg.from}</p>
                  <p>To: {pkg.to}</p>
                  <p>Quantity: {pkg.quantity}</p>
                  <p>Status: {pkg.status}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DriverCurrentPackages;