import React from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css'

function ContactUs() {
  return (
    <div className="contacts-page">
      <aside className="sidebar">
        <div className="logo">QuickShip</div>
        <ul className="sidebar-menu">
          <li><Link to="/">Home</Link></li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Contact Us</h1>
        </header>
        <section className="content">
          <div className="contacts-section">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have a question about our services, need assistance with a delivery, or just want to provide feedback, our team is here to help.
            </p>
            <h2>Customer Support</h2>
            <p>
              Email: support@quickship.com
            </p>
            <p>
              Phone: 1-800-123-4567
            </p>
            <h2>Head Office</h2>
            <p>
              Address: 123 QuickShip Lane, FastCity, FC 12345
            </p>
            <p>
              Phone: 1-800-123-4567
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ContactUs;