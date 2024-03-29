import '../Style.css';
import Table from "./table"
import NewEmployeeModal from "./NewEmployeeModal"
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import SearchCompo from './SearchCompo';



export default function MissionsTable(){
    const tableHead=["employeeName","missionDate","endDate","missionDescription","status"]
    const [Missions,setMissions] = useState([])
    const [AllMissions,setMAllissions] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3001/allMissions`)
        .then(
            (Missions) =>{setMissions(Missions.data);setMAllissions(Missions.data); console.log(Missions.data);}
            )
        .catch(err=>console.log(err))
    },[])

    

    return (
        <div className="user_home h-[100vh] content flex flex-col justify-center items-center">
                    <h1 className="font-bold text-3xl text-center py-3 ">Missions</h1>
                    {/* <div className="flex justify-center sm:items-center md:flex-row sm:flex-col py-5 gap-1 font-bold font-serif">
                        <div className="flex items-center gap-2">
                        <label for="searchBy" className="font-bold">searchBy:</label>
                        <select className="p-1 border rounded-xl border-black" id="searchBy" name="searchBy">
                            <option value="missionID">missionID</option>
                            <option value="EmployeeName">EmployeeName</option>
                            <option value="missionDescription">Description</option>
                            <option value="status">status</option>
                        </select>
                        </div>
                        <div className="md:contents sm:flex sm:flex-col sm:items-center sm:gap-3 font-bold font-serif">
                            <input className="p-1 border rounded-xl w-2/5 border-black" id="searchText" placeholder="search" type="text"/>
                            <button id="searchBut" className="rounded-full bg-gray-300 border-2 py-1 px-2 border-cyan-600 font-bold">search</button>
                        </div>
                    </div> */}
                    <SearchCompo searchByList={["missionDescription","employeeName"]} setData={setMissions} allData={AllMissions} initialSearchState={'missionDescription'}/>
                <div className=""> 
                {Missions && <Table tableSort={tableHead} data={Missions} extraColumns={[()=>{}]}/>}            
                </div>
        </div>
    )

}