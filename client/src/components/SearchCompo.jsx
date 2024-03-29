

import React,{ useState } from 'react'


export default function SearchCompo({searchByList,setData,allData,initialSearchState}){

    // let isPressed=false
    const [isPressed,setIspressed] = useState(false)
    const [searchBy,setSearchBy] = useState(initialSearchState)
    const [searchTXT,setSearchTXT] = useState('')

function handleOnClickSearch()
{
    setIspressed(!isPressed)
    if(!searchTXT ||isPressed)
    {
        setSearchTXT('')
        setData(allData)
    }
    else
    {
        const filteredUsers = allData.filter(user => {
            return user[searchBy].includes(searchTXT.toLowerCase());
        });
        setData(filteredUsers)
    }
}

return(
<div className="flex m-auto gap-16 md:flex-row sm:flex-col font-serif">
    <div className="flex items-center gap-4">
        <label for="searchBy" className="font-bold">searchBy:</label>
        <select onChange={(e)=>{setSearchBy(e.target.value)}} className="font-bold p-1 m-auto border rounded-xl border-black" id="searchBy" name="searchBy">
            {/* <option value="id">id</option>
            <option value="employeeName">name</option>
            <option value="Phone">phone</option>
            <option value="Email">email</option> */}
            { 
            searchByList.map((searchType) => (
            <option value={searchType}>{searchType}</option>  
                )
            )}
        </select>
    </div>
    <input onChange={(e)=>{setSearchTXT(e.target.value)}} className="p-1 m-auto border rounded-xl w-4/5 border-black font-serif font-bold" id="searchText" placeholder="search" type="text" value={searchTXT}/>
    <button onClick={handleOnClickSearch} id="searchBut" className="rounded-full bg-gray-300 border-2 px-2 mb-1 border-cyan-600 font-bold">{!isPressed?"Search":"X"}</button>
</div>
)

}