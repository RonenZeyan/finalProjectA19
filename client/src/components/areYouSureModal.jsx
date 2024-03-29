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
       axios.post('http://localhost:3001/add_employee',employee) //send a employee as param to the backend
        .then(result => {
            setNewUser(result.data);
        })
        .catch(err=>console.log(err))
    }

    if(isVisible) {
        return (
            <div class="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-2xl border-2 border-gray-950 p-5 text-center" id="modalContent">
                
                    <div className="flex flex-col justify-center font-bold">
                            
                            <button onClick={handleSubmit} id="addModalBtn" className="border rounded-2xl bg-blue-500 m-1 p-0.5 hover:bg-blue-900">Yes</button>
                            <button onClick={()=>{setVisiblity(false)}}  id="closeModalBtn" className="border rounded-2xl bg-gray-500 m-1 p-0.5 hover:bg-red-600">Close</button>
                    </div>
            </div>
        );
    }
    else
    {
        return(<></>)
    }

}