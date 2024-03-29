import '../Style.css';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function NewMissionModal({setVisiblity,userId,isVisible,setNewMission}){

    const [mission, setMission] = useState({
        missionDescription: "",
        date: "",
        time : "",
        userid : userId,  //send the id of employee to know in backend for witch user this mission created
        
      });

      

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(mission)
        setVisiblity(false)
       axios.post('http://localhost:3001/add_mission',mission) //send a mission as param to the backend
        .then(result => {
            setNewMission(result.data);
        })
        .catch(err=>console.log(err))
    }

    if(isVisible) {
        return (
        <div class="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-2xl border-2 border-gray-950 p-5 text-center" id="modalContent">
        <form action="" onSubmit={handleSubmit}>
                <div class="flex flex-col justify-center font-bold">
                        <label class="text-xl" for="TXTemplyeeName">missionDescription:</label>
                        <textarea onChange={(e)=>setMission({...mission, missionDescription: e.target.value})} id="TXTemplyeeName" class="m-auto border-2 mb-2 p-2 rounded-xl" name="" cols="30" rows="6"></textarea>
                        
                        <label for="dateMission">Choose a date and time for end mission :</label>
                        <div class="flex flex-col justify-center px-16">
                            <input onChange={(e)=>setMission({...mission, date: e.target.value})} class="bg-gray-200 rounded-xl px-2 m-2" type="date" id="dateMission" name="date"/>
                            <input onChange={(e)=>setMission({...mission, time: e.target.value})} class="bg-gray-200 rounded-xl px-2 m-2" type="time" id="timeMission" name="time"/>
                        </div>

                        <button id="addModalBtn" class="border rounded-2xl bg-blue-500 m-1 p-0.5 hover:bg-blue-900">Add New Mission</button>
                    <button onClick={()=>{setVisiblity(false)}} id="closeModalBtn" class="border rounded-2xl bg-gray-500 m-1 p-0.5 hover:bg-red-600">Close</button>
                </div>
            </form>
        </div>
        );
    }
    else
    {
        return(<></>)
    }

}