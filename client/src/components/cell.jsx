import React from 'react';

export const Cell = (prop) => {
    //we check if the data is a path of image 
    const isImageUrl = (data) => {
        return (typeof data === 'string' || data instanceof String) && (data.match(/\.(jpeg|jpg|gif|png)$/) != null);
    };

    return (
        <td className='border border-slate-300 font-bold px-5'>
            {prop.header ? (
                <strong>{prop.data}</strong>
            ) : isImageUrl(prop.data) ? (
                <img className='m-auto' src={prop.data?`https://final-project-a19-frontend.vercel.app/${prop.data}`:"/Images/iconMan.png"} alt="UserIMG" style={{width: '50px', height: '50px',border:'solid 2px grey',borderRadius:'50%'}} />
            ) : (
                prop.data
            )}
        </td>
    );
};

export default Cell;
