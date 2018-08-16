var express = require("express");
var bodyParser = require("body-parser");

const socketIO = require('socket.io');
const Transmitter = require('./transmitter');

const transmitters = [];

var TRANSMITTERS = [
  { id: '400000', nickname: 'G5 1' },
  { id: '400001', nickname: 'G5 2' },
  { id: '400002', nickname: 'G5 3' },
  { id: '400003', nickname: 'G5 4' },
  { id: '400004', nickname: 'G5 5' },
  { id: '400005', nickname: 'G5 6' },
  { id: '400006', nickname: 'G5 7' },
  { id: '400007', nickname: 'G5 8' },
  { id: '400008', nickname: 'G5 9' },
  { id: '400009', nickname: 'G5 10' }
];


// var mongodb = require("mongodb");
// var ObjectID = mongodb.ObjectID;

// var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// // Create a database variable outside of the database connection callback to reuse the connection pool in your app.
// var db;

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// TransmitterIO(io.of('/cgm')); // TODO: not sure if we need namespaces
//const transmitterIO = TransmitterIO(io); // TODO: not sure if we need namespaces
transmitters.push(Transmitter('416SA4', io));
transmitters.push(Transmitter('4G2DT7', io));

// API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/transmitters"
 *    GET: finds all transmitters
 *    POST: creates a new transmitter
 */

app.get("/api/transmitters", function(req, res) {
  const status = [];
  transmitters.forEach((transmitter) => {
    status.push(transmitter.status);
  });
  res.status(200).json(status);
});

app.post("/api/transmitters", function(req, res) {
  var id = req.body.id;
  if (!id) {
    handleError(res, "Invalid user input", "Must provide an ID.", 400);
  } else {
    const newTransmitter = Transmitter(id)
    transmitters.push(Transmitter(id));
    res.status(201).json(newTransmitter.status);
  }
});

/*  "/api/transmitters/:id"
 *    GET: find transmitter by id
 *    PUT: update transmitter by id
 *    DELETE: deletes transmitter by id
 */

app.get("/api/transmitters/:id", function(req, res) {
  // put this method in TransmitterIO
  var transmitter = transmitters.find(function(e) {
    return req.params.id === e.id;
  });
  if (transmitter) {
    res.status(200).json(transmitter.status);
  } else {
    handleError(res, "blah", "Failed to get transmitter");
  }
});

app.put("/api/transmitters/:id", function(req, res) {
  // TODO: implement
  // var updateDoc = req.body;
  // delete updateDoc._id;
  //
  // db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
  //   if (err) {
  //     handleError(res, err.message, "Failed to update contact");
  //   } else {
  //     updateDoc._id = req.params.id;
  //     res.status(200).json(updateDoc);
  //   }
  // });
});

app.delete("/api/transmitters/:id", function(req, res) {
  // TODO: handle errors
  var transmitter = transmitters.find(function(e) {
    return req.params.id === e.id;
  });
  // stop listening for this transmitter
  transmitter.cleanup();
  const idx = transmitters.findIndex(e => {
    return e.id === id;
  })
  transmitters.splice(idx, 1);
});

// prevent error message on reloads as per https://stackoverflow.com/a/35284602
app.get('/*', function(req, res){
  res.sendFile(distDir + '/index.html');
});
