import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CurrentPackages from './CurrentPackages';
import DriverList from './DriverList';
import History from './History';
import './AdminHome.css';

function AdminHome({ totalDrivers, totalPackages }) {
  return (
    <div className="admin-home-page">
      <aside className="sidebar">
        <div className="logo">QuickShip</div>
        <ul className="sidebar-menu">
          <li><Link to="/AdminHome">Home</Link></li>
          <li><Link to="/DriverList">Drivers</Link></li>
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
            <Route path="/drivers" element={<DriverList />} />
          </Routes>
          <Routes>
            <Route path="/drivers" element={null} />
            <Route path="*" element={
              <>
                <h1>Hi, Welcome to QuickShip</h1>
                <h1 className="summary">Total Summary</h1>
                <div className="summary-grid">
                  <div className="summary-card">
                    <h3>Total Packages</h3>
                    <p>{totalPackages}</p>
                  </div>
                  <div className="summary-card">
                    <h3>Total Drivers</h3>
                    <p>{totalDrivers}</p>
                  </div>
                </div>
              </>
            } />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default AdminHome;