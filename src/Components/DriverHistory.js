// src/Components/DriverHistory.js
import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import './DriverHome.css'; // Use the same CSS as DriverHome for consistency

function DriverHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const driverId = 'driverId'; // Replace with actual driver ID from authentication context
    const packagesRef = ref(database, `drivers/${driverId}/packages`);

    onValue(packagesRef, (snapshot) => {
      const data = snapshot.val();
      const packagesArray = data ? Object.values(data).filter(pkg => pkg.status === 'Delivered') : [];
      setHistory(packagesArray);
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
          <h2>Delivered Packages</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>From Address</th>
                <th>To Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((pkg, index) => (
                <tr key={index}>
                  <td>{pkg.name}</td>
                  <td>{pkg.from}</td>
                  <td>{pkg.to}</td>
                  <td>{pkg.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default DriverHistory;