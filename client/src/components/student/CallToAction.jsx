import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className=' flex flex-col items-center gap-4 pt-10 px-8 md:px-0'>
      <h1 className='text-xl md:text text-gray font-semibold'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 sm:text-sm'>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam <br />aliqua proident excepteur commodo do ea.</p>
      <div className='flex gap-6 items-center mt-4 font-medium'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600'>Get started</button>
        <button className='px-10 py-3 rounded-xl flex gap-2 items-center md:hover:shadow-[0px_4px_15px_0px] '>Learn more <img src={assets.arrow_icon} alt="arrow_icon" /></button>
      </div>
    </div>
  )
}

export default CallToAction
