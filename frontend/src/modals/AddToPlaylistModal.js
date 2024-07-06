import { useEffect,useState } from "react";
import React from 'react';
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const AddToPlaylistModal = ({closeModal,addSongToPlaylist}) => {
     const[myPlaylists,setMyPlaylists] = useState([]);
    const handleClick = (e) => {
        e.stopPropagation(); // Prevent clicks inside the modal content from closing it
      };

    useEffect(() =>{
        const getData = async() =>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
            //console.log(response.data);
            setMyPlaylists(response.data);
        };
        getData();
    },[])





  return (
    <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    onClick={closeModal}
  >
    <div className="bg-app-black w-1/3 p-4 rounded" onClick={handleClick}>
    <div className="text-white mb-5 font-semibold text-lg">Select Playlist</div>
    <div className="space-y-4 flex flex-col justify-center items-center">
    {myPlaylists.map((item) =>{
        return <PlaylistListComponent info={item} addSongToPlaylist={addSongToPlaylist} />
    })
}
    </div>
    </div>
  </div>
  )
};

const PlaylistListComponent = ({info,addSongToPlaylist}) =>{
    return(
        <div className="lovely bg-app-black w-full flex items-center space-x-4 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer"
        onClick={() => addSongToPlaylist(info._id)}>
            <div>
            <img src={info.thumbnail} className="h-10 w-10 rounded" alt="image"/>
            </div>
            <div className='text-white font-semibold text-sm'>
                {info.name}
            </div>
       
        </div>
    )
}

export default AddToPlaylistModal
