import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [packages, setPackages] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const { email } = location.state;
            const q = query(collection(db, 'drivers'), where('email', '==', email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setUserDetails(querySnapshot.docs[0].data());
                fetchPackages(email);
            } else {
                // Handle case when user is not found
            }
        };

        const fetchPackages = async (email) => {
            const q = query(collection(db, 'packages'), where('driverId', '==', email));
            const querySnapshot = await getDocs(q);
            setPackages(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        if (location.state && location.state.email) {
            fetchUserDetails();
        } else {
            // Handle case when email is not provided
        }
    }, [location.state]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/signin');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="container">
            <h1>Profile</h1>
            {userDetails ? (
                <>
                    <h2>User Details</h2>
                    <p>Name: {`${userDetails.firstName} ${userDetails.lastName}`}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>Phone: {userDetails.phone}</p>
                    <p>Date of Birth: {userDetails.dob}</p>
                    <p>License Number: {userDetails.licenseNumber}</p>
                    <p>Insurance Number: {userDetails.insuranceNumber}</p>
                    <h2>Packages</h2>
                    <h3>Delivered Packages</h3>
                    <ul>
                        {packages
                            .filter((pkg) => pkg.status === 'delivered')
                            .map((pkg) => (
                                <li key={pkg.id}>{pkg.name}</li>
                            ))}
                    </ul>
                    <h3>Current Packages</h3>
                    <ul>
                        {packages
                            .filter((pkg) => pkg.status !== 'delivered')
                            .map((pkg) => (
                                <li key={pkg.id}>{pkg.name}</li>
                            ))}
                    </ul>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;