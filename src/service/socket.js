const socketIO = require('socket.io');
const { createNotification } = require('./notificationService');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

let io;
function initializeSocket(server) {
  io = socketIO(server, {cors: {origin: "*"}});
  
  io.on('connection', (socket) => {});
}

function sendNotification(data) {
  return io.emit('newNotification', data);
}

module.exports = {initializeSocket, sendNotification};