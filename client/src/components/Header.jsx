import { Link } from "react-router-dom";
import {decodeToken,getUserIdFromToken} from "../utils/JWTutils";
import { useAuth } from "./AuthContext";
import React,{ useState, useEffect } from 'react'


export default function Header(){

    const { user, logout } = useAuth();
    const isLoggedIn = !!user; // this !! convert the value to true or false. first ! convert to boolean and second one convert it to his real boolean value 
    let userType='none'
    if(isLoggedIn){
    userType = user.role;
    }

    const [isDarkMode, setIsDarkMode] = useState(false);
    
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);


    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);


    function handleLogOut(){
        logout()  //we make the context set that use logout
    }

    return (
        <div id="content" class="max-w-[100vw] w-full relative h-[10vh]">
        <div class="bg-blue-500 dark:bg-gray-500 text-white p-1 flex justify-between">
            <button id="menuToggle" class="block sm:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
                    <path fill="#ffffff"
                        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
                <svg class="hidden" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512">
                    <path fill="#ffffff"
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
            </button>
            <div class="absolute top-[56px] left-0 p-3 hidden w-full" id="ddMenu">
                <Link className="font-bold" to="/"><img class="w-[20%] h-7" src="./Images/Logo.png" alt="logo"/></Link>
                <Link className="font-bold" to="/">Home</Link>
                <Link className="font-bold" to="/users">Employees</Link>
                <Link className="font-bold" to="/missions">Missions</Link>
            </div>
            {isLoggedIn?
            <div class="justify-start items-center gap-4 hidden sm:flex">
                {userType==='admin'?(
                <div className="flex gap-4 items-center">
                <Link className="font-bold" to="/AdminHome"><img class="w-[100%] h-14 p-1" src="./Images/Logo.png" alt="logo"/></Link>
                <Link className="font-bold" to="/AdminHome">Home</Link>
                <Link className="font-bold" to="/users">Employees</Link>
                <Link className="font-bold" to="/missions">Missions</Link>
                <Link className="font-bold" to="/displayMSG">Messages</Link>
                </div>)
                :
                (<div className="flex gap-4 items-center">
                <Link className="font-bold" to="/UserHome"><img class="w-[100%] h-14 p-1" src="./Images/Logo.png" alt="logo"/></Link>
                <Link className="font-bold" to="/UserHome">Home</Link>
                <Link className="font-bold" to="/userNewMissions">New Missions</Link>
                <Link className="font-bold" to="/userExistingMissions">Existing Missions</Link>
                </div>)}
            </div>
            :
            <div class="justify-start items-center gap-4 hidden sm:flex">
                <Link className="font-bold" to="/"><img class="w-[100%] h-14 p-1" src="./Images/Logo.png" alt="logo"/></Link>
                <Link className="font-bold" to="/">Home</Link>
            </div>
            }
            {isLoggedIn?
            <div id="navEnd" class="flex items-center gap-4">
                <Link to="/" onClick={handleLogOut} id="exitRoomBut" class="bg-red-700 rounded px-2 py-2 w-[100%] font-bold border">Logout</Link>
                <button onClick={toggleDarkMode} class="mr-3 font-bold" id="bgButton">dark</button>
                {/* <button onClick={handleLogOut} id="exitRoomBut" class="bg-red-700 rounded px-2 py-2 w-[100%] font-bold border"><a href="index.html">Logout</a></button> */}
            </div>
            :<button onClick={toggleDarkMode} class="mr-3 font-bold" id="bgButton">dark</button>
        }
        </div>
    </div>
    );
} 