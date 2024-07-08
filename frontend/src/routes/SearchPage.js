import React  from 'react'
import { useState } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { Icon } from '@iconify/react/dist/iconify.js';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import SingleSongCard from '../components/shared/SingleSongCard';

const SearchPage = () => {
    const [isInputFocused,setIsInputFocused] = useState(false);
    const[searchText, setSearchText] = useState("");
    const[songData, setSongData] = useState([]);
    

    const searchSong= async() =>{
        //the function to call serach api
       const response = await  makeAuthenticatedGETRequest("/song/get/songname/" + searchText);
    //    console.log(response);
       setSongData(response.data);
    //    setSearchText("");
       
    }

  return (
   <LoggedInContainer curActiveScreen="search">
    <div className="w-full py-6">
        <div className= {`w-1/3 p-3 text-sm rounded-full bg-gray-800 flex text-white space-x-3 items-center ${isInputFocused ? "border border-white" : ""}`}>
         <div><Icon icon="mdi:search" /></div>
        <input type="text"
        placeholder='What do you want to listen to?'
        className="w-full bg-gray-800  focus:outline-none"
       
        onFocus={() =>{
            setIsInputFocused(true);
        }}
        onBlur={() =>{
            setIsInputFocused(false);
        }}
        onChange={(e) =>{
            setSearchText(e.target.value);
        }}
        onKeyDown={(e) =>{
            if(e.key === "Enter") {
                searchSong();
               
            }
        }}
        />
        </div>
        { songData.length >0 ?
        (<div className ="pt-10 space-y-3">
            <p className="text-white">
            Showing search results for <span className ="font-bold">{searchText}</span> are :
            </p>
            {songData.map((item) =>{
                return <SingleSongCard info={item}
                 key={JSON.stringify(item)}
                 playSound ={() => {}}/>
                 
            })}
        </div>)
       : 
       <div className="pt-10 text-white">Nothing to show here</div>}
    </div>
   </LoggedInContainer>
  )
}

export default SearchPage
