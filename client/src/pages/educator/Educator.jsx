import React from "react";
import { Outlet } from "react-router-dom"; // used for the nested routes for display
// //defult value is h1 tag if we go nested it show that data also
// //Outlet is used to display the nested routes

import Navbar from "../../components/educator/NavBar"; // this is for the nav bar
import Sidebar from "../../components/educator/SideBar";
import Footer from "../../components/educator/Footer";

const Educator = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <Navbar /> {/* we place it in here because we want to display it in all the pages */}
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          {<Outlet />} {/* the outlet is doing the nested routes  */}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Educator;
