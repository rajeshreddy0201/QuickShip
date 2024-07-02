import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import DriverList from './DriverList';
import CurrentPackages from './CurrentPackages';
import { database } from '../firebase';
import './History.css';

function History() {
  const [packageHistory, setPackageHistory] = React.useState([]);

  React.useEffect(() => {
    const packagesRef = ref(database, 'packages');
    onValue(packagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPackageHistory(Object.entries(data).map(([id, pkg], index) => ({ id, index: index + 1, ...pkg })));
      }
    });
  }, []);

  return (
    <div className="admin-home-page">
      <aside className="sidebar">
        <div className="logo">QuickShip</div>
        <ul className="sidebar-menu">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/driverlist">Drivers</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/current-packages">Current Packages</Link></li>
          <li><Link to="/">Log Out</Link></li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Admin Inbox</h1>
        </header>
        <section className="content">
          <Routes>
            <Route path="/history" element={<History />} />
            <Route path="/current-packages" element={<CurrentPackages />} />
            <Route path="/driverlist" element={<DriverList />} />
          </Routes>
          <div className="history-page">
            <h2>Package History</h2>
            <table className="history-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Package Name</th>
                  <th>From Address</th>
                  <th>To Address</th>
                  <th>Quantity</th>
                  <th>Driver</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {packageHistory.map((pkg, index) => (
                  <tr key={pkg.id}>
                    <td>{index + 1}</td>
                    <td>{pkg.name}</td>
                    <td>{pkg.from}</td>
                    <td>{pkg.to}</td>
                    <td>{pkg.quantity}</td>
                    <td>{pkg.driver}</td>
                    <td>{pkg.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
export default History;