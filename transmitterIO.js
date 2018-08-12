const Transmitter = require('xdrip-js');
const cp = require('child_process');

// consider making this an id-indexed object
const transmitters = [
  {id: '416SA4', nickname: 'G5 1'},
  {id: '4G2DT7', nickname: 'G5 2'},
];

module.exports = (io) => {
  const pending = [];
  const listenToTransmitter = (id) => {
    worker = cp.fork(__dirname + '/transmitter-worker', [id], {
      env: {
        DEBUG: 'transmitter'
      }
    });

    worker.on('message', m => {
      if (m.msg == 'getMessages') {
        // if (!txStatus || (moment().diff(txStatus.timestamp, 'minutes') > 25)) {
        //   pending.push({type: 'BatteryStatus'});
        // }

        worker.send(pending);
        // NOTE: this will lead to missed messages if the rig
        // shuts down before acting on them, or in the
        // event of lost comms
        // better to return something from the worker
        io.emit('pending', pending);
      } else if (m.msg == 'glucose') {
        const glucose = m.data;

//        console.log('got glucose: ' + glucose.glucose + ' unfiltered: ' + glucose.unfiltered/1000);
        io.emit('glucose', m.data);
      } else if (m.msg == 'messageProcessed') {
        // TODO: check that dates match
        pending.shift();
        io.emit('pending', pending);
      } else if (m.msg == 'calibrationData') {
//        processG5CalData(m.data);
      } else if (m.msg == 'batteryStatus') {
//        processBatteryStatus(m.data);
      } else if (m.msg == 'sawTransmitter') {
      }
    });

    /*eslint-disable no-unused-vars*/
    worker.on('exit', (m) => {
    /*eslint-enable no-unused-vars*/

      worker = null;

      // Receive results from child process
      console.log('exited');

      timerObj = setTimeout(() => {
        // Restart the worker after 1 minute
        listenToTransmitter(id);
      }, 1 * 60000);
    });
  };

  transmitters.forEach((transmitter) => {
    listenToTransmitter(transmitter.id);
  });

  return {
    getTransmitters: () => {
      return transmitters;
    },
    // TODO: consider just adding by id
    addTransmitter: (transmitter) => {
      transmitters.push({id: transmitter.id, nickname: transmitter.id});
      listenToTransmitter(transmitter.id);
      return transmitters[transmitters.length - 1];
    },
    deleteTransmitter: (id) => {
      // TODO: stop listening for this transmitter
      const idx = transmitters.findIndex(e => {
        return e.id === id;
      })
      transmitters.splice(idx, 1);
    }
  }
};

// const id = '416SA4';
// const transmitter = new Transmitter(id);
//
// transmitter.on('glucose', glucose => console.log(`got glucose at ${glucose.readDate}: ${glucose.glucose}, filtered: ${glucose.filtered}, unfiltered: ${glucose.unfiltered}`));
// transmitter.on('calibrationData', calibration => console.log(`calibration data: last calibrated at ${calibration.glucose} on ${calibration.date}`));
// transmitter.on('batteryStatus', status => console.log(`battery status: ${status.status}, voltagea: ${status.voltagea}, voltageb: ${status.voltageb}`));
//
// var TRANSMITTERS = [
//   { id: '400000', nickname: 'G5 1' },
//   { id: '400001', nickname: 'G5 2' },
//   { id: '400002', nickname: 'G5 3' },
//   { id: '400003', nickname: 'G5 4' },
//   { id: '400004', nickname: 'G5 5' },
//   { id: '400005', nickname: 'G5 6' },
//   { id: '400006', nickname: 'G5 7' },
//   { id: '400007', nickname: 'G5 8' },
//   { id: '400008', nickname: 'G5 9' },
//   { id: '400009', nickname: 'G5 10' }
// ];
