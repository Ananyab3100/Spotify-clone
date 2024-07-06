const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helper");

const router = express.Router();

//This post route will help to register a user
router.post("/register",async (req,res) =>{
    //This code is run when /register api is called as a POST request

    //My req.body will be of below format
    const {email,password, firstName,lastName,userName} = req.body;

    
    //Step 2: Does a user with this email already exist? if, yes, throw a error
    const user = await User.findOne({email: email});

    if(user){
        //status code by default is 200 , if we just send res.json()
        return res.status(403).json({message : "A user with this email already exists!"})
    }//this is a invalid request
     

    //Step 3: as we cannot save passwords in plain text.
    // we convert palin text to hash for which we use we use bcrypt library
    const hashedPassword =await  bcrypt.hash(password,10);
    const newUserData = {email,
         password:hashedPassword, 
         firstName, 
         lastName, 
         userName};
    const newUser = await User.create(newUserData);
  

//Step 4: we want to craete the token to valiadte the user
  const token = await getToken(email, newUser);


  //Step 5: return the result to user
  const userToReturn = {...newUser.toJSON() , token};
  delete userToReturn.password;
  
  return res.status(200).json(userToReturn);
});

router.post("/login" ,async(req,res) =>{
    //Step 1: Get email and password sent by user
     const {email, password} = req.body;

    //Step 2: Check if a user with email exists . If not, credentials are invalid
    const user = await User.findOne({email:email})

    if(!user){
        return res.status(403).json({message: "Invalid credentials"});
    }


    //Step 3 : If the user exists, check if the password id correct. If not, credentials are incorrect
    //This is a tricky step because we have  stored the original password in a hashed form which we cannot use to get back original password
    //I cannot do password === user.password
    //xyz --->ksjdkashdisahdikh
    //My hasg of xyz depends on 2 parameters
    //If I keep those 2 parameters same, xyz will always give same hashedPassword.
    //bcrypt.comapare enabled us to compare 1 password in plaintext(password from req.body) to a hashed passowrd(the one in our db)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //this will be true or false
    if(!isPasswordValid){
        return res.status(403).json({message: " Invalid credentials"});
    }



    //Step 4: If credentials are correct, retrun a token to user
    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON() , token};
    delete userToReturn.password;
  
    return res.status(200).json(userToReturn);
})

module.exports = router;