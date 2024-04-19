import React from 'react';

//this component used for create cell in the row that used as a reuse in table component 
export const Cell = (prop) => {
    //we check if the data is a path of image 
    const isImageUrl = (data) => {
        return (typeof data === 'string' || data instanceof String) && (data.match(/\.(jpeg|jpg|gif|png)$/) != null);
    };

    const cellStyle = prop.data === 'completed' ? 'text-green-800' : 
    prop.data === 'IN PROCESS' ? 'text-yellow-600' :
    prop.data === 'waiting' ? 'text-red-600' : '';

    return (
        <td className={`border border-slate-300 font-bold px-5 ${cellStyle}`}>
            {prop.header ? (
                <strong>{prop.data}</strong>
            ) : isImageUrl(prop.data) ? (
                <img className='m-auto' src={prop.data?`${prop.data}`:"/Images/iconMan.png"} alt="UserIMG" style={{width: '50px', height: '50px',border:'solid 2px grey',borderRadius:'50%'}} />
            ) : (
                prop.data
            )}
        </td>
    );
};

export default Cell;
