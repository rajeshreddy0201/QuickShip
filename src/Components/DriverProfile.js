import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const DriverProfile = () => {
  const [driverDetails, setDriverDetails] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      const user = auth.currentUser;
      const driverRef = collection(db, 'drivers');
      const q = query(driverRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setDriverDetails(doc.data());
      });
    };

    const fetchPackages = async () => {
      const user = auth.currentUser;
      const packagesRef = collection(db, 'packages');
      const q = query(packagesRef, where('driverEmail', '==', user.email));
      const querySnapshot = await getDocs(q);
      const packagesList = [];
      querySnapshot.forEach((doc) => {
        packagesList.push(doc.data());
      });
      setPackages(packagesList);
    };

    fetchDriverDetails();
    fetchPackages();
  }, []);

  if (!driverDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>Driver Profile</h1>
      <p>First Name: {driverDetails.firstName}</p>
      <p>Last Name: {driverDetails.lastName}</p>
      <p>Phone: {driverDetails.phone}</p>
      <p>Email: {driverDetails.email}</p>
      <p>License Number: {driverDetails.licenseNumber}</p>
      <p>Insurance Number: {driverDetails.insuranceNumber}</p>
      <h2>Current Packages</h2>
      <ul>
        {packages.map((pkg, index) => (
          <li key={index}>{pkg.packageDetails} - {pkg.address}</li>
        ))}
      </ul>
    </div>
  );
};

export default DriverProfile;
