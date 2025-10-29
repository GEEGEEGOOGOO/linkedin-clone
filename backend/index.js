require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// connect to MongoDB
connectDB();

// middleware
app.use(cors()); // for dev you can allow all origins; lock down in prod
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

// basic health route
app.get('/', (req, res) => res.send('API running'));

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
