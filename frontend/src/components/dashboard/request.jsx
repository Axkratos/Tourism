import React, { useState, useEffect } from 'react';

// Function to generate random profile image URL using Lorem Picsum
const generateRandomProfileImage = () => {
  const randomImageId = Math.floor(Math.random() * 1000) + 1; // Generates a number between 1 and 1000
  return `https://picsum.photos/seed/${randomImageId}/100`;
};

// Function to generate random user name
const generateRandomUserName = () => {
  const names = ['Anup Adhikari','Mamta paudel'];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

const TripsList = ({socketInstance}) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
  
    const fetchTrips = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/trip/get');
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        const tripsData = await response.json();
        setTrips(tripsData.map(trip => ({
          ...trip,
          userProfileImage: generateRandomProfileImage(),
          userName: generateRandomUserName()
        })));
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const handleAccept = (tripId) => {
    // Handle accept logic here
    console.log(`Accepted trip with ID: ${tripId}`);
    socketInstance.emit('accept', { "msg":'Your trip has been accepted' });

  };

  const handleDecline = (tripId) => {
    // Handle decline logic here
    console.log(`Declined trip with ID: ${tripId}`);
    socketInstance.emit('decline', { "msg":'Your trip has been declined' });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List of Request</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">User Profile</th>
              <th className="py-2 px-4">User Name</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Date From</th>
              <th className="py-2 px-4">Date To</th>
              <th className="py-2 px-4">Number of People</th>
              <th className="py-2 px-4">Price Bid</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {trips.map((trip) => (
              <tr key={trip._id} className="border-b border-gray-200">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <img
                      src={trip.userProfileImage}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full mr-2"
                    />
                  </div>
                </td>
                <td className="py-3 px-4">{trip.userName}</td>
                <td className="py-3 px-4">{trip.location}</td>
                <td className="py-3 px-4">{new Date(trip.dateFrom).toLocaleString()}</td>
                <td className="py-3 px-4">{new Date(trip.dateTo).toLocaleString()}</td>
                <td className="py-3 px-4">{trip.numPeople}</td>
                <td className="py-3 px-4">{trip.priceBid}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded mr-2"
                    onClick={() => handleAccept(trip._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                    onClick={() => handleDecline(trip._id)}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripsList;
