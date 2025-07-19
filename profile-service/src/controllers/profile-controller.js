
require('dotenv').config();

const UserProfile = require('../models/User')
const {getChannel,connectRabbitMQ} = require('../rabbitmq')

const SetupProfile = async function(userData){

  try{

const {id, email, username} = userData;

const profile = new UserProfile({
  userId : id,
  email,
  username,
})

await profile.save()



  }catch(e){

console.error("Error creating profile:", e);

  }


}

module.exports = {SetupProfile}