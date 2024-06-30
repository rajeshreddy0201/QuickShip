import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import DriverList from './DriverList';
import History from './History';
import { ref, push, set, onValue, remove } from 'firebase/database';
import { database } from '../firebase';
import './CurrentPackages.css';

function CurrentPackages({ addPackage }) {
  const [packageList, setPackageList] = useState([]);
  const [newPackage, setNewPackage] = useState({
    name: '',
    from: '',
    to: '',
    quantity: ''
  });

  useEffect(() => {
    const packagesRef = ref(database, 'packages');
    onValue(packagesRef, (snapshot) => {
      const data = snapshot.val();
      const packagesArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setPackageList(packagesArray);
    });
  }, []);

  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.from || !newPackage.to || !newPackage.quantity) {
      alert('All fields are required');
      return;
    }

    const newPackageRef = push(ref(database, 'packages'));
    set(newPackageRef, newPackage)
      .then(() => {
        setNewPackage({ name: '', from: '', to: '', quantity: '' });
      })
      .catch((error) => {
        console.error('Error adding package: ', error);
      });
  };

  const handleDeletePackage = (id) => {
    remove(ref(database, `packages/${id}`))
      .then(() => {
        setPackageList(packageList.filter(pkg => pkg.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting package: ', error);
      });
  };

  const handleChange = (e) => {
    setNewPackage({
      ...newPackage,
      [e.target.name]: e.target.value
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
          <Routes>
            <Route path="/history" element={<History />} />
            <Route path="/driverlist" element={<DriverList />} />
          </Routes>
          <div className="packages-page">
            <h2>Current Packages</h2>
            <table className="packages-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Package Name</th>
                  <th>From Address</th>
                  <th>To Address</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packageList.map((pkg, index) => (
                  <tr key={pkg.id}>
                    <td>{index + 1}</td>
                    <td>{pkg.name}</td>
                    <td>{pkg.from}</td>
                    <td>{pkg.to}</td>
                    <td>{pkg.quantity}</td>
                    <td>
                      <button className="assign-button">Assign Package</button>
                      <button className="delete-button" onClick={() => handleDeletePackage(pkg.id)}>Delete Package</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="add-package-form">
              <input
                type="text"
                name="name"
                placeholder="Package Name"
                value={newPackage.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="from"
                placeholder="From Address"
                value={newPackage.from}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="to"
                placeholder="To Address"
                value={newPackage.to}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newPackage.quantity}
                onChange={handleChange}
                required
              />
              <button className="add-package-button" onClick={handleAddPackage}>Add Package</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CurrentPackages;