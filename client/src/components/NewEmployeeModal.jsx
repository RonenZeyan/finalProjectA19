import '../Style.css';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function NewEmployeeModal({setVisiblity,isVisible,setNewUser}){

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        phone : "",
        gender : "male",  //in case user not change in modal then we save the default value 
      });

      

    const handleSubmit = (e)=>{
        e.preventDefault()
        setVisiblity(false)
       axios.post('https://final-project-a19-api.vercel.app/add_employee',employee) //send a employee as param to the backend
        .then(result => {
            setNewUser(result.data);
        })
        .catch(err=>console.log(err))
    }

    if(isVisible) {
        return (
            <div class="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-2xl border-2 border-gray-950 p-5 text-center" id="modalContent">
                <form action="" onSubmit={handleSubmit}>  
                    <div className="flex flex-col justify-center font-bold">
                            <div className="flex justify-between p-2">
                            <label for="TXTemplyeeName">employeeName: </label> 
                            {/* <input id="TXTemplyeeName" className="border-2 rounded-xl" type="text"/> */}
                            <input onChange={(e)=>setEmployee({...employee, name: e.target.value})} id="TXTemplyeeName" className="border-2 rounded-xl" type="text"/>
                            </div>
                            <div className="flex justify-between p-2">
                            <label for="TXTemplyeePhone">phone: </label>
                            <input onChange={(e)=>setEmployee({...employee, phone: e.target.value})} id="TXTemplyeePhone" className="border-2 rounded-xl" type="text"/>
                            </div>
                            <div className="flex justify-between p-2">
                            <label for="TXTemplyeePhone">email:</label>
                            <input onChange={(e)=>setEmployee({...employee, email: e.target.value})} id="TXTemplyeeEmail" className="border-2 rounded-xl" type="text"/>
                            </div>
                            <div className="flex justify-between p-2">
                                <label for="genderSelect">gender:</label>
                                <select onChange={(e)=>setEmployee({...employee, gender: e.target.value})} className="border-2 rounded" id="genderSelect">
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                            </div>
                            <button type="submit" id="addModalBtn" className="border rounded-2xl bg-blue-500 m-1 p-0.5 hover:bg-blue-900">Add New Employee</button>
                            <button onClick={()=>{setVisiblity(false)}}  id="closeModalBtn" className="border rounded-2xl bg-gray-500 m-1 p-0.5 hover:bg-red-600">Close</button>
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