import { BrowserRouter,Routes, Route, Navigate} from 'react-router-dom';
import './output.css';
import LoginComponent from './routes/Login';
import LoggedInHomeComponent from './routes/LoggedInHome';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import UploadSong from './routes/UploadSong';
import MyMusic from './routes/MyMusic';
import SearchPage from './routes/SearchPage';
import Library from './routes/Library';
import SinglePlaylistView from './routes/SinglePlaylistView';
import { useCookies } from 'react-cookie';
import  songContext  from './context/songContext';
import { useState } from 'react';
import LikedSongs from './routes/LikedSongs';


function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const[soundPlayed ,setSoundPlayed ] = useState(null);
  const[isPaused, setIsPaused]= useState(true);

  const [ cookie, setCookie] = useCookies(["token"]);
  console.log(cookie.token);
  return (
   
    <div className="App w-screen h-screen font-poppins">
      <BrowserRouter>
      {cookie.token ? (
        <songContext.Provider value={{currentSong, setCurrentSong,soundPlayed ,setSoundPlayed,isPaused, setIsPaused}}>
      <Routes>
      
        <Route path="/" element={<LoginComponent/>}></Route>
        <Route path="/signup" element={<SignupComponent/>}></Route>
        <Route path="/home" element={<LoggedInHomeComponent/>}></Route>
        <Route path="/uploadSong" element={<UploadSong/>}></Route>
        <Route path="/myMusic" element={<MyMusic/>}></Route>
        <Route path="/search" element={<SearchPage/>}></Route>
        <Route path="/library" element={<Library/>}></Route>
        <Route path="/playlist/:playlistId" element={<SinglePlaylistView/>}></Route>
        <Route path="/likedSongs" element={<LikedSongs />} />
        <Route path="*" element={<Navigate to="/home"/>}></Route>
      
      </Routes>
      </songContext.Provider>
      ) 
      :  (
        <Routes>
        <Route path="/home" element={<HomeComponent/>}></Route>
        <Route path="/login" element={<LoginComponent/>}></Route>
        <Route path="/signup" element={<SignupComponent/>}></Route>
        <Route path="*" element={<Navigate to="login"/>}></Route>
        </Routes>
      )
}
      </BrowserRouter> 
    </div>
   
  );
}

export default App;
