import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, update } from 'firebase/database';
import { database, auth } from '../firebase';

import './DriverCurrentPackages.css';

function DriverCurrentPackages() {
  const [currentPackages, setCurrentPackages] = useState([]);
  const [driverId, setDriverId] = useState(null);

  useEffect(() => {
    const assign = auth.onAuthStateChanged(user => {
      if (user) {
        setDriverId(user.uid);
      } else {
        setDriverId(null);
      }
    });

    return () => assign();
  }, []);

  useEffect(() => {
    if (driverId) {
      const packagesRef = ref(database, 'packages');

      onValue(packagesRef, (snapshot) => {
        const data = snapshot.val();
        const packagesArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        const assignedPackages = packagesArray.filter(pkg => pkg.driverId === driverId && pkg.status !== 'Delivered');
        setCurrentPackages(assignedPackages);
      });
    }
  }, [driverId]);

  const handleMarkDelivered = (packageId) => {
    const packageRef = ref(database, `packages/${packageId}`);
    update(packageRef, { status: 'Delivered' })
      .then(() => {
        setCurrentPackages(prevPackages =>
          prevPackages.filter(pkg => pkg.id !== packageId)
        );
      })
      .catch((error) => {
        console.error('Error marking package as delivered: ', error);
      });
  };

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
                  {pkg.status !== 'Delivered' && (
                    <button onClick={() => handleMarkDelivered(pkg.id)}>Deliver</button>
                  )}
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