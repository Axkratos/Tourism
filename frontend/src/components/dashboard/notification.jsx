import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const NotificationComponent = () => {
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:3000'); // Update with your backend server URL
        setSocket(socket);

        // Listen for notifications for the current user's email (sita@example.com)
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            socket.on(`notification-${userEmail}`, (data) => {
                console.log('Received notification in client:', data);
                setNotifications(prevNotifications => [...prevNotifications, data]);
            });
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-center text-xl font-semibold mb-4 dark:text-white">Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index} className="mb-4 p-4 border dark:border-zinc-600 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{notification.content}</p>
                                <p className="text-sm text-gray-500">Received: {new Date(notification.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationComponent;
