import '../Style.css';
import Table from "./table"
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import SearchCompo from './SearchCompo';


export default function UserExistingMissions(){
    const tableHead=["missionDate","endDate","missionDescription","status"]
    const [Missions,setMissions] = useState([])
    const [allMission,setAllMissions] = useState([])
    const userID = localStorage.getItem('userID');
    useEffect(()=>{
        axios.get(`https://final-project-a19-api.vercel.app/ExistingUserMissions/${userID}`)
        .then(
            (Missions) =>{
                console.log(Missions.data);
                if(Missions.data.missionsStatus==true)
                {
                    setMissions(Missions.data.Missions)
                    setAllMissions(Missions.data.Missions)
                    // console.log(Missions.data.Missions)
                }
                else
                {
                    console.log("failed")
                }}).catch(err=>console.log(err))
    },[])

    const renderAcceptMissionButton = (mission) => {
        // <Link className='inline font-bold font-mono bg-gray-400 mx-2 py-2 px-3 rounded-xl hover:bg-gray-600 hover:px-4 hover:py-3 transitions' to={`user/missions/${user._id}`}>Show Missions</Link>
        return mission.status==="IN PROCESS"?(<button onClick={()=>{handleOnClickAcceptMissionButton(mission)}} className='bg-gray-400 px-2 py-2 rounded-lg m-1 font-serif font-bold hover:bg-gray-500'>Finish Mission</button>    
        ):(<img className='w-[50px] m-auto' src='Images/finishStatus.png'/>);
    }

    //this method send post to backend to change the mission status (send the id of mission)
    const handleOnClickAcceptMissionButton = (mission) =>
    {
        console.log(mission)
        const isConfirmed = window.confirm("Are you sure you want to set this mission as finished?");
        if(isConfirmed)
        {
            axios.post(`https://final-project-a19-api.vercel.app/finishMission/${mission._id}`)
            .then(res=>
                {
                setMissions(prevMissions => prevMissions.filter(m => m._id !== mission._id)); //filter the accepted mission and render the table by useState
                }) 
            .catch(err=>{console.log(err)})
        }
        else
        {
            console.log('user not accept');
        }
    };

    return (

        <div className="user_home h-[100vh] content flex flex-col justify-center items-center">     
            <h1 className="font-bold text-3xl text-center pt-5 ">Existing Missions</h1>
            {/* <div className="flex justify-center sm:items-center md:flex-row sm:flex-col py-5 gap-1">
                <div className="flex items-center gap-2">
                <label for="searchBy" className="font-bold">searchBy:</label>
                <select className="p-1 border rounded-xl border-black" id="searchBy" name="searchBy">
                    <option value="missionID">missionID</option>
                    <option value="missionDescription">Description</option>
                    <option value="status">status</option>
                </select>
                </div>
                <div className="md:contents sm:flex sm:flex-col sm:items-center sm:gap-3">
                    <input className="p-1 border rounded-xl w-2/5 border-black" id="searchText" placeholder="search" type="text"/>
                    <button id="searchBut" className="rounded-full bg-gray-300 border-2 px-2 border-cyan-600 font-bold">search</button>
                </div>
            </div> */}
            <SearchCompo searchByList={["missionDescription"]} setData={setMissions} allData={allMission} initialSearchState={'missionDescription'} />

            <h1 className='font-bold text-5xl mt-14 font-serif'>
            {Missions.length > 0 ?null: "No Missions"} 
            </h1>
            <div>
            {Missions && <Table tableSort={tableHead} data={Missions} extraColumns={[renderAcceptMissionButton]}/>}            
            </div>

        </div>
    )

}