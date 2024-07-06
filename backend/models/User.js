//How to create a model

//Step 1: require mongoose
const mongoose = require("mongoose");


//Step 2: create mongoose schema(structure of user)
const User = mongoose.Schema({
    firstName:{
       type: String,
       required: true,
        
    },
    lastName:{
        type: String,
        required: false,
         
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        private : true,
    },
    userName:{
        type: String,
        required:true,
    },
    likedSongs:{
        type: String,
        default: "",
    },
    likedPlaylists:{
        type: String,
        default: "",
    },
    subscribedArtists:{
        type: String,
        default: "",
    }

});

//Step 3: create a model

const UserModel =  mongoose.model("User" , User);

module.exports = UserModel;