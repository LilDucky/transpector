var express = require("express");
var bodyParser = require("body-parser");
// var mongodb = require("mongodb");
// var ObjectID = mongodb.ObjectID;

// var CONTACTS_COLLECTION = "contacts";

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

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
console.log(distDir);
app.use(express.static(distDir));

// // Create a database variable outside of the database connection callback to reuse the connection pool in your app.
// var db;

// Connect to the database before starting the application server.
// mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  // if (err) {
  //   console.log(err);
  //   process.exit(1);
  // }

  // Save database object from the callback for reuse.
  // db = client.db();
  // console.log("Database connection ready");

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
// });

// CONTACTS API ROUTES BELOW

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
  res.status(200).json(TRANSMITTERS);
});

app.post("/api/transmitters", function(req, res) {
  var newTransmitter = req.body;
  if (!req.body.id) {
    handleError(res, "Invalid user input", "Must provide an ID.", 400);
  } else {
    TRANSMITTERS.push(newTransmitter);
    // res.status(201).json(doc.ops[0]);
    res.status(201);
  }
});

/*  "/api/transmitters/:id"
 *    GET: find transmitter by id
 *    PUT: update transmitter by id
 *    DELETE: deletes transmitter by id
 */

app.get("/api/transmitters/:id", function(req, res) {
  var transmitter = TRANSMITTERS.find(function(e) {
    return req.params.id === e.id;
  });
  if (transmitter) {
    res.status(200).json(transmitter);
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
  // TODO: implement
  // db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
  //   if (err) {
  //     handleError(res, err.message, "Failed to delete contact");
  //   } else {
  //     res.status(200).json(req.params.id);
  //   }
  // });
});
