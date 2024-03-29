import '../Style.css';
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect,useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';



export default function CreateMSG(){

    const navigate = useNavigate()
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')

    
    const submit = function(e){
        e.preventDefault() //submit of form make a refresh to the page (this action stop this refersh )
        axios.post('http://localhost:3001/add_message',{title,content})
        .then(res=>{  //in case the comminucation with backend success then check if res from backend success mean the msg saved else mean the msg not saved
            if(res.data ==='success')
            {
                navigate('/AdminHome')  //in case success mean the msg saved then go to homePage of admin
            }
            else
            {
                alert('failed to save the msg, please try again')
            }
        })
        .catch(err=>{  //in case the sending to backend failed then display alert to user to tell him that cant comminucate with backend
            alert('failed to send the msg, maybe there is a problem,please report')
        })
    }

    return(
        <div className='flex flex-col justify-center items-center user_home h-[100vh] text-center content'>
            <h1 className='text-5xl font-bold text-center my-6'>New Message</h1>
            <form onSubmit={submit} action="">
            <div className='flex flex-col justify-center items-center gap-6 w-full font-bold'>
                <div className='flex  w-3/4 justify-center items-center'>
                    <label className='m-4' htmlFor="">Title</label>
                    <input onChange={(e)=>setTitle(e.target.value)} className='p-3 border border-black rounded-md w-3/4' type="text" name="" id="" />
                </div>
                <div className='flex  w-3/4 justify-center items-start'>
                    <label className='m-3' htmlFor="">content</label>
                    <textarea onChange={(e)=>setContent(e.target.value)} className='p-3 border border-black rounded-md w-3/4' name="" id="" cols="102" rows="10"></textarea>
                </div>
                <button className='p-5 my-3 bg-gray-500 rounded-xl' type="submit">send Message</button>
            </div>
            </form>
        </div>
    );

}