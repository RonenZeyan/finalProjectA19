import React from 'react'
import Cell from "./cell"

export const Row = (prop) =>{
    return (
        <tr className='md:table-row sm:flex sm:flex-col sm:justify-center sm:text-center'>
            {prop.tableSort.map((fieldName) => (
                <Cell key={fieldName} data={prop.data[fieldName]} header={prop.header}/>
            ))}
            {/* <td>{prop.extraColumns(prop.data)}</td> */}
            <td className='py-2'>{prop.extraColumns.map((func)=>func(prop.data))}</td>
        </tr>
    );
}

export default Row