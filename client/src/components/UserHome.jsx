import '../Style.css';
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect,useState } from 'react';
import axios from "axios"


//this component used for display the userHome 
export default function UserHome(){
    const { user } = useAuth(); 
    const userID = localStorage.getItem('userID');
    const [newMissionsNum, setnewMissionsNum] = useState(0);//initialize the newMissionsNum in 0  
    const [messageNum, setMessageNum] = useState(0);
 

    useEffect(() => {
        axios.get(`https://final-project-a19-api.vercel.app/numMissionsMessages/${userID}`)
            .then((response) => {
                setnewMissionsNum(response.data); 
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`https://final-project-a19-api.vercel.app/numMessages`)
            .then((response) => {
                setMessageNum(response.data); 
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <div className='flex flex-col justify-center items-center user_home h-[100vh] text-center content'>
            <h1 className='text-3xl font-bold p-5 '>Welcome <span className='font-extrabold underline uppercase'>{user ? user.name : 'Loading...'}</span></h1>
            <div className='flex sm:flex-col md:flex-row gap-10 justify-center items-center p-14'>
                <div style={{backgroundColor: 'rgba(220, 220, 220, 0.80)'}} className={`bg-white w-[200px] h-[150px] rounded-lg text-center font-bold flex items-center justify-center text-2xl hover:bg-grey hover:w-[220px] hover:h-[180px] hover:
                transitions ${newMissionsNum === 0 ? "" : "border-4 border-red-600"}`}><Link to="/userNewMissions"><svg className='w-[60px] h-[60px] m-auto' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.76 122.88"><title>reminder</title><path d="M40.5,68.38a2.79,2.79,0,0,1,0-5.58h9.77a35.57,35.57,0,0,0-1.61,3.62c-.25.64-.47,1.29-.68,2Zm49.16,46.48a9.76,9.76,0,0,1-1.14,3.1A9.76,9.76,0,0,1,80,122.88a10,10,0,0,1-3.4-.58,9.54,9.54,0,0,1-3-1.73A10.1,10.1,0,0,1,71.38,118a9.7,9.7,0,0,1-1.15-3.2,1.06,1.06,0,0,1,.85-1.22H88.65a1,1,0,0,1,1,1,1.26,1.26,0,0,1,0,.28Zm-4.17-57a20.54,20.54,0,0,1,2.48.81,24,24,0,0,1,3.41,1.68l.13.08a23.23,23.23,0,0,1,2.9,2.12A22,22,0,0,1,97,65.17h0a21.65,21.65,0,0,1,2.12,3.06,23.32,23.32,0,0,1,1.61,3.39h0a21.18,21.18,0,0,1,1,3.72,21.87,21.87,0,0,1,.34,3.91v4.25c0,1.35,0,2.68,0,4h0a29.7,29.7,0,0,0,.22,3.52,29.15,29.15,0,0,0,.63,3.37h0a17.46,17.46,0,0,0,1.1,3.09,19.09,19.09,0,0,0,1.73,3h0a17.45,17.45,0,0,0,2.52,2.82,29.18,29.18,0,0,0,3.62,2.82,1.72,1.72,0,0,1-1,3.15H48.86a1.72,1.72,0,0,1-1.73-1.72A1.74,1.74,0,0,1,48,106a29.14,29.14,0,0,0,3.6-2.81,17,17,0,0,0,2.5-2.83l.07-.09a21.17,21.17,0,0,0,1.66-2.9,18.13,18.13,0,0,0,1.12-3.09s0,0,0-.06A25.1,25.1,0,0,0,57.54,91a29.49,29.49,0,0,0,.21-3.56V79.26a22.49,22.49,0,0,1,.35-3.92,20.74,20.74,0,0,1,1-3.73,23.32,23.32,0,0,1,1.63-3.42,22.12,22.12,0,0,1,2.15-3.08h0a22.78,22.78,0,0,1,2.63-2.66,22.18,22.18,0,0,1,6.5-3.87,21.36,21.36,0,0,1,2.54-.78,5.07,5.07,0,0,1,1.53-2.52A5.55,5.55,0,0,1,80.06,54,5.71,5.71,0,0,1,84,55.3a5.31,5.31,0,0,1,1.53,2.52Zm.92,5.3a18.53,18.53,0,0,0-2.78-.85,1.63,1.63,0,0,1-1.42-1.43,2.39,2.39,0,0,0-.62-1.51A2.44,2.44,0,0,0,80,58.89a2.23,2.23,0,0,0-1.54.42,2.32,2.32,0,0,0-.61,1.52h0a1.63,1.63,0,0,1-1.33,1.43,17.14,17.14,0,0,0-3,.83,17.42,17.42,0,0,0-2.75,1.33,17.63,17.63,0,0,0-2.47,1.78,18.81,18.81,0,0,0-2.13,2.15h0a19.13,19.13,0,0,0-1.73,2.5,20.32,20.32,0,0,0-1.32,2.78,16.86,16.86,0,0,0-.83,3,17.88,17.88,0,0,0-.27,3.16v7.79a31.53,31.53,0,0,1-.23,3.8,28.51,28.51,0,0,1-.67,3.53s0,.05,0,.08a20.19,20.19,0,0,1-1.28,3.5A23.86,23.86,0,0,1,58,101.7l-.06.1A20.38,20.38,0,0,1,55.1,105l0,0h49.78a19.91,19.91,0,0,1-2.85-3.21h0a22.24,22.24,0,0,1-1.94-3.34A19.87,19.87,0,0,1,98.77,95h0a30.6,30.6,0,0,1-.67-3.63,34,34,0,0,1-.23-3.74h0c0-1.23,0-2.5,0-3.82,0-2.46,0-3.79,0-4a17.39,17.39,0,0,0-.28-3.17,16.5,16.5,0,0,0-.81-3h0a19,19,0,0,0-1.3-2.77,18,18,0,0,0-1.72-2.48h0a17.76,17.76,0,0,0-2.11-2.14,18.8,18.8,0,0,0-2.35-1.71l-.11-.07a21.21,21.21,0,0,0-2.75-1.35ZM16.75,65.61a2.06,2.06,0,0,1,3.42-2.29L21.29,65l4.45-5.41a2.06,2.06,0,1,1,3.18,2.61l-6.16,7.49a1.92,1.92,0,0,1-.49.45,2.07,2.07,0,0,1-2.86-.56l-2.66-4Zm0-19.6a2.06,2.06,0,1,1,3.42-2.29l1.12,1.67L25.74,40a2.06,2.06,0,0,1,3.18,2.61l-6.16,7.49a2,2,0,0,1-.49.46A2.06,2.06,0,0,1,19.41,50l-2.66-4Zm0-19.61a2.06,2.06,0,1,1,3.42-2.29l1.12,1.66,4.45-5.41A2.06,2.06,0,1,1,28.92,23l-6.16,7.49a2.16,2.16,0,0,1-.49.46,2.07,2.07,0,0,1-2.86-.57l-2.66-4Zm23.75.47a2.79,2.79,0,1,1,0-5.58H70.23a2.79,2.79,0,1,1,0,5.58ZM6.47,0H86a6.45,6.45,0,0,1,6.47,6.46V47.13L92,46.92a30.69,30.69,0,0,0-3.73-1.22h0A8.06,8.06,0,0,0,86.92,43V6.49a1,1,0,0,0-.26-.65A1,1,0,0,0,86,5.57H6.47a.92.92,0,0,0-.91.92V86.43a.92.92,0,0,0,.91.92h40.1v2.82c0,.92,0,1.82-.08,2.7h-40A6.43,6.43,0,0,1,1.9,91,6.36,6.36,0,0,1,0,86.42V6.47A6.45,6.45,0,0,1,6.47,0Zm34,47.62a2.79,2.79,0,1,1,0-5.57H67.91a2.78,2.78,0,0,1,2.51,4c-.8.23-1.59.5-2.37.79-.63.24-1.25.5-1.87.78Z"/></svg><h1>New Missions <div className='font-extrabold'>{newMissionsNum==0?"no missions":newMissionsNum}</div></h1></Link></div>
                <div style={{backgroundColor: 'rgba(220, 220, 220, 0.80)'}} className='bg-white w-[200px] h-[150px] rounded-lg text-center font-bold flex items-center justify-center text-2xl hover:bg-grey hover:w-[220px] hover:h-[180px] hover:
                transitions'><Link to="/profile"><svg fill="#000000" width="67px" height="67px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z"></path></g></svg><h1>Profile</h1></Link></div>
                <div style={{backgroundColor: 'rgba(220, 220, 220, 0.80)'}}      className={`bg-white w-[200px] h-[150px] rounded-lg text-center font-bold flex items-center justify-center text-2xl hover:bg-grey hover:w-[220px] hover:h-[180px] transitions ${messageNum === 0 ? "" : "border-4 border-red-600"}`}><Link to="/displayMSG"><svg className='w-[67px] m-auto' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg><h1>New Messages<div className='font-bold font-extrabold'>{messageNum==0?"no messages":messageNum}</div></h1></Link></div>
            </div>
        </div>
    )
}