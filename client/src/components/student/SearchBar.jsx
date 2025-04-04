import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

  const navigate =useNavigate() // we can use this for navigate to other pages
  const[input,setInput]=useState(data ? data :'') //store the input feild data

  const onSearchHander =(e)=>{
    e.preventDefault();
    navigate('/course-list/'+input)
  }// prevent reloading while searching
  
  return (
      <form onSubmit={onSearchHander} className='max-w-xl w-full md:h-14 h-12 flex item-center bg-white border border-gray-500/20 rounded-2xl'>
        <img src={assets.search_icon} alt="search icon" className='md:w-12 w-10  px-3'/>
        <input onChange={e=> setInput(e.target.value)} value={input} type="text" placeholder='Search for courses' className='w-full h-full text-gray-500/80 outline-none'/>
        <button type="submit" className='bg-blue-600 rounded-2xl text-white md:px-10 px-7 md:py-3 py-2 mx-1'>Search</button>
      </form>
  )
}

export default SearchBar
