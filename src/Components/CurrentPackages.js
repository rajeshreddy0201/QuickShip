import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, push, set, onValue, remove } from 'firebase/database';
import { database } from '../firebase';
import './CurrentPackages.css';

function CurrentPackages({ addPackage }) {
  const [packageList, setPackageList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [newPackage, setNewPackage] = useState({
    name: '',
    from: '',
    to: '',
    quantity: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState('');

  useEffect(() => {
    const packagesRef = ref(database, 'packages');
    onValue(packagesRef, (snapshot) => {
      const data = snapshot.val();
      const packagesArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setPackageList(packagesArray);
    });

    const driversRef = ref(database, 'drivers');
    onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      const driversArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setDriverList(driversArray);
    });
  }, []);

  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.from || !newPackage.to || !newPackage.quantity) {
      alert('All fields are required');
      return;
    }

    const newPackageRef = push(ref(database, 'packages'));
    set(newPackageRef, { ...newPackage, status: 'Not Assigned' })
      .then(() => {
        setNewPackage({ name: '', from: '', to: '', quantity: '' });
        setShowForm(false);
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

  const handleAssignPackage = (packageId) => {
    setSelectedPackageId(packageId);
    setShowAssignForm(true);
  };

  const handleConfirmAssign = () => {
    if (!selectedDriverId) {
      alert('Please select a driver');
      return;
    }

    const packageRef = ref(database, `packages/${selectedPackageId}`);
    const updatedPackage = packageList.find(pkg => pkg.id === selectedPackageId);
    const selectedDriver = driverList.find(driver => driver.id === selectedDriverId);
    set(packageRef, { ...updatedPackage, driverId: selectedDriverId, driverName: selectedDriver.name, status: 'Assigned' })
      .then(() => {
        setShowAssignForm(false);
        setSelectedPackageId(null);
        setSelectedDriverId('');
      })
      .catch((error) => {
        console.error('Error assigning package: ', error);
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
                  <th>Status</th>
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
                    <td>{pkg.status}</td>
                    <td>
                      <button className="assign-button" onClick={() => handleAssignPackage(pkg.id)}>Assign Package</button>
                      <button className="delete-button1" onClick={() => handleDeletePackage(pkg.id)}>Delete Package</button>
                    </td>
                  </tr>
                ))}
                {showForm && (
                  <tr>
                    <td></td>
                    <td><input type="text" name="name" placeholder="Package Name" value={newPackage.name} onChange={handleChange} required /></td>
                    <td><input type="text" name="from" placeholder="From Address" value={newPackage.from} onChange={handleChange} required /></td>
                    <td><input type="text" name="to" placeholder="To Address" value={newPackage.to} onChange={handleChange} required /></td>
                    <td><input type="number" name="quantity" placeholder="Quantity" value={newPackage.quantity} onChange={handleChange} required /></td>
                    <td></td>
                    <td><button className="add-package-button" onClick={handleAddPackage}>Add Package</button></td>
                  </tr>
                )}
              </tbody>
            </table>
            {!showForm && (
              <button className="add-package-button" onClick={() => setShowForm(true)}>Add Package</button>
            )}
            {showAssignForm && (
              <div className="assign-form">
                <h3>Assign Package</h3>
                <select value={selectedDriverId} onChange={(e) => setSelectedDriverId(e.target.value)}>
                  <option value="">Select Driver</option>
                  {driverList.map(driver => (
                    <option key={driver.id} value={driver.id}>{driver.name}</option>
                  ))}
                </select>
                <button className="confirm-button" onClick={handleConfirmAssign}>Confirm</button>
                <button className="cancel-button" onClick={() => setShowAssignForm(false)}>Cancel</button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CurrentPackages;