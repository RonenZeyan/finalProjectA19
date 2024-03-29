import '../Style.css';
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect,useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function DisplayMSG(){

    const [messages,setMessages] = useState([])
    const [reverseMessages,setReverseMessages] = useState([])
    let visible = 'hidden'
    useEffect(
        ()=>{
            axios.get('http://localhost:3001/get_messages')
            .then(res=>{ 
                if(res.data)
                {
                    setMessages(res.data)
                    setReverseMessages([...res.data].reverse())  //we set reverse to the msg list to get first the last msg added
                    //...res.data we get a copy not a refernce of data (copy being without state)
                    console.log(messages)

                }
                else
                {
                    alert('failed to display the messages or there is no messages, please try again')
                }
            })
            .catch(err=>{  //in case the sending to backend failed then display alert to user to tell him that cant comminucate with backend
                alert('failed to request display the messages, maybe there is a problem,please report')
            })
        },[]
    )
    useEffect(() => {
        console.log(messages);
    }, [messages]);

    function messageOpenClick(id)
    {
        document.getElementById(id).classList.toggle('hidden') //we know that the better way is not use getelementbyid. and use state but this way fine also 
    }
    
    return(
        <div className='flex flex-col justify-center items-center user_home h-[100vh] text-center content'>
            <div className='flex flex-col gap-10 w-full justify-center items-center font-serif'>
                <h1 className='text-5xl font-bold'>messages</h1>
                <div className='w-1/2'>
                    {reverseMessages.map((msg,idx)=>(
                        <div  key={idx} onClick={()=>{messageOpenClick(msg._id)}} className='w-full bg-gray-400 border border-2 rounded-lg'>
                            <div className='flex justify-between px-2'>
                                <h1 className='py-2 font-bold'>{msg.title}</h1>
                                <h1 className='py-2 font-bold'>{msg.MsgDate}</h1>
                            </div>
                            <p id={msg._id} className={'min-h-10 bg-gray-300 text-start px-2 font-bold hidden'}>{msg.MsgContent}</p>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )

}