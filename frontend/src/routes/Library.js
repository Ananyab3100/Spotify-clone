import React from 'react';
import { useEffect,useState } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer'
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import { useNavigate } from 'react-router-dom';

const Library = () => {
    const [myPlaylists, setMyPlaylists] = useState([]);
   

    useEffect(() =>{
        const getData = async() =>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
           // console.log(response.data);
            setMyPlaylists(response.data);
        };
        getData();
    },[])
  return (
    <LoggedInContainer curActiveScreen={"library"}>
    <div className="text-white text-xl pt-8">My Playlist</div>
    <div className="py-5 grid gap-5 grid-cols-5">
        {myPlaylists.map(item =>{
            return (
                <Card key={JSON.stringify(item)}
                    title={item.name}
                    description={item.description}
                    imageurl ={item.thumbnail}
                    playlistId={item._id}
                 />
            )
        })}
        
    </div>
    </LoggedInContainer>
  )
};

const Card =({title,description,imageurl,playlistId}) =>{
  const navigate = useNavigate();
    return(
      <div className="bg-black bg-opacity-60 w-full p-4  rounded-lg cursor-pointer" onClick={() =>{
      navigate("/playlist/"+playlistId)
      }}>
        <div className="pb-4 pt-2">
          <img className="w-full rounded-md"
            src={imageurl} />
        </div>
        <div className="text-white  font-semibold py-3">{title}</div>
        <div className="text-gray-500 text-sm">{description}</div>
      </div>
    )
    }

export default Library
