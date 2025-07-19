
require('dotenv').config()

const {connectRabbitMQ, getChannel} = require('../rabbitmq')

const bcrypt =require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const registerUser = async function(req,res){

  try{

    const {username, email , password} = req.body;

    console.log("Debug 1");
    
    
    const checkExistingUser = await User.findOne({email});

    if(checkExistingUser){
      return res.status(400).json({
        success : false,
        message: 'Cannot Use Registered Email'

      })
      }

      else{
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  })

  await newUser.save()


  // Here doing the sending data part to profile-service

  const channel = getChannel();
  const queue = 'USER_REGISTERED';

   await channel.assertQueue(queue , {durable: true});

   const payload = {
    id: newUser._id,
    email:newUser.email,
    username: newUser.username

   }

   channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), {
    persistent: true
   })
     
   console.log(" Sent USER_REGISTERED :", payload);
   

  if(newUser){
    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    })
  }else{
    res.status(404).json({
      success: false,
      message: 'Unable to register user'
    })
  }

}


  }catch(e){
console.error('Registration error', e);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!! Try again',
      error: e.message 
    })
  }

}



const loginUser = async function(req,res){

  try{

    const {email , password } = req.body;

    if(!email && !password){
      return res.status(404).json({
        success:false,
        message: "Please Provide Credentails"
      })
    }

    const CheckUser = await User.findOne({email})
    
    if(!CheckUser){
      return res.status(400).json({
        success: false,
        message: "Please use a registered email"
      })
    }
    
     const isPasswordMatch = await bcrypt.compare(password, CheckUser.password)

     if(!isPasswordMatch){
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      })
     }

      const accessToken = jwt.sign({
        userId : CheckUser._id,
        username : CheckUser.username,
        email : CheckUser.email
      }, process.env.JWT_SECRET , {
        expiresIn: '10m'
      })

      res.status(200).json({
        success: true,
        data: accessToken,
        message: `Hello ${CheckUser.username} !! , Welcome Back !!!`,
        id: CheckUser._id
      })

  }catch(e){



  }

}


module.exports = {registerUser, loginUser}