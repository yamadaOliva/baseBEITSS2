const socketIO = require('socket.io');
const { createNotification } = require('./notificationService');

let io;
function initializeSocket(server) {
  io = socketIO(server, {cors: {origin: "*"}});
  
  io.on('connection', (socket) => {
    socket.on('sendNotification', async (data) => {
      const notification = await createNotification(data);
      
      io.emit('newNotification', notification)
    })
  });
}

function getSocket() {
  return io;
}

module.exports = {initializeSocket, getSocket};