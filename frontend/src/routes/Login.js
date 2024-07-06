import React,{useState}  from 'react';
import {useCookies} from 'react-cookie';
import { useNavigate} from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
import {Icon} from "@iconify/react"
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { Link } from 'react-router-dom';;






const LoginComponent = () => {

  const [email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const login = async() =>{
    
  const data = {email, password};
  //console.log(data);

  const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
  if(response && !response.err){
  console.log(response);
  const token = response.token;
  const date = new Date();
  date.setDate(date.getDate() + 365);
  setCookie("token",token, {path: "/" , expires:date});
  alert("Success");
  navigate("/home");
  }
  else{
    alert("Failure")
  }

  };

  
  return (
    <div className='w-full h-full flex flex-col items-center'>
    <div className="logo p-4 border-b border-solid border-gray-300 w-full flex justify-center">
    <Icon icon="logos:spotify" width="160"/>
    </div>
    <div className ="inputRegion w-1/3 py-8 flex item-center justify-center flex-col">
    <div className="font-bold mb-2 text-center">To continue, login to Spotify.</div>
    <TextInput label="Email address or username" placeholder="Email address or username" className="my-6"
    value ={email}
    setValue = {setEmail}
    />
    <PasswordInput label="Password" placeholder="Password"
     value ={password}
     setValue = {setPassword}/>
   
    
    <div className="w-full flex items-center justify-end mt-10">
    <button className='bg-green-400 text-lg font-semibold p-3 px-10 rounded-full'
    onClick ={(e) =>{
   e.preventDefault();
   login();
    }}
    >LOG IN</button>
    </div>
    <div className=' w-full border border-solid border-gray-300 mt-5'></div>
    <div className="my-6 font-bold text-lg text-center">
        Don't have an account?
    </div>
    <div className="border border-gray-500 text-gray-500 font-bold flex item-center justify-center py-4 rounded-full">
        <Link to="/signup">
        SIGN UP FOR SPOTIFY
        </Link>
    </div>
    </div>
    </div>
  )
}

export default LoginComponent
