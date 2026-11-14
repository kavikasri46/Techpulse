const mongoose = require('mongoose');

let isConnected = false;

const DEFAULT_MONGO_URI = 'mongodb+srv://kavikasri46_db_user:Kavika246@cluster0.ulib1zn.mongodb.net/zoho_blog?retryWrites=true&w=majority';

/**
 * Connect to MongoDB with friendly diagnostic handling
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // fail fast if mongod not running
    });

    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${uri}.`);
    console.warn(`[Database Warning] Reason: ${error.message}`);
    console.info(`[Database Info] If you are running locally, make sure MongoDB is started (e.g. 'mongod' or MongoDB Compass/Docker).`);
    console.info(`[Database Info] Backend will initialize memory fallback store so all APIs remain testable.`);
    return null;
  }
};

const getDbStatus = () => ({
  isConnected,
  uri: process.env.MONGO_URI || DEFAULT_MONGO_URI
});

module.exports = { connectDB, getDbStatus };

