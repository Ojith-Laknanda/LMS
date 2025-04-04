import React, { useContext } from 'react'; // Added useContext import
import { Link, NavLink } from 'react-router-dom'; // Added Link import
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';

const SideBar = () => {
  
  const {isEducator} = useContext(AppContext);

  const menuItems = [// this is for the side bar that has the name, path and icon as an object array
    {name: 'Dashboard', path: '/educator' ,icon:assets.home_icon },
    {name: 'Add Course', path: '/educator/add-course',icon:assets.add_icon},
    {name: 'My Course', path: '/educator/my-course',icon:assets.my_course_icon},
    {name:'Student Enrolled', path: '/educator/student-enrolled',icon:assets.person_tick_icon},
  ]

  return isEducator && (
    <div className='md:w-64 w-16 border-r min-h-screen text-base boarder-gray-500 py-2 flex flex-col'>
      
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          className={({ isActive }) => `flex items-center gap-2 md:flex-row flex-col md:justify-start py-3.5 md:px-10 hover:bg-blue-600 hover:text-white 
          ${isActive ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90' : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'}`}
          end={item.path === '/educator'}
        >
          <img src={item.icon} alt="" className='w-6 h-6'/>
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
        
      ))}
    </div>
  )
}

export default SideBar
