import React from 'react';

// This component is used to create a cell in a row, which is reused in the table component
export const Cell = (prop) => {
    // Check if the data is a path of an image 
    const isImageUrl = (data) => {
        return (typeof data === 'string' || data instanceof String) && (data.match(/\.(jpeg|jpg|gif|png)$/) != null);
    };

    // change the style based on the status of the data
    const formattedData = formatStatus(prop.data);
    const cellStyle = formattedData === 'COMPLETED' ? 'text-green-800' :
                      formattedData === 'IN PROCESS' ? 'text-yellow-600' :
                      formattedData === 'WAITING' ? 'text-red-600' : '';

    return (
        <td className={`border border-slate-300 font-bold px-5 ${cellStyle}`}>
            {prop.header ? (
                <strong>{formattedData}</strong>
            ) : isImageUrl(prop.data) ? (
                <img className='m-auto' src={prop.data ? `${prop.data}` : "/Images/iconMan.png"} alt="UserIMG" style={{width: '50px', height: '50px', border: 'solid 2px grey', borderRadius: '50%'}} />
            ) : (
                formattedData
            )}
        </td>
    );
};

// we used this function to format status text (to be upper instead of small)
function formatStatus(data) {
    const statuses = ['waiting', 'in process', 'completed'];
    if (typeof data === 'string' && statuses.includes(data.toLowerCase())) {
        return data.toUpperCase();
    }
    return data;
}

export default Cell;
