import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

import { useClerk ,UserButton , useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";


const Navbar = () => {
  const {navigate,isEducator} = useContext(AppContext); // we can use this for navigate to other pages 
  const isCourseListPage = location.pathname.includes("/courses-list"); //this is for get the bg color of the course to the nav bar retun true or false , reffer the url link that has some /courses-list

  const {openSignIn} = useClerk() //use for open the signin form
  const {user}=useUser() // to get the correct user

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 
      lg:px-36 border-b border-gray-500 py-4 bg ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      } `} // we use `` cause already used {} to the dynamic nav bar
    >
      {/* sm: → ≥ 640px (Small screens) md: → ≥ 768px (Medium screens) lg: → ≥ 1024px (Large screens)  px padding x axis like left to right same as py top to bottm*/}
      <img  src={assets.logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer" onClick={()=>navigate('/') }/>
      {/* w-28 defulat width  lg:w-32 different width for the diffrent displays cursor-pointe */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          { user && <>
            <button onClick={() => navigate('/educator')}>{isEducator?'Educator Dashboard': 'Become Educator'}</button>
            <span className="mx-2">|</span>
          <Link to="/my-enrollments">My Enrollments</Link>
            </>
          }
          
        </div>

        { user ? <UserButton/> :
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full" onClick={()=>openSignIn()}>Create Account</button>
        }

        {/*by defult hidden on mobile phones  only visible for larger screens*/}
      </div>
      {/*this is for laptop view */}


      <div className="md:hidden flex items-center item gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs ">
        { user && <>
            <button onClick={() => navigate('/educator')}>{isEducator?'Educator Dashboard': 'Become Educator'}</button>
            <span className="mx-2">|</span>
          <Link to="/my-enrollments">My Enrollments</Link>
            </>
          }
        </div>
        {
          user ? <UserButton/> :
          <button onClick={()=>openSignIn()}>
          <img src={assets.user_icon} alt="" />
        </button>}
      </div>
      {/*this is for mobile view */}
    </div>
  );
};

export default Navbar;
