
const mongoose = require('mongoose');

const ConnectToDB = async function() {
  
  try{

    await mongoose.connect(process.env.MONGO_URL);
    console.log('Mongo DB successfully connected');
    

  }catch(e){
 console.error("mongo Connection failed , error = ", e)
 process.exit(1)
  }

}

module.exports = ConnectToDB