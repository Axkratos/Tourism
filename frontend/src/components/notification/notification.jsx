import React, { useState } from 'react';

const TripRequestNotification = () => {
    // Dummy data for notification
    const [notification, setNotification] = useState({
        status: 'accepted', // Change to 'rejected' for testing rejection
        guideEmail: 'sita@example.com',
        touristEmail: 'tourist@gmail.com',
        location: 'Kathmandu 44600, Nepal',
        priceBid: '999',
        dateFrom: '2025-01-03',
        dateTo: '2025-01-05',
    });

    return (
        <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Trip Request Notification</h2>
            <div className="mb-4">
                <p><strong>Guide:</strong> {notification.guideEmail}</p>
                <p><strong>Tourist:</strong> {notification.touristEmail}</p>
                <p><strong>Location:</strong> {notification.location}</p>
                <p><strong>Date From:</strong> {notification.dateFrom}</p>
                <p><strong>Date To:</strong> {notification.dateTo}</p>
                <p><strong>Price Bid:</strong> {notification.priceBid}</p>
            </div>

            {/* Notification Status */}
            <div className="mt-4">
                {notification.status === 'accepted' ? (
                    <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                        <strong>Trip Accepted!</strong> Your trip with guide {notification.guideEmail} has been accepted.
                    </div>
                ) : notification.status === 'rejected' ? (
                    <div className="p-4 bg-red-100 text-red-800 rounded-lg">
                        <strong>Trip Rejected!</strong> Your trip with guide {notification.guideEmail} has been rejected.
                    </div>
                ) : (
                    <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                        Waiting for decision on the trip request.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TripRequestNotification;
