const mongoose = require("mongoose");

const Grid = require('gridfs-stream');

const DB_URL = process.env.DB_URL

const connectDB = async () => {
  // console.log('DB_URL: ', DB_URL)
  try {
    await mongoose.connect(DB_URL);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};


let gfs;
(() => {
  mongoose.connection.on("connected", () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
  });
})();


module.exports = {connectDB, gfs};
