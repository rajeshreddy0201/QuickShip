import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";


const AdminHome = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            const querySnapshot = await getDocs(collection(db, "packages"));
            setPackages(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchPackages();
    }, []);

    const assignDriver = async (packageId, driverId) => {
        const packageRef = doc(db, "packages", packageId);
        await updateDoc(packageRef, { driverId });
    };

    return (
        <div className="container">
            <h1>Admin Home</h1>
            <h2>Package List</h2>
            <ul>
                {packages.map(pkg => (
                    <li key={pkg.id}>
                        {pkg.name} - {pkg.address}
                        <button onClick={() => assignDriver(pkg.id, "driver@example.com")}>Assign Driver</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminHome;
