const Transmitter = require('xdrip-js');
const cp = require('child_process');

module.exports = (id, io) => {
  let readDate = null;
  let activationDate = null;
  let state = null;
  let status = null;
  let rssi = null;
  let worker = null;

  let voltagea = null;
  let voltageb = null;
  let resist = null;
  let runtime = null;
  let temperature = null;

  const pending = [];

  const listenToTransmitter = (id) => {
    worker = cp.fork(__dirname + '/transmitter-worker', [id], {
      env: {
        DEBUG: 'transmitter,bluetooth-manager'
      }
    });

    worker.on('message', m => {
      if (m.msg == 'getMessages') {
        // if (!txStatus || (moment().diff(txStatus.timestamp, 'minutes') > 25)) {
        pending.push({type: 'BatteryStatus'});
        // }

        // if (id === '41MLX0') {
        //   worker.send([{type: 'BatteryStatus'}, {type: 'ResetTx'}]);
        // } else {
          worker.send([{type: 'BatteryStatus'}]);
          // worker.send([{type: 'ResetTx'}]);
        // }

        // NOTE: this will lead to missed messages if the rig
        // shuts down before acting on them, or in the
        // event of lost comms
        // better to return something from the worker
        io.emit('pending', pending);
      } else if (m.msg == 'glucose') {
        const glucose = m.data;
        readDate = glucose.readDate;
        activationDate = glucose.transmitterStartDate;
        state = glucose.state;
        status = glucose.status;
        rssi = glucose.rssi;

//        console.log('got glucose: ' + glucose.glucose + ' unfiltered: ' + glucose.unfiltered/1000);
        io.emit('glucose', m.data);
      } else if (m.msg == 'messageProcessed') {
        // TODO: check that dates match
        pending.shift();
        io.emit('pending', pending);
      } else if (m.msg == 'calibrationData') {
//        processG5CalData(m.data);
      } else if (m.msg == 'batteryStatus') {
        console.log('got battery status')
        const batteryStatus = m.data;
        // this.status = data.readUInt8(1);
        voltagea = batteryStatus.voltagea;
        voltageb = batteryStatus.voltageb;
        resist = batteryStatus.resist;
        runtime = batteryStatus.runtime;
        temperature = batteryStatus.temperature;
        console.log(`got battery status: voltagea = ${voltagea}`)
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

  listenToTransmitter(id);

  return {
    get id() {
      return id;
    },
    get status() {
      return {
        id,
        readDate,
        activationDate,
        state,
        status,
        rssi,
        pending,
        voltagea,
        voltageb,
        resist,
        runtime,
        temperature
      };
    },
    cleanup() {
      worker.kill();
      worker = null;
    },
    sendCommand(command) {
      pending.push(command);
    }
    // getTransmitters: () => {
    //   return transmitters;
    // },
    // addTransmitter: (id) => {
    //   transmitters.push({id, glucose: null});
    //   listenToTransmitter(id);
    //   transmitters[transmitters.length - 1];
    // },
    // deleteTransmitter: (id) => {
    //   // TODO: stop listening for this transmitter
    //   const idx = transmitters.findIndex(e => {
    //     return e.id === id;
    //   })
    //   transmitters.splice(idx, 1);
    // }
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
