const socketIo = require("socket.io");
const userModel = require("./model/user.model")
const captainModel = require("./model/caption.model")

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*", 
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            // if (!data || !data.userId || !data.userType) {
            //     console.error('Invalid data received in join event:', data);
            //     return;
            // }
        
            const { userId, userType } = data;
        
            console.log(userId, userType);
        
            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else {
                    console.error('Invalid userType:', userType);
                }
            } catch (err) {
                console.error('Error updating socketId in database:', err);
            }
        });
        

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.log('Socket.io not initialized');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
