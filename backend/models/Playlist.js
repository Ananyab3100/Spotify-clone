//How to create a model

//Step 1: require mongoose
const mongoose = require("mongoose");


//Step 2: create mongoose schema(structure of user)
const Playlist = mongoose.Schema({
    name:{
       type: String,
       required: true,
        
    },
    thumbnail:{
        type:String,
        required: true,
    },
    owner:{
      type:mongoose.Types.ObjectId,
      ref: "User",

    },
    songs:[
        {
            type:mongoose.Types.ObjectId,
            ref: "Song",
        }
    ],
    
    collaborators:[
        {
            type:mongoose.Types.ObjectId,
            ref: "User",
        }
    ],
    
});

//Step 3: create a model

const PlaylistModel =  mongoose.model("Playlist" , Playlist);

module.exports = PlaylistModel;