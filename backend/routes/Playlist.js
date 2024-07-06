const express = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist = require("../models/Playlist");
const User= require("../models/User");
const Song = require("../models/Songs");


//create a playlist
router.post("/create",passport.authenticate("jwt",{session:false}),async (req,res) =>{
const currentUser = req.user;
const {name, thumbnail, songs} =  req.body;

if(!name || !thumbnail || !songs){
    return res.status(301).json({message: "Insufficient data"})
}
const playlistData =  {
    name,
    thumbnail,
    songs,
    owner : currentUser._id,
    collaborators:[],
};

const playlist = await Playlist.create(playlistData);
return res.status(200).json(playlist);
})

//get a playlist by Id
//we will get playlist id as a route parameter and we will return playlist having that id
router.get("/get/playlist/:playlistId",passport.authenticate("jwt",{session:false}),async (req,res) =>{
     const playlistId = req.params.playlistId;

     const playlist = await Playlist.findOne({_id:playlistId}).populate({
        path: "songs",
        populate :{
            path: "artist",
        }
    });
     if(!playlist){
        return res.status(301).json({message: "Invalid ID"})
     }
     return res.status(200).json(playlist);
})

//get all playlist made by me
router.get("/get/me",passport.authenticate("jwt",{session:false}),async (req,res) =>{
    const artistId = req.user._id;

    const artist = await User.find({_id:artistId});
   

    const playlists = await Playlist.find({owner:artistId}).populate("owner");
    return res.status(200).json({data:playlists});
})


//get all playlist made by an artist
router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async (req,res) =>{
    const artistId = req.params.artistId;

    const artist = await User.find({_id:artistId});
    if(!artist){
        return res.status(304).json({message: "Invalid Artist ID"})
    }

    const playlists = await Playlist.find({owner:artistId});
    return res.status(200).json({data:playlists});
})

//adda song to a playlist
router.post("/add/song",passport.authenticate("jwt",{session:false}),async (req,res) =>{
 const currentUser = req.user;

 const{playlistId, songId} = req.body;

//step0 : get the playlist if valid
const playlist = await Playlist.findOne({_id:playlistId});

if(!playlist){
    return res.status(404).json({message: "Playlist does not exist!"})
}

//Step 1: check if it currentuser is a owner or a collaborator 
if(!playlist.owner.equals(currentUser._id) &&
  !playlist.collaborators.includes(currentUser._id)){
    return res.status(403).json({message: "Not allowed!"})
}


//step 2: check if the song is a valid song
const song = Song.find({_id:songId});
if(!song){
    return res.status(403).json({message: "Song does not exist!"})
}


//step 3; we can now simple add a song to playlist
playlist.songs.push(songId);
await playlist.save();
return res.status(200).json(playlist);
})

module.exports = router;