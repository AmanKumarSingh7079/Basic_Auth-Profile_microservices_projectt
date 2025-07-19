
require('dotenv').config()
const mongoose = require('mongoose');

const ConnectToDB = async function () {
  try{

    mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to Mongo in Profile-service');
    

  }catch(e){
console.error("Mongo connection failed" , e);
process.exit(1)

  }
}


module.exports = ConnectToDB