import React, { useEffect, useState } from 'react';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers'; // Adjust this import based on your server helper functions

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    // Fetch liked songs from the backend upon component mount
    const fetchLikedSongs = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/likedSongs"); // Adjust the endpoint based on your backend route
        if (response.success) {
          setLikedSongs(response.data); // Assuming response.data is an array of liked songs
        } else {
          console.error("Failed to fetch liked songs:", response.error);
        }
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };

    fetchLikedSongs();
  }, []);

  return (
    <div className="h-full w-full bg-app-black text-white">
      <h1 className="text-3xl font-bold py-8">Liked Songs</h1>
      <div className="flex flex-wrap">
        {likedSongs.map((song) => (
          <div key={song._id} className="w-1/4 p-4">
            <img src={song.thumbnail} alt="song" className="w-full rounded-lg" />
            <div className="mt-2 text-sm font-semibold">{song.name}</div>
            <div className="text-xs text-gray-500">{song.artist.firstName} {song.artist.lastName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedSongs;
