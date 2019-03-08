
const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on("error", function(callback) {
     console.log(`Unable to connect to database, date: ${new Date()}`);
});

db.once("open", function(callback) {
     console.log(`Connected to Database, date: ${new Date()}`);
 });

module.exports = { mongoose };
