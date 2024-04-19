import '../Style.css';
import { Link } from "react-router-dom";

//this component used for display the global home (before user loggedIN)
export default function Home(){
    return (
        <div className='home h-[100vh] flex justify-center items-center'>
            <div className='rounded-2xl border border-2 border-gray-300 w-[70%] h-[70%] text-zinc-50 pt-7' style={{backgroundColor: 'rgba(212, 212, 212, 0.32)'}}>
            <h1 className='font-bold sm:text-3xl md:text-5xl text-center font-serif'>TeamPower <p   className='sm:text-xl md:text-2xl'>mangment,building,connect</p></h1>
                <div className='flex flex-col justify-between items-center md:p-5 lg:p-10'>
                    <h1 className='sm:text-md md:text-xl font-bold font-serif text-center'>
                        Out task management app helps you stay on top of your tasks,collaborate with your team, and accomplish more
                        <br />Features  
                        <br />Create and assign 
                        <br />Set due dates and priorities 
                        <br />Collaborate with team members 
                        <br />Track progress and receive notification
                    </h1>  
                    <Link to="/adminLogin" className='bg-blue-700 font-bold rounded-xl m-4 p-3 px-6 flex items-center justify-center
                    hover:bg-blue-900'>get Started 
                        <span className='pl-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                <path d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zM8.711 4.3l5.7 5.766L8.7 15.711l-1.4-1.422 4.289-4.242-4.3-4.347z" fill="#FFFFFF"/>
                            </svg>
                        </span>
                    </Link> 
                </div>  
            </div>
        </div>
    )
}