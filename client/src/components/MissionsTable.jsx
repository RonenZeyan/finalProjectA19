import '../Style.css';
import Table from "./table"
import NewEmployeeModal from "./NewEmployeeModal"
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import SearchCompo from './SearchCompo';


//this component used for display the mission Table (all missions exist )
export default function MissionsTable(){
    const tableHead=["employeeName","missionDate","endDate","missionDescription","status"]
    const [Missions,setMissions] = useState([])
    const [AllMissions,setMAllissions] = useState([]) //hook useState
    useEffect(()=>{
        axios.get(`https://final-project-a19-api.vercel.app/allMissions`)
        .then(
            (Missions) =>{setMissions(Missions.data);setMAllissions(Missions.data); console.log(Missions.data);}
            )
        .catch(err=>console.log(err))
    },[])

    
    //in this component we make reuse of the component search (there is more than one page have the same search)
    //then we make search as a indepedent component to use it in more than one place
    //we also use table component for reuse (becasue there are many pages include table)
    //then we make a table and cell and row pages and use them in each page we have a table (we just send the data then the table will created)
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