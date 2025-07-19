require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const ConnectToDB = require('./database/db');
const { getChannel, connectRabbitMQ } = require('./rabbitmq');
const { SetupProfile } = require('./controllers/profile-controller');
// const ProfileRoute = require('./routes/profile-route')

async function start() {
  try {
    
    await connectRabbitMQ();

    // Now get the channel safely
    const channel = getChannel();

   await channel.assertQueue('USER_REGISTERED', { durable: true });

    channel.consume('USER_REGISTERED', async (msg) => {
      if (msg !== null) {
        const userData = JSON.parse(msg.content.toString());
        try {
          await SetupProfile(userData);
          channel.ack(msg);
        } catch (e) {
          console.error('Error processing message', e);
          // Optionally do not ack here to retry later
        }
      }
    });

    // Connect to MongoDB
    await ConnectToDB();

    // Middleware
    app.use(express.json());
    // app.use('/api/auth' , ProfileRoute)

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.error('Error during startup:', err);
    process.exit(1);
  }
}

// Start the app
start();
