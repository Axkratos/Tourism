import { Server } from 'socket.io';

export default function startSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Update with your frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('notification', (data) => {
            console.log('Received notification:', data);

            // Emit notification to the receiver email
            const { receiverEmail, notification } = data;
            io.emit(`notification-${receiverEmail}`, {
                content: data.content,
                createdAt: new Date(),
            });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
}