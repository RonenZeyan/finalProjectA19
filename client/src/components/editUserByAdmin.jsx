import React, { useState, useEffect } from 'react'
import axios from "axios"
import EditableField from './EditableField';
import { useParams } from 'react-router-dom';


export default function EditUserByAdmin(){
    // const userID = localStorage.getItem('userID');
    const {id} = useParams()
    const userID=id
    const [userData, setUserData] = useState({ name: '', age: '', phone: '',email:'',image:'' });
    const [isDisabled, setIsDisabled] = useState(true);
//display the data of user 
    useEffect(() => {
        console.log(userID)
        axios.get(`https://final-project-a19-api.vercel.app/userData/${userID}`)
            .then((response) => {
                setUserData(response.data); 
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }, [userID]);


    const handleChange = (key, value) => {
        setUserData(prev => ({ ...prev, [key]: value }));
    };

    //this method change the name of button of cancel to edit and להפך
    const toggleEdit = () => {
        setIsDisabled(!isDisabled);
    };

    const handleSubmit = () => {
        setIsDisabled(!isDisabled);  //disable the inputs again 
        console.log('Updating data:', userData);
        axios.post(`https://final-project-a19-api.vercel.app/editUserData/${userID}`,userData)
        .then(response=>{
            console.log(response)
        })
        .catch(err=>console.log(err))
    };

    return (
        <div className="user_home h-[100vh] content flex flex-col justify-center items-center py-7">
            <img className='rounded-full bg-white w-[250px] h-[250px] border border-black' src={userData.image?`${userData.image}`:"\images\iconMan.png"}  alt="mypicture" />
            <h1 className='font-bold font-mono text-3xl py-4'>{userData.name}</h1>
            <EditableField label="name" value={userData.name} onChange={(e) => handleChange('name', e.target.value)} isDisabled={isDisabled} />
            <EditableField label="Age" value={userData.age} onChange={(e) => handleChange('age', e.target.value)} isDisabled={isDisabled} />
            <EditableField label="Phone" value={userData.phone} onChange={(e) => handleChange('phone', e.target.value)} isDisabled={isDisabled} />
            <EditableField label="Email" value={userData.email} onChange={(e) => handleChange('email', e.target.value)} isDisabled={isDisabled} />
            <div className='flex gap-5 mt-4 font-bold'>
                <button className='bg-gray-400 p-2 rounded-md' onClick={toggleEdit}>{isDisabled ? 'Edit' : 'Cancel'}</button>
                <button className='bg-gray-400 p-2 rounded-md' onClick={handleSubmit} disabled={isDisabled}>Update</button>
            </div>
        </div>
    );
}
