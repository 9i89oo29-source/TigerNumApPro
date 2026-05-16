let ioInstance = null;

module.exports = (io) => {
  ioInstance = io;
  io.on('connection', (socket) => {
    console.log('New socket connection:', socket.id);

    socket.on('joinOrder', (orderId) => {
      socket.join(orderId);
    });

    socket.on('leaveOrder', (orderId) => {
      socket.leave(orderId);
    });
  });
};

exports.getIO = () => ioInstance;
