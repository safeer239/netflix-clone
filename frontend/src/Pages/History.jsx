import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { SMALL_IMG_BASE_URL } from '../utils/baseUrl'
import axios from 'axios'
import { Trash } from 'lucide-react'

function formatDate(dateString){
    const date =new Date(dateString)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec']

    const month= monthNames[date.getUTCMonth()]
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()

    return `${month} ${day} ${year}`
}
const History = () => {
    const [searchHistory,setSearchHistory]=useState([])

    useEffect(()=>{
        const getSearchHistory =async()=>{
            try {
                const res= await axios.get(`/api/v1/search/searchHistory`)
                setSearchHistory(res.data.content)
            } catch (error) {
                console.log(error.message)
                setSearchHistory([])
            }
        }
        getSearchHistory()
    },[])

    const handleDelete=async(item)=>{
        try {
            await axios.delete(`/api/v1/search/deleteSearchHistory/${item.id}`)
            setSearchHistory(searchHistory.filter((res)=>res.id !==item.id))
        } catch (error) {
            toast.error("Failed to delete search history")
        }
    }

    if(searchHistory?.length === 0) {
        return (
            <div className="bg-black min-h-screen text-white">
                <Navbar />
                <div className='max-w-6xl mx-auto px-4 py-8'>
                    <h1 className='text-3xl font-bold mb-8'>Search History</h1>
                    <div className="flex justify-center items-center h-96">
                        <p className='text-xl'> No search history found</p>
                    </div>
                </div>
            </div>
        )
    }
  return (
    <div className='h-screen text-white bg-black'>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className='text-3xl font-bold mb-8'>Search History</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ld:grid-cols-3 gap-4">
                {searchHistory?.map((item)=>(
                    <div key={item.id} className='bg-gray-800 p-4 rounded flex items-start'>
                        <img src={SMALL_IMG_BASE_URL + item.image} alt="" className='size-16 rounded-full object-cover mr-4' />
                        <div className='flex flex-col'>
                            <span className='text-white text-lg'>{item.title}</span>
                            <span className='text-gray-400 text-sm'>{formatDate(item.createdAt)}</span>
                        </div>
                        <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                            item.searchType ==="movie" ? "bg-red-600" : item.searchType==="tv" ? "bg-blue-600" : "bg-green-600"}`}>
                                {item.searchType[0].toUpperCase() + item.searchType.slice(1)}
                            </span>
                            <Trash className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600 ' onClick={()=>handleDelete(item)}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default History