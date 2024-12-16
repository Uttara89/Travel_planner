import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

function MyTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    console.log('User email:', user.email);

    try {
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
      const querySnapshot = await getDocs(q);
      const userTrips = [];
      querySnapshot.forEach((doc) => {
        console.log('Document data:', doc.data());
        userTrips.push({ id: doc.id, ...doc.data() });
      });
      console.log('Setting user trips:', userTrips);
      setTrips(userTrips);
    } catch (error) {
      console.error('Error getting user trips:', error);
    }
  };

  useEffect(() => {
    console.log('Trips state updated:', trips);
  }, [trips]);

  return (
    <div>
      <h1>My Trips</h1>
      <ul>
        {trips.length > 0 ? (
          trips.map((trip) => (
            <li key={trip.id}>{trip.tripData.tripName}</li>
          ))
        ) : (
          <li>No trips found</li>
        )}
      </ul>
    </div>
  );
}

export default MyTrips;