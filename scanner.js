const Transmitter = require('xdrip-js');
const cp = require('child_process');

module.exports = (io) => {
  const listenForTransmitters = () => {
    worker = cp.fork(__dirname + '/transmitter-worker', ['000000'], {
      env: {
        DEBUG: 'transmitter'
      }
    });

    worker.on('message', m => {
      if (m.msg == 'sawTransmitter') {
        io.emit('sawTransmitter', m.data);
      }
    });
  };

  listenForTransmitters();
};
