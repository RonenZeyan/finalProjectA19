import '../Style.css';
import Table from "./table"
import NewEmployeeModal from "./NewEmployeeModal"
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import NewMissionModal from './NewMissionModal';
import SearchCompo from './SearchCompo';


//this component used for display the mission of user
export default function DisplayUserMissions(){
    const [showModal,setShowModal] = useState(false)
    // const [users,setUsers] = useState([])
    const {id} = useParams()
    const tableHead=["_id","missionDescription","status"]
    const [UserMissions,setUserMissions] = useState([])
    const [allUserMissions,setAlluserMissions] = useState([])
    useEffect(()=>{ //in the display of the page the data fetched from db and displayed in page 
        axios.get(`https://final-project-a19-api.vercel.app/users/userMissions/${id}`)
        .then(
            (UserMissions) =>{setUserMissions(UserMissions.data);setAlluserMissions(UserMissions.data); console.log(UserMissions.data);}
            )
        .catch(err=>console.log(err))
    },[])

    const handleAddNewMission = (newMission) => {
        setUserMissions([...UserMissions, newMission]);
        setAlluserMissions([...allUserMissions, newMission]);
    };

    const handleDeleteMission = (mission) =>{
        console.log(mission)
        const isConfirmed = window.confirm("Are you sure you want to delete this mission?"); 
        if (isConfirmed) {
            //in case user press yes then the delete happen
            axios.delete(`https://final-project-a19-api.vercel.app/userMissions/delete/${mission._id}`)
                .then(() => {
                     //we filtered the undisired mission (filter func return a new array with the remain mission of the user)
                    const updatedUserMissions = UserMissions.filter(miss => miss._id !== mission._id);
                    setUserMissions(updatedUserMissions); //we change state to render the table 
                    setAlluserMissions(updatedUserMissions) //this used for the search (to get old data after we finish the search)
                })
                .catch(err => console.error(err));
        } else {
            //in case user press cancel
            console.log("User deletion was cancelled.");
        }
    }

    const renderEditMissionDetails = (user) =>(
        // <Link to={`user/missions/${user._id}`}><svg className='inline border border-blue-700 w-6 rounded-full mr-2 hover:bg-gray-400' fill="#004cff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#004cff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z"></path></g></svg></Link>
        <div onClick={() => {}} className='cursor-pointer inline m-2 w-6'>
        <svg className='inline mr-2 w-9 rounded-full hover:bg-blue-400' viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7 5.12758L19.266 6.37458C19.4172 6.51691 19.5025 6.71571 19.5013 6.92339C19.5002 7.13106 19.4128 7.32892 19.26 7.46958L18.07 8.89358L14.021 13.7226C13.9501 13.8037 13.8558 13.8607 13.751 13.8856L11.651 14.3616C11.3755 14.3754 11.1356 14.1751 11.1 13.9016V11.7436C11.1071 11.6395 11.149 11.5409 11.219 11.4636L15.193 6.97058L16.557 5.34158C16.8268 4.98786 17.3204 4.89545 17.7 5.12758Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.033 7.61865C12.4472 7.61865 12.783 7.28287 12.783 6.86865C12.783 6.45444 12.4472 6.11865 12.033 6.11865V7.61865ZM9.23301 6.86865V6.11865L9.23121 6.11865L9.23301 6.86865ZM5.50001 10.6187H6.25001L6.25001 10.617L5.50001 10.6187ZM5.50001 16.2437L6.25001 16.2453V16.2437H5.50001ZM9.23301 19.9937L9.23121 20.7437H9.23301V19.9937ZM14.833 19.9937V20.7437L14.8348 20.7437L14.833 19.9937ZM18.566 16.2437H17.816L17.816 16.2453L18.566 16.2437ZM19.316 12.4937C19.316 12.0794 18.9802 11.7437 18.566 11.7437C18.1518 11.7437 17.816 12.0794 17.816 12.4937H19.316ZM15.8863 6.68446C15.7282 6.30159 15.2897 6.11934 14.9068 6.2774C14.5239 6.43546 14.3417 6.87397 14.4998 7.25684L15.8863 6.68446ZM18.2319 9.62197C18.6363 9.53257 18.8917 9.13222 18.8023 8.72777C18.7129 8.32332 18.3126 8.06792 17.9081 8.15733L18.2319 9.62197ZM8.30001 16.4317C7.8858 16.4317 7.55001 16.7674 7.55001 17.1817C7.55001 17.5959 7.8858 17.9317 8.30001 17.9317V16.4317ZM15.767 17.9317C16.1812 17.9317 16.517 17.5959 16.517 17.1817C16.517 16.7674 16.1812 16.4317 15.767 16.4317V17.9317ZM12.033 6.11865H9.23301V7.61865H12.033V6.11865ZM9.23121 6.11865C6.75081 6.12461 4.7447 8.13986 4.75001 10.6203L6.25001 10.617C6.24647 8.96492 7.58269 7.62262 9.23481 7.61865L9.23121 6.11865ZM4.75001 10.6187V16.2437H6.25001V10.6187H4.75001ZM4.75001 16.242C4.7447 18.7224 6.75081 20.7377 9.23121 20.7437L9.23481 19.2437C7.58269 19.2397 6.24647 17.8974 6.25001 16.2453L4.75001 16.242ZM9.23301 20.7437H14.833V19.2437H9.23301V20.7437ZM14.8348 20.7437C17.3152 20.7377 19.3213 18.7224 19.316 16.242L17.816 16.2453C17.8195 17.8974 16.4833 19.2397 14.8312 19.2437L14.8348 20.7437ZM19.316 16.2437V12.4937H17.816V16.2437H19.316ZM14.4998 7.25684C14.6947 7.72897 15.0923 8.39815 15.6866 8.91521C16.2944 9.44412 17.1679 9.85718 18.2319 9.62197L17.9081 8.15733C17.4431 8.26012 17.0391 8.10369 16.6712 7.7836C16.2897 7.45165 16.0134 6.99233 15.8863 6.68446L14.4998 7.25684ZM8.30001 17.9317H15.767V16.4317H8.30001V17.9317Z" fill="#000000"></path> </g></svg>        </div>
        );

    const renderDeleteMission = (mission) => (
        // <Link to={`user/missions/${user._id}`}><svg className='inline mr-2 border border-red-700 w-6 rounded-full hover:bg-blue-400' fill="#ff0000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M1,20a1,1,0,0,0,1,1h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm12.707,9.707L20.414,17l2.293,2.293a1,1,0,1,1-1.414,1.414L19,18.414l-2.293,2.293a1,1,0,0,1-1.414-1.414L17.586,17l-2.293-2.293a1,1,0,0,1,1.414-1.414L19,15.586l2.293-2.293a1,1,0,0,1,1.414,1.414Z"></path></g></svg></Link>
        
            <div onClick={() => {handleDeleteMission(mission)}} className='cursor-pointer inline m-auto pl-2 w-6'>
            <svg className='inline mr-2 w-6 rounded-full hover:bg-blue-400' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 11.714844 8.011719 c -0.960938 0.066406 -1.863282 0.480469 -2.542969 1.160156 c -1.5625 1.5625 -1.5625 4.09375 0 5.65625 s 4.09375 1.5625 5.65625 0 s 1.5625 -4.09375 0 -5.65625 c -0.820313 -0.820313 -1.957031 -1.246094 -3.113281 -1.160156 z m -1.128906 1.570312 c 0.253906 0 0.511718 0.101563 0.707031 0.296875 l 0.707031 0.707032 l 0.707031 -0.707032 c 0.390625 -0.390625 1.023438 -0.390625 1.414063 0 s 0.390625 1.023438 0 1.414063 l -0.707032 0.707031 l 0.707032 0.707031 c 0.390625 0.390625 0.390625 1.023438 0 1.414063 s -1.023438 0.390625 -1.414063 0 l -0.707031 -0.707032 l -0.707031 0.707032 c -0.390625 0.390625 -1.023438 0.390625 -1.414063 0 s -0.390625 -1.023438 0 -1.414063 l 0.707032 -0.707031 l -0.707032 -0.707031 c -0.390625 -0.390625 -0.390625 -1.023438 0 -1.414063 c 0.195313 -0.195312 0.453125 -0.296875 0.707032 -0.296875 z m 0 0" class="error" fill="#e01b24"></path> <path d="m 7 0 c -0.554688 0 -1 0.445312 -1 1 h -2 c -1.644531 0 -3 1.355469 -3 3 v 9 c 0 1.644531 1.355469 3 3 3 h 2 c 0.550781 0 1 -0.449219 1 -1 s -0.449219 -1 -1 -1 h -2 c -0.570312 0 -1 -0.429688 -1 -1 v -9 c 0 -0.570312 0.429688 -1 1 -1 h 1 v 1 c 0 0.554688 0.445312 1 1 1 h 4 c 0.554688 0 1 -0.445312 1 -1 v -1 h 1 c 0.570312 0 1 0.429688 1 1 v 2 c 0 0.550781 0.449219 1 1 1 s 1 -0.449219 1 -1 v -2 c 0 -1.644531 -1.355469 -3 -3 -3 h -2 c 0 -0.554688 -0.445312 -1 -1 -1 z m 0 0" fill="#2e3436" fill-opacity="0.35"></path> </g></svg>
            </div>
        
    );

    return (
        <div className="user_home h-[100vh] content flex flex-col justify-center items-center">
                    <h1 className="font-bold text-3xl text-center pt-4">
                    {UserMissions.length > 0 ? UserMissions[0].employeeName + " Missions" : "No Missions"} 
                    </h1>
                    <button onClick={()=>{setShowModal(true)}} id="showModalBtn" class="m-5 border p-2 rounded-md bg-gray-400 hover:bg-gray-500 transitions hover:px-3 hover:py-2.5"><span class="font-bold">+Add New Mission</span></button>
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
                <SearchCompo searchByList={["missionDescription"]} setData={setUserMissions} allData={allUserMissions} initialSearchState={'missionDescription'}/> 
    
                <div className=""> 
                {/* in extraColumns we dont need more Columns then we send an empty Function */}
                {UserMissions && <Table tableSort={tableHead} data={UserMissions} extraColumns={[renderDeleteMission]}/>}            
                </div>
                <NewMissionModal setVisiblity={setShowModal} userId={id} isVisible={showModal} setNewMission={handleAddNewMission}/>

        </div>
    )

}