import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { ref, push, set } from 'firebase/database'; 
import History from './History';
import CurrentPackages from './CurrentPackages';
import { database } from '../firebase'; 
import './DriverList.css';

function DriverList({ addDriver }) {
  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: ''
  });

  const handleAddDriver = () => {
    if (
      !newDriver.name ||
      !newDriver.phoneNumber ||
      !newDriver.email ||
      !newDriver.username ||
      !newDriver.password
    ) {
      alert('All fields are required');
      return;
    }

    const driverData = { ...newDriver };
    const newDriverRef = push(ref(database, 'drivers')); 

    set(newDriverRef, driverData)
      .then(() => {
        setDrivers([...drivers, driverData]);
        setNewDriver({ name: '', phoneNumber: '', email: '', username: '', password: '' });
        setShowForm(false);
        addDriver(driverData);
      })
      .catch((error) => {
        console.error('Error adding driver: ', error);
      });
  };

  const handleChange = (e) => {
    setNewDriver({
      ...newDriver,
      [e.target.name]: e.target.value
    });
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

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
            <Route path="/driverlist" element={<DriverList addDriver={addDriver} />} />
          </Routes>
          <div className="drivers-list">
            <h2>Drivers List</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => (
                  <tr key={index}>
                    <td>{driver.name}</td>
                    <td>{driver.phoneNumber}</td>
                    <td>{driver.email}</td>
                    <td>{driver.username}</td>
                    <td>{driver.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!showForm && (
              <button className="add-driver-button" onClick={handleShowForm}>Add Driver</button>
            )}
            {showForm && (
              <div className="add-driver-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newDriver.name}
                  onChange={handleChange}
                  pattern="[A-Za-z ]{1,}"
                  title="Name should only contain letters and spaces."
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={newDriver.phoneNumber}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  title="Phone number should be 10 digits."
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newDriver.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={newDriver.username}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newDriver.password}
                  onChange={handleChange}
                  required
                />
                <button className="add-driver-button" onClick={handleAddDriver}>Submit</button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default DriverList;