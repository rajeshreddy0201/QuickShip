import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";

const DriverHome = () => {
    const [packages, setPackages] = useState([]);
    const location = useLocation();
    const { email } = location.state;

    useEffect(() => {
        const fetchPackages = async () => {
            const q = query(collection(db, "packages"), where("driverId", "==", email));
            const querySnapshot = await getDocs(q);
            setPackages(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchPackages();
    }, [email]);

    const markAsDelivered = async (packageId) => {
        const packageRef = doc(db, "packages", packageId);
        await updateDoc(packageRef, { status: "delivered" });
    };

    return (
        <div className="container">
            <h1>Driver Home</h1>
            <h2>My Packages</h2>
            <div>
                <label htmlFor="packageFilter">Filter by Status:</label>
                <select id="packageFilter">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                </select>
            </div>
            <ul>
                {packages.map(pkg => (
                    <li key={pkg.id}>
                        {pkg.name} - {pkg.address} - {pkg.status}
                        <button onClick={() => markAsDelivered(pkg.id)} disabled={pkg.status === "delivered"}>
                            {pkg.status === "delivered" ? "Delivered" : "Mark as Delivered"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DriverHome;