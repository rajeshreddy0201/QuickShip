import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, set, onValue, remove } from 'firebase/database'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { database, auth } from '../firebase'; 
import './DriverList.css';

function DriverList({ addDriver }) {
  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const driversRef = ref(database, 'drivers');
    onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      const driversList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setDrivers(driversList);
    });
  }, []);

  const handleAddDriver = () => {
    if (
      !newDriver.name ||
      !newDriver.phoneNumber ||
      !newDriver.email ||
      !newDriver.password
    ) {
      alert('All fields are required');
      return;
    }

    const driverData = { ...newDriver };

    createUserWithEmailAndPassword(auth, newDriver.email, newDriver.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const newDriverRef = ref(database, 'drivers/' + user.uid); 
        set(newDriverRef, driverData)
          .then(() => {
            setNewDriver({ name: '', phoneNumber: '', email: '', password: '' });
            setShowForm(false);
            console.log('Driver added successfully');
          })
          .catch((error) => {
            console.error('Error adding driver to database: ', error);
          });
      })
      .catch((error) => {
        console.error('Error creating driver account: ', error);
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

  const handleDeleteDriver = (id) => {
    remove(ref(database, `drivers/${id}`))
      .then(() => {
        setDrivers(prevDrivers => prevDrivers.filter(driver => driver.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting driver: ', error);
      });
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
          <div className="drivers-list">
            <h2>Drivers List</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td>{driver.name}</td>
                    <td>{driver.phoneNumber}</td>
                    <td>{driver.email}</td>
                    <td>{'*'.repeat(driver.password.length)}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDeleteDriver(driver.id)}>Delete</button>
                    </td>
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newDriver.password}
                  onChange={handleChange}
                  required
                />
                <button className="submit-button" onClick={handleAddDriver}>Submit</button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default DriverList;