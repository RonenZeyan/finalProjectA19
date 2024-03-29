import React from 'react'
import Row from "./row"

export const Table = (prop) => {
    return (
        <table className='rounded-lg m-auto border-collapse border border-slate-400 bg-white bg-opacity-50 mb-5'>
            {prop.data.length > 0 && (
                <thead>
                <tr className='uppercase sm:hidden md:contents'>{prop.tableSort.map((colName) => <th>{colName}</th>)}</tr>
                </thead>
            )}
            <tbody className='sm:flex sm:flex-col md:contents'>
                {prop.data.map((d, index) => <Row key={index} tableSort={prop.tableSort} data={d} extraColumns={prop.extraColumns} header={false}/>)}
            </tbody>
        </table>
    );
}


export default Table