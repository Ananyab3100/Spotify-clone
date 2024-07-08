
import React,{useState} from 'react';
import {useCookies} from 'react-cookie';
import { useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import {Icon} from "@iconify/react"
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';

const SignupComponent = () => {

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [userName, setUserName] = useState("");
 const[password, setPassword] = useState("");
 const [firstName , setFirstName] =  useState("");
 const [lastName, setLastName]  = useState("");
 const [cookie, setCookie] = useCookies(["token"]);
 
 //const history = useHistory();
 const navigate = useNavigate();


  const signUp = async() =>{
    if( email !== confirmEmail){
      alert("Fields must match");
      return;
    }

  const data = {email, password, userName,firstName, lastName};
  //console.log(data);

  const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);
  if(response && !response.err){
  console.log(response);
  const token = response.token;
  const date = new Date();
  date.setDate(date.getDate() + 365);
  setCookie("token",token, {path: "/" , expires:date});
  alert("Success");
  navigate("/signup");
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
    <div className="font-bold mb-2 text-center text-2xl">Sign up for free to start listening.</div>
    <TextInput 
    label="Email address" 
    placeholder="Enter your email." 
    className="my-4"
     value ={email}
     setValue ={setEmail}
    />
    <TextInput 
    label="Confirm email address" 
    placeholder="Enter your email again." 
    className="mb-4"
    value ={confirmEmail}
    setValue = {setConfirmEmail}
    />
    <TextInput
     label="UserName" 
     placeholder="Enter your username." 
     className="mb-4"
     value = {userName}
     setValue ={setUserName}
   
    />
    <PasswordInput 
    label="Create Password"
     placeholder="Enter a strong password here."
     value ={password}
     setValue = {setPassword}
     />

    <div className="w-full flex justify-center items-center space-x-2">
    <TextInput label="First Name" placeholder="Enter your first name." className="mt-4"
    value ={firstName}
    setValue = {setFirstName}
    />
    <TextInput label="Last Name" placeholder="Enter a last name." className="mt-4"
    value={lastName}
    setValue = {setLastName}
    />
    </div>
    
    <div className="w-full flex items-center justify-center mt-5">
    <button className='bg-green-400 text-lg font-semibold p-3 px-10 rounded-full'
    onClick ={(e) =>{
      e.preventDefault();
      signUp();
    }}
    >SIGN UP</button>

    </div>
    <div className=' w-full border border-solid border-gray-300 mt-5'></div>
    <div className="my-6 font-bold text-lg text-center">
        Already have an account?
    </div>
    <div className="border border-gray-500 text-gray-500 font-bold flex item-center justify-center py-4 rounded-full">
    <Link to="/login">
       LOG IN INSTEAD
       </Link>
    </div>
    </div>
    </div>
  )
}

export default SignupComponent
