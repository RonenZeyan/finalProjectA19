import '../Style.css';
import Table from "./table"
import NewEmployeeModal from "./NewEmployeeModal"
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import { Link,useNavigate } from "react-router-dom";
import SearchCompo from './SearchCompo';


export default function UsersTable(){
        const [showModal,setShowModal] = useState(false)
        const navigate = useNavigate();
        const tableHead=["gender","image","name","email","password","age","phone"]
        const [users,setUsers] = useState([])
        const [allUsers,setAllusers] = useState([])

        useEffect(()=>{
            axios.get('https://final-project-a19-api.vercel.app/users')
            .then(
                (users) =>{setUsers(users.data); setAllusers(users.data); console.log(users.data);}
                )
            .catch(err=>console.log(err))
        },[])

        const handleAddNewUser = (newUser) => {
            setUsers([...users, newUser]);
            setAllusers([...allUsers, newUser]);
        };

        const handleEditUser=(userId) => {
            // setShowModal(true)
            navigate(`/editUser/${userId}`)
        }

        const handleDeleteUser = (userId) => {
            //this window like alert it ask before delete if user sure want to delete
            const isConfirmed = window.confirm("Are you sure you want to delete this user?");
            
            if (isConfirmed) {
                //in case user press yes then the delete happen
                axios.delete(`https://final-project-a19-api.vercel.app/users/delete/${userId}`)
                    .then(() => {
                         //we filtered the undisired user (filter func return a new array with the remain users)
                        const updatedUsers = users.filter(user => user._id !== userId);
                        setUsers(updatedUsers); //we change state to render the table 
                    })
                    .catch(err => console.error(err));
            } else {
                //in case user press cancel
                console.log("User deletion was cancelled.");
            }
        };
        
    
        //by this function we add more column to the table 
        const renderShowMissionsButton = (user) => (
            <Link className='inline font-bold font-mono bg-gray-400 mx-2 py-2 px-3 rounded-xl hover:bg-gray-600 hover:px-4 hover:py-3 transitions' to={`user/missions/${user._id}`}>Show Missions</Link>
        );

        const renderEditUserDetails = (user) =>(
            // <Link to={`user/missions/${user._id}`}><svg className='inline border border-blue-700 w-6 rounded-full mr-2 hover:bg-gray-400' fill="#004cff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#004cff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z"></path></g></svg></Link>
            <div onClick={() => handleEditUser(user._id)} className='cursor-pointer inline mr-2 border w-6'>
            <svg className='inline border border-blue-700 w-6 rounded-full mr-2 hover:bg-gray-400' fill="#004cff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#004cff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z"></path></g></svg>            </div>
            );

        const renderDeleteUser = (user) => (
            // <Link to={`user/missions/${user._id}`}><svg className='inline mr-2 border border-red-700 w-6 rounded-full hover:bg-blue-400' fill="#ff0000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M1,20a1,1,0,0,0,1,1h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm12.707,9.707L20.414,17l2.293,2.293a1,1,0,1,1-1.414,1.414L19,18.414l-2.293,2.293a1,1,0,0,1-1.414-1.414L17.586,17l-2.293-2.293a1,1,0,0,1,1.414-1.414L19,15.586l2.293-2.293a1,1,0,0,1,1.414,1.414Z"></path></g></svg></Link>
            
                <div onClick={() => handleDeleteUser(user._id)} className='cursor-pointer inline mr-2 border w-6'>
                    <svg className='inline mr-2 border border-red-700 w-6 rounded-full hover:bg-blue-400' fill="#ff0000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M1,20a1,1,0,0,0,1,1h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm12.707,9.707L20.414,17l2.293,2.293a1,1,0,1,1-1.414,1.414L19,18.414l-2.293,2.293a1,1,0,0,1-1.414-1.414L17.586,17l-2.293-2.293a1,1,0,0,1,1.414-1.414L19,15.586l2.293-2.293a1,1,0,0,1,1.414,1.414Z"></path></g></svg>
                </div>
            
        );


        return (
            <div className="user_home h-[100vh] content flex flex-col gap-5 justify-center items-center">
                <h1 className="font-bold text-3xl text-center py-3 ">Employees</h1>
                <div className="flex flex-col m-4 gap-4">
                    <button onClick={()=>{setShowModal(true)}} id="showModalBtn" className="m-auto border p-2 rounded-md bg-gray-400 hover:bg-gray-500 transitions hover:px-3 hover:py-2.5"><span className="font-bold">+Add New Employee</span></button>
                    {/* <div className="flex m-auto gap-16 md:flex-row sm:flex-col font-serif">
                    <div className="flex items-center gap-4">
                    <label for="searchBy" className="font-bold">searchBy:</label>
                    <select className="font-bold p-1 m-auto border rounded-xl border-black" id="searchBy" name="searchBy">
                        <option value="id">id</option>
                        <option value="employeeName">name</option>
                        <option value="Phone">phone</option>
                        <option value="Email">email</option>
                    </select>
                    </div>
                    <input className="p-1 m-auto border rounded-xl w-4/5 border-black font-serif font-bold" id="searchText" placeholder="search" type="text"/>
                    <button id="searchBut" className="rounded-full bg-gray-300 border-2 px-2 border-cyan-600 font-bold">search</button>
                    </div> */}
                    <SearchCompo searchByList={["name","email","phone"]} setData={setUsers} allData={allUsers} initialSearchState={'name'} />
                </div>
                <div className="font-sans"> 
                    {/* {users && <Table tableSort={tableHead} data={users} extraColumns={renderShowMissionsButton}/>}             */}
                    <Table 
                        tableSort={tableHead} 
                        data={users} 
                        extraColumns={[renderShowMissionsButton, renderEditUserDetails, renderDeleteUser]}
                        />
                </div>
                <NewEmployeeModal setVisiblity={setShowModal} isVisible={showModal} setNewUser={handleAddNewUser}/>
            </div>
        )
        
}