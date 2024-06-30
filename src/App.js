import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import AdminHome from './Components/AdminHome';
import DriverHome from './Components/DriverHome';
import DriverList from './Components/DriverList';
import History from './Components/History';
import CurrentPackages from './Components/CurrentPackages';
import { database } from './firebase';
import { ref, onValue, push, set } from 'firebase/database';

function App() {
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [totalPackages, setTotalPackages] = useState(0);

  useEffect(() => {
    const driversRef = ref(database, 'drivers');
    onValue(driversRef, (snapshot) => {
      const driversData = snapshot.val();
      setTotalDrivers(driversData ? Object.keys(driversData).length : 0);
    });
    const packagesRef = ref(database, 'packages');
    onValue(packagesRef, (snapshot) => {
      const packagesData = snapshot.val();
      setTotalPackages(packagesData ? Object.keys(packagesData).length : 0);
    });
  }, []);

  const addDriver = (driver) => {
    const newDriverRef = push(ref(database, 'drivers'));
    set(newDriverRef, driver);
  };

  const addPackage = (packageDetails) => {
    const newPackageRef = push(ref(database, 'packages'));
    set(newPackageRef, packageDetails);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup addDriver={addDriver} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/adminhome" element={<AdminHome totalDrivers={totalDrivers} totalPackages={totalPackages} />} />
        <Route path="/driverhome" element={<DriverHome />} />
        <Route path="/driverlist" element={<DriverList addDriver={addDriver} />} />
        <Route path="/history" element={<History />} />
        <Route path="/current-packages" element={<CurrentPackages addPackage={addPackage} />} />
      </Routes>
    </Router>
  );
}

export default App;