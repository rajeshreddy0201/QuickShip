import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const AdminProfile = () => {
  const [drivers, setDrivers] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const driversRef = collection(db, 'drivers');
      const querySnapshot = await getDocs(driversRef);
      const driversList = [];
      querySnapshot.forEach((doc) => {
        driversList.push(doc.data());
      });
      setDrivers(driversList);
    };

    const fetchPackages = async () => {
      const packagesRef = collection(db, 'packages');
      const querySnapshot = await getDocs(packagesRef);
      const packagesList = [];
      querySnapshot.forEach((doc) => {
        packagesList.push(doc.data());
      });
      setPackages(packagesList);
    };

    fetchDrivers();
    fetchPackages();
  }, []);

  return (
    <div>
      <h1>Admin Profile</h1>
      <h2>Drivers List</h2>
      <ul>
        {drivers.map((driver, index) => (
          <li key={index}>{driver.firstName} {driver.lastName} - {driver.email}</li>
        ))}
      </ul>
      <h2>Packages List</h2>
      <ul>
        {packages.map((pkg, index) => (
          <li key={index}>{pkg.packageDetails} - {pkg.driverEmail} - {pkg.address}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProfile;
