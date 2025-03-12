import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Displaydata() {
    const [showData,setData]= useState([])

    useEffect(()=>{
        const fetch = async ()=>{
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/users") 
                .then(res => setData(res.data))
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    })
  return (
    <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                id 
                </th>
                <th scope="col" className="px-6 py-3">
                user name 
                </th>
                <th scope="col" className="px-6 py-3">
                email
                </th>
                <th scope="col" className="px-6 py-3">
                phone
                </th>
                <th scope="col" className="px-6 py-3">
                company name
                </th>
                <th scope="col" className="px-6 py-3">
                address 
                </th>
            </tr>
        </thead>
        {showData.map((item)=>(
             <tbody key={item.id}>
             <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {item.id}
                 </th>
                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {item.username}
                 </th>
                 <td className="px-6 py-4">
                 {item.email}
                 </td>
                 <td className="px-6 py-4">
                 {item.phone}
                 </td>
                 <td className="px-6 py-4">
                     {item.company.name}
                 </td>
                 <td className="px-6 py-4">
                 {item.address.city}
                 </td>
             </tr>
            
         </tbody>
        ))}
       
    </table>
</div>
    </>
  )
}

export default Displaydata
