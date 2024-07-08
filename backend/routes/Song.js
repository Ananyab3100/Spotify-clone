const express = require("express");
const passport = require("passport");
const router = express.Router();
const  Song  = require("../models/Songs");
const User = require("../models/User");


router.post("/create" ,passport.authenticate("jwt",{session:false}) ,async(req,res) =>{
   //req.user gets user because of  passport.authenticate;
   const{name, thumbnail,track} = req.body;

   if(!name || !thumbnail || !track){
    return res.status(301).json({message: "Insufficient details to create song."})
   }
   const artist = req.user._id;

   const songDetails = {name, thumbnail, track,artist};
   const createSong = await Song.create(songDetails);

   return res.status(200).json(createSong);
});


router.get("/get/mySongs" ,passport.authenticate("jwt",{session:false}) ,async(req,res) =>{
  
   
   const songs = await Song.find({artist: req.user._id}).populate("artist");
   return res.status(200).json({data:songs});

})

//get route to get all songs any artist has published
router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}) ,async(req,res) =>{
    const {artistId} = req.params;

    const artist = await User.findOne({_id: artistId});
    //console.log(artist);
    // empty array
    //User.find will give empty array 
    //![] = false
    //!null = true
    //!undefined = true

    //we can check if artist exist or not
    if(!artist){
        return res.status(301).json({message:"Artist does not exist"})
    }

    const songs = await Song.find({artist:artistId});
    return res.status(200).json({data:songs})
})


//get route to get a single song by  name
router.get("/get/songname/:songName",passport.authenticate("jwt",{session:false}) ,async(req,res) =>{
    const {songName} = req.params;


    const songs = await Song.find({name: songName}).populate("artist");
    return res.status(200).json({data:songs})
})





module.exports = router;
