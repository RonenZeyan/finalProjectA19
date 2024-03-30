import '../Style.css';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import {decodeToken,getUserIdFromToken} from "../utils/JWTutils";


export default function Login() {

    const { login } = useAuth(); 
    const [Email,setEmail] = useState()
    const [Password,setPassword] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    
    const handleSubmit = async (e)=>{
        e.preventDefault()  //to stop refresh to the page 
        axios.post('https://final-project-a19-api.vercel.app/adminLogin',{Email,Password})
        .then(result => {console.log(result.data)
          const resData = result.data;
          if(resData.loginStatus==true)
          {
            setError(null)
            localStorage.setItem('token', resData.token);
            const userInfo = decodeToken(resData.token);
            login(resData.token)
            localStorage.setItem('userID',resData.userID)
            if(userInfo.role==='admin') {
                navigate('/AdminHome');
            } 
            else {
                navigate('/UserHome');
            }
          }
          else
          {
            setError(resData.ErrorMSG)
          }
        })
        .catch(err=>console.log(err))
    }

    return (
    <div className='loginPage h-[100vh] flex flex-col justify-center items-center content'>
        <div className="my-20 py-16 px-24 bg-white bg-opacity-60 rounded-lg shadow-md w-[500px]">
                <h1 className="text-3xl font-medium mb-6 text-blue-800 text-center">Login</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-12">
                    <label className="block text-gray-800 font-medium">Email:</label>
                    <input id="loginInput" className="rounded-full border border-black p-2 w-full rounded font-bold font-serif" type="Email" onChange={e=>setEmail(e.target.value)}/>
                    </div>

                    <div className="mb-12">
                    <label className="block text-gray-800 font-medium">Password:</label>  
                    <input id="passwordInput" className="rounded-full border border-black p-2 w-full rounded" type="password" onChange={e=>setPassword(e.target.value)}/>
                    </div>

                    <button id="submitButton" type="submit" className="w-full bg-blue-800 text-white py-2 px-4 rounded-full hover:bg-purple-700">Login</button>
                    <div className="flex mt-8">
                        <div className="flex sm:flex-col md:flex-row m-auto gap-14 justify-center font-bold">
                            <div><input type="checkbox"/>Remember me!</div>
                            <a href="#"><p className="font-bold">forgot password</p></a>
                        </div>
                    </div>
                    <div id="invalidTxt" className="">
                    <p className="font-extrabold text-red-900 text-center pt-3">{error&&error}</p>
                    </div>
                </form>
        </div>
    </div>

    )
  }