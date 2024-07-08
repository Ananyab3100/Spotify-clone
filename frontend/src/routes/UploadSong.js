import React,{useState} from 'react';
import spotifylogo from "../assets/images/spotify_logo_white.svg";
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react/dist/iconify.js'
import TextWithHover from '../components/shared/TextWithHover';
import TextInput from '../components/shared/TextInput';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
import {useNavigate} from "react-router-dom";
import LoggedInContainer from '../containers/LoggedInContainer';


const UploadSong = () => {
  // console.log(window);
  // console.log(window.cloudinary);

  const [name, setName] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [playlistUrl, setPlaylistUrl] = useState();
  const[uploadedSongFileName,setUploadedSongFileName] = useState();
  const navigate = useNavigate();
  


  const submitSong = async() =>{
    
    const data = {
      name, thumbnail,track:playlistUrl
    }
    const response = await makeAuthenticatedPOSTRequest("/song/create" , data);
    if(response.err){
      alert("Could not create song");
      return;
    }
    alert("success!");
    navigate("/home");
    
  }

  return (



<div className="h-full">
<LoggedInContainer >
 
<div  className="content p-8 pt-0 overflow-auto">
    <div class = "text-2xl font-semibold  mb-5 text-white mt-8">
      Upload Your Music
    </div> 
    <div className="w-2/3 flex space-x-3">
    <div className="w-1/3">
    <TextInput label = "Name" labelClassName={"text-white"} placeholder="Name" value={name} setValue={setName}/>
    </div>
    <div className="w-1/3">
    <TextInput label ="Thumbnail" labelClassName={"text-white"} placeholder="Thumbnail" value={thumbnail} setValue={setThumbnail}/>
    </div>
    </div>
    <div  className ="py-5">
     {uploadedSongFileName ? (
      <div className ="bg-white rounded-full p-3 w-1/3">
        {uploadedSongFileName }
      </div>
     ): (
   <CloudinaryUpload setUrl ={setPlaylistUrl} setName ={setUploadedSongFileName}/>
     ) 
     }
   </div>
 </div>
  
<div className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold ml-10"
  onClick={submitSong}>
    Submit Song
  </div>

</LoggedInContainer>
   </div>
  )
};


const PlaylistView =({titleText,cardsData}) =>{
  return(
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-3">
        <Card title="Peaceful Piano" 
        description="Relax and indulge with beautiful piano pieces."
        imageurl ="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlhbm98ZW58MHx8MHx8fDA%3D"
        />
        <Card title="Deep Focus" 
        description="Keep calm and focus with music."
        imageurl ="https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3R1ZHl8ZW58MHx8MHx8fDA%3D"/>
        <Card title="Instrumental Study" 
        description="Focus with soft study in the background."
        imageurl ="https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlvbGlufGVufDB8fDB8fHww"/>
        <Card title="Focus Flow" 
        description="Up temp instrumental hip hop beats."
        imageurl ="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvcmt8ZW58MHx8MHx8fDA%3D"/>
        <Card title="Beats to think to" 
        description="Focus with deep techno and techhouse."
        imageurl ="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8fDA%3D"/>
        </div>

    </div>
  )
}

const Card =({title,description,imageurl}) =>{
return(
  <div className="bg-black bg-opacity-60 w-1/5 px-4 py-2 rounded-lg">
    <div className="pb-4 pt-2">
      <img className="w-full rounded"
        src={imageurl} />
    </div>
    <div className="text-white  font-semibold py-3">{title}</div>
    <div className="text-gray-500 text-sm">{description}</div>
  </div>
)
}

export default UploadSong;

