import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import AdminHome from './Components/AdminHome';
import DriverHome from './Components/DriverHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/driverhome" element={<DriverHome />} />
      </Routes>
    </Router>
  );
}

export default App;