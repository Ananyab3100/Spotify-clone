import React from 'react';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import LoggedInContainer from '../containers/LoggedInContainer';
import SingleSongCard from '../components/shared/SingleSongCard';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';

const SinglePlaylistView = () => {
    const {playlistId} = useParams();
    const [playlistDetails,setPlaylistDetails] = useState({});
    console.log(playlistDetails);

    useEffect(() =>{
        const getData = async() =>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/playlist/"+playlistId);  
            console.log(response);
            setPlaylistDetails(response)
        }
        
        getData();

    },[])

  return (
    <div className="h-full">
 <LoggedInContainer curActiveScreen={"library"}>
    {playlistDetails._id && 
    <div>
        
 <div className="text-white text-xl pt-8">{playlistDetails.name}</div>
 <div className ="pt-10 space-y-3">
            {playlistDetails.songs.map((item) =>{
                return <SingleSongCard info={item}
                 key={JSON.stringify(item)}
                 playSound ={() => {}}/>
                 
            })}
</div>
</div>}

 </LoggedInContainer>
    </div>
  )
}

export default SinglePlaylistView
