import { useState } from 'react';
import React from 'react'
import TextInput from '../components/shared/TextInput';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';

const CreatePlaylistModal = ({closeModal}) => {

  const[playlistName, setPlaylistName] = useState("");
  const[playlistThumbnail, setPlaylistThumbnail] = useState("");


  const handleClick = (e) => {
    e.stopPropagation(); // Prevent clicks inside the modal content from closing it
  };

  const createPlaylist = async() =>{
    const response = await makeAuthenticatedPOSTRequest("/playlist/create",{name:playlistName,
      thumbnail:playlistThumbnail,
      songs:[]
    })
    if(response._id){
      closeModal();
    }
  }

  return (
    <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    onClick={closeModal}
  >
    <div className="bg-app-black w-1/3 p-4 rounded" onClick={handleClick}>
    <div className="text-white mb-5 font-semibold text-lg">Create Playlist</div>
    <div className="space-y-4 flex flex-col justify-center items-center">
      <TextInput
      label ="Name"
      labelClassName ={"text-white"}
      placeholder = "Playlist Name" 
      value ={playlistName}
      setValue ={setPlaylistName}
      />
        <TextInput
      label ="Thumbnail"
      labelClassName ={"text-white"}
      placeholder = "Thumbnail" 
      value ={playlistThumbnail}
      setValue ={setPlaylistThumbnail}
      />
      <div className='bg-white w-1/3 rounded flex font-semibold justify-center items-center p-2 cursor-pointer' onClick={createPlaylist}>Create</div>
    </div>
    </div>
  </div>
  )
}

export default CreatePlaylistModal
