import React,{useContext, useState,useEffect,useLayoutEffect,useRef} from 'react';
import spotifylogo from "../assets/images/spotify_logo_white.svg";
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react/dist/iconify.js'
import TextWithHover from '../components/shared/TextWithHover';
import {Howl, Howler} from 'howler';
import songContext from '../context/songContext';
import CreatePlaylistModal from '../modals/CreatePlaylistModal';
import AddToPlaylistModal from '../modals/AddToPlaylistModal';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
import { useNavigate } from 'react-router-dom';

const LoggedInContainer = ({children,curActiveScreen,onClick}) => {
 const[createPlaylistModalOpen,setCreatePlaylistModalOpen] = useState(false);
 const[addToPlaylistModalOpen,setAddToPlaylistModalOpen] = useState(false);
 const [likedSongs, setLikedSongs] = useState([]); // State to store liked songs

  const {currentSong, setCurrentSong,soundPlayed ,setSoundPlayed,isPaused, setIsPaused}  = useContext(songContext);
  

  // console.log(currentSong);
  // console.log(soundPlayed);

  const firstUpdate = useRef(true);

 useLayoutEffect(() =>{

  if(firstUpdate.current){
   firstUpdate.current = false;
   return;
  }

 if(!currentSong){
 return;
 }
 changeSong(currentSong.track);
  },[currentSong && currentSong.track]);


  const addSongToPlaylist = async(playlistId) =>{

    const songId = currentSong._id;
   const payload ={playlistId,songId};
   //console.log(payload);
   const response = await makeAuthenticatedPOSTRequest("/playlist/add/song",payload);
   //console.log(response);
   if(response._id){
    setAddToPlaylistModalOpen(false);
   }
    
   
  }

  const playSound = () =>{
    if(!soundPlayed){
      return;
    }
   soundPlayed.play();
  }

  const changeSong = (songSrc) =>{
    if(soundPlayed){
        soundPlayed.stop();
    }
   let sound = new Howl({
    src: [songSrc],
    html5: true
  });
  setSoundPlayed(sound);
  sound.play();
  setIsPaused(false);
}

const pauseSound = () =>{
  soundPlayed.pause();
}

const togglePlayPause = () =>{
  if(isPaused){
    playSound();
    setIsPaused(false);
  }
  else{
    pauseSound();
    setIsPaused(true);
  }
}


const navigate = useNavigate();

  return (
   
  
    <div className='h-full w-full bg-app-black'>
      
      {createPlaylistModalOpen  && <CreatePlaylistModal closeModal={() => setCreatePlaylistModalOpen(false)}/> }

      {addToPlaylistModalOpen  && <AddToPlaylistModal closeModal={() => setAddToPlaylistModalOpen(false)}
      addSongToPlaylist={addSongToPlaylist}
      /> 
      }


    <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
    
    <div className='h-full w-1/5 bg-black flex flex-col justify-between'>
    <div>
      
         {/*This is first left div*/}
         <div className='logodiv p-5'>
          <img src={spotifylogo} alt="spotifyLogo" width="125"/>
         </div>
         <div className="py-5">
            <IconText iconName="material-symbols-light:home" displayText="Home" targetLink="/home" active={curActiveScreen === "home"}/>
            <IconText iconName="fluent:search-16-filled" displayText="Search" targetLink="/search" active={curActiveScreen === "search"}/>
            <IconText iconName="icomoon-free:books" displayText="Library" targetLink="/library" active={curActiveScreen === "library"}/> 
            <IconText iconName="material-symbols:library-music" displayText="My Music" targetLink="/myMusic" active={curActiveScreen === "myMusic"}/>   
         </div>

        <div className="pt-5">
        <IconText iconName="icon-park-solid:add" displayText="Create Playlist" 
        onClick ={() =>{setCreatePlaylistModalOpen(true)}}/> 
        <IconText iconName="solar:heart-bold" displayText="Liked Songs"/> 
        </div>

       
       </div>

        <div className='px-5 pb-5'>
        <div className="border border-gray-100 text-white w-3/5 flex items-center justify-center rounded-full py-1 hover:border-white cursor-pointer">
        <Icon icon="ph:globe" />
        <div className="ml-2 text-sm font-semiBold">English</div> 
        </div>
        </div>
    </div>

    <div className='h-full w-4/5 bg-app-black overflow-auto z-0'>
         {/*This is second right div*/}
         <div className="navbar w-full h-1/10 bg-black opacity-70 flex items-center justify-end">
          <div className="w-1/2 flex h-full">

          <div className="w-2/3 flex justify-around items-center">
          <TextWithHover displayText={"Premium"}/>
          <TextWithHover displayText={"Support"}/>
          <TextWithHover displayText={"Download"}/>
          <div className="h-1/2 border border-white"></div>
          </div>

       

          <div className="w-2/5 flex justify-around h-full items-center">
          <TextWithHover displayText={"Upload song"} onClick={() => navigate("/uploadSong")}/>
          <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
            AB
          </div>
          </div>
          </div>
         </div>

         <div className="content p-8 pt-0 overflow-auto">
          {children}
          </div>
         

    </div>

    </div>
    

     {currentSong  && 
   <div className ='h-1/10 w-full bg-black opacity-90 text-white flex items-center px-4'>
    <div className ="w-1/4 flex items-center"> 
   <img src= {currentSong.thumbnail}
    alt="songpic" className="h-14 w-14 rounded"/>
    <div className ="pl-4">
      <div className="text-sm hover:underline cursor-pointer">{currentSong.name}</div>
      <div className ="text-xs hover:underline cursor-pointer">{currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
    </div>
    </div>

    <div className="w-1/2 h-full flex justify-center flex-col  items-center">
      <div className="flex justify-between w-1/2 items-center">
        {/* controls for playing song go here */}
        <Icon icon="ph:shuffle-fill" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>
        <Icon icon="material-symbols:skip-previous-outline" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>
        <Icon  icon={isPaused ? "gridicons:play" : "zondicons:pause-solid"} fontSize={50} className="cursor-pointer text-gray-500 hover:text-white"
        onClick ={togglePlayPause}/>
        <Icon icon="material-symbols:skip-next-outline" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>
        <Icon icon="material-symbols:repeat" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>

      </div>
    </div>

    <div className="w-1/4 flex justify-end pr-4 space-x-4">
    <Icon icon="tabler:playlist-add" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"
    onClick={() =>{
      setAddToPlaylistModalOpen(true);
    }} />
    <Icon icon="solar:heart-bold" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"
    
    />
    </div>
   </div>
    }
    </div>
    
  )
};




export default LoggedInContainer;
