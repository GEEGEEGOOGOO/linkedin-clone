// test-db.js
require('dotenv').config();
const mongoose = require('mongoose');

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Connection error:', err.message);
  }
}
run();
