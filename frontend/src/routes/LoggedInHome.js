import React,{useState} from 'react';
import spotifylogo from "../assets/images/spotify_logo_white.svg";
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react/dist/iconify.js'
import TextWithHover from '../components/shared/TextWithHover';
import {Howl, Howler} from 'howler';
import LoggedInContainer from '../containers/LoggedInContainer';

const LoggedInHomeComponent = () =>{
  return(
  <LoggedInContainer curActiveScreen = "home">
  <PlaylistView titleText="Focus" />
  <PlaylistView titleText="Spotify Playlist"/>
  <PlaylistView titleText="Sound of India"/>
  </LoggedInContainer>
  )
  
}

// const LoggedInHomeComponent = () => {
//   const [currentSong, setCurrentSong] = useState(null);
//   const [soundPlayed, setSoundPlayed] = useState(null);
//   const [isPaused, setIsPaused] = useState(true);

//   const playSound = (songSrc) =>{
//     if(soundPlayed){
//         soundPlayed.stop();
//     }
//    let sound = new Howl({
//     src: [songSrc],
//     html5: true
//   });
//   setSoundPlayed(sound);
//   sound.play();

// }

// const pauseSound = () =>{
//   soundPlayed.pause();
// }

// const togglePlayPause = () =>{
//   if(isPaused){
//     playSound("https://res.cloudinary.com/ds69vlmh4/video/upload/v1717350246/lnwnxyxwutvmonzklxba.mp3");
//     setIsPaused(false);
//   }
//   else{
//     pauseSound();
//     setIsPaused(true);
//   }
// }

//   return (
//     <div className='baby h-full w-full bg-app-black'>
//     <div className='h-9/10 w-full flex'>
    
//     <div className='h-full w-1/5 bg-black flex flex-col justify-between'>
//     <div>
      
//          {/*This is first left div*/}
//          <div className='logodiv p-5'>
//           <img src={spotifylogo} alt="spotifyLogo" width="125"/>
//          </div>
//          <div className="py-5">
//             <IconText iconName="material-symbols-light:home" displayText="Home" active/>
//             <IconText iconName="fluent:search-16-filled" displayText="Search"/>
//             <IconText iconName="icomoon-free:books" displayText="Library"/> 
//             <IconText iconName="material-symbols:library-music" displayText="My Music"/>   
//          </div>

//         <div className="pt-5">
//         <IconText iconName="icon-park-solid:add" displayText="Create Playlist"/> 
//         <IconText iconName="solar:heart-bold" displayText="Liked Songs"/> 
//         </div>

       
//        </div>

//         <div className='px-5 pb-5'>
//         <div className="border border-gray-100 text-white w-3/5 flex items-center justify-center rounded-full py-1 hover:border-white cursor-pointer">
//         <Icon icon="ph:globe" />
//         <div className="ml-2 text-sm font-semiBold">English</div> 
//         </div>
//         </div>
//     </div>

//     <div className='h-full w-4/5 bg-app-black overflow-auto'>
//          {/*This is second right div*/}
//          <div className="navbar w-full h-1/10 bg-black opacity-70 flex items-center justify-end">
//           <div className="w-1/2 flex h-full">

//           <div className="w-2/3 flex justify-around items-center">
//           <TextWithHover displayText={"Premium"}/>
//           <TextWithHover displayText={"Support"}/>
//           <TextWithHover displayText={"Download"}/>
//           <div className="h-1/2 border border-white"></div>
//           </div>

       

//           <div className="w-2/5 flex justify-around h-full items-center">
//           <TextWithHover displayText={"Upload song"}/>
//           <div className="bg-white w-10 h-10 flex items-center jutsify-center rounded-full font-semibold cursor-pointer">
//             AB
//           </div>
//           </div>
//           </div>
//          </div>

//          <div className="content p-8 pt-0 overflow-auto">
//           <PlaylistView titleText="Focus"/>
//           <PlaylistView titleText="Spotify Playlist"/>
//           <PlaylistView titleText="Sound of India"/>
//           </div>
         

//     </div>
//     </div>
    
//    <div className ='h-1/10 w-full bg-black opacity-90 text-white flex items-center px-4'>
//     <div className ="w-1/4 flex items-center"> 
//    <img src="https://images.unsplash.com/photo-1696643830146-44a8755f1905?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D" 
//     alt="songpic" className="h-14 w-14 rounded"/>
//     <div className ="pl-4">
//       <div className="text-sm hover:underline cursor-pointer">Curtains</div>
//       <div className ="text-xs hover:underline cursor-pointer">Ed Sheeran</div>
//     </div>
//     </div>

//     <div className="w-1/2 h-full flex justify-center flex-col  items-center">
//       <div className="flex justify-between w-1/2 items-center">
//         {/* controls for playing song go here */}
//         <Icon icon="ph:shuffle-fill" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>
//         <Icon icon="material-symbols:skip-previous-outline" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>
//         <Icon  icon={isPaused ? "gridicons:play" : "zondicons:pause-solid"} fontSize={50} className="cursor-pointer text-gray-500 hover:text-white"
//         onClick ={togglePlayPause}/>
//         <Icon icon="material-symbols:skip-next-outline" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>
//         <Icon icon="material-symbols:repeat" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white"/>

//       </div>
//     </div>

//     <div className="w-1/4 flex justify-end">Hello</div>
//    </div>
//     </div>
//   )
// };


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

export default LoggedInHomeComponent;

