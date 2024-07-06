//How to create a model

//Step 1: require mongoose
const mongoose = require("mongoose");


//Step 2: create mongoose schema(structure of user)
const Song = mongoose.Schema({
     name:{
       type: String,
       required: true,
        
    },
    thumbnail:{
        type:String,
        required: true,
    },
    track: {
        type:String,
        required: true, 
    },
    artist:{
      type:mongoose.Types.ObjectId,
      ref: "User",

    }
    
});

//Step 3: create a model

const SongModel =  mongoose.model("Song" , Song);

module.exports = SongModel;