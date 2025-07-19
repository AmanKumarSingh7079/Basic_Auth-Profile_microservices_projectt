require('dotenv').config()

const amqp = require('amqplib')

let channel = null;

async function connectRabbitMQ() {
  
  try{

    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    channel = await connection.createChannel();
    console.log('connected to rabit mq server')

  }catch(e){
 console.error('Failed to connect to rabbit mq server due to  : ' , e);
 process.exit(1)
 
  }

}

function getChannel(){

  if(!channel){
    throw new Error("RabbitMQ channel not initialized")
  }
return channel
}

module.exports = {connectRabbitMQ, getChannel}