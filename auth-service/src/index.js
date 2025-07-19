require('dotenv').config();

const express = require('express');
const ConnectToDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const { connectRabbitMQ } = require('./rabbitmq'); // Adjust path if needed

const app = express();
const PORT = process.env.PORT;

async function start() {
  try {
    // Connect to DB
    await ConnectToDB();

    // Connect to RabbitMQ and wait for connection
    await connectRabbitMQ();

    app.use(express.json());
    app.use('/api/auth', authRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
    });
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
}

start();
