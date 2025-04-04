import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'> 
      <div className='flex flex-col md:flex-row px-8 md:px-0 justify-center gap10 md:gap-32 py-10 border-b border-white/30 items-start'> {/*this is for the 3 columns handling the footer */}
        <div className='flex flex-col md:items-start items-center w-full'> {/*this is for the first column */} 
          <img src={assets.logo_dark} alt="logo" />
          <p className='mt-6 text-center md:text-left text-sm text-white/80 '>A smart and efficient platform for seamless learning and course management. Empowering educators and students with innovative tools.</p>
        </div>
          
        <div className='flex flex-col md:items-start items-center w-full'> {/*this is for the second column */}
          
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          
          <ul className='text-white/80 flex md:flex-col w-full justify-between text-sm md:space-y-2 '>
            <li><a href="#home" className='hover:underline'>Home</a></li>
            <li><a href="#about" className='hover:underline'>About Us</a></li>
            <li><a href="#contact" className='hover:underline'>Contact Us</a></li>
            <li><a href="#Privacy policy" className='hover:underline'>Privacy policy </a></li>
          </ul>
        
        </div>
        
        <div className='hidden md:flex flex-col md:items-start items-center w-full'> {/*this is for the third column */}
          
          <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
          <p className='text-white/80 text-sm'>The latest news, articales, and resources, sent to your inbox weekly</p>
          
          <div className='flex gap-2 pt-4 items-center'>
            <input type="email" placeholder='Enter Your Email' className='border border-e-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray outline-none w-64 h-9 rounded text-sm pl-2'/>
            <button className='bg-blue-600 w-24 h-9 text-white rounded '>Subscribe</button>
          </div>

        </div>
      
      </div>
      <p className='py-4 text-center text-xs md:text-sm text-white/60' > {/*this is for the copyright  */}
        Copyright 2025 © OJIYA. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
