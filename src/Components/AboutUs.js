import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-page">
      <aside className="sidebar">
        <div className="logo">QuickShip</div>
        <ul className="sidebar-menu">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/driverlist">Drivers</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/current-packages">Current Packages</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/">Log Out</Link></li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>About Us</h1>
        </header>
        <section className="content">
          <div className="about-section">
            <h2>Welcome to QuickShip</h2>
            <p>
              QuickShip is a premier package delivery system designed to streamline and simplify the process of getting packages from point A to point B. Our platform connects administrators and drivers, ensuring efficient and reliable delivery services.
            </p>
            <p>
              Our mission is to provide fast, secure, and reliable delivery services. We understand the importance of timely deliveries and the trust our customers place in us to handle their packages with care. 
            </p>
            <h2>Our Team</h2>
            <p>
              We have a dedicated team of professionals who are committed to providing the best delivery service experience. From our customer service representatives to our drivers, each member of our team plays a crucial role in ensuring your packages are delivered on time and in perfect condition.
            </p>
            <h2>Contact Us</h2>
            <p>
              If you have any questions or need assistance, feel free to contact us:
              <br />
              Email: support@quickship.com
              <br />
              Phone: +1 234 567 890
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;