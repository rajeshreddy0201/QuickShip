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
import DriverCurrentPackages from './Components/DriverCurrentPackages';
import DriverHistory from './Components/DriverHistory'; // Import the new component
import { database } from './firebase';
import { ref, onValue } from 'firebase/database';
//test
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
    const newDriverKey = ref(database, 'drivers').push().key;
    ref(database, 'drivers/' + newDriverKey).set(driver);
  };

  const addPackage = (packageDetails) => {
    const newPackageKey = ref(database, 'packages').push().key;
    ref(database, 'packages/' + newPackageKey).set(packageDetails);
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
        <Route path="/driver-current-packages" element={<DriverCurrentPackages />} />
        <Route path="/driverhistory" element={<DriverHistory />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;
