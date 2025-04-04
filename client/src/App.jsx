import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentEnrolled from "./pages/educator/StudentEnrolled";
import "quill/dist/quill.snow.css";

import Navbar from "./components/student/Navbar";
const App = () => {

  const isEducatorRoute=useMatch('/educator/*') // when the use  goes to educator page it will hide nave bar   //It is typically used when you want to hide the navbar on specific pages.

  return (
    <div className=" min-h-screen bg-white">
      {!isEducatorRoute && <Navbar/>} {/* Conditional Rendering  if !isEducatorRoute true then do navbar*/}
      <Routes>
        {/* this is for the students */}
        
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        
        <Route path="/course-list/:input" element={<CoursesList />} />{" "}
        {/* thi si sfor the filtering part  */}
        <Route path="/course/:id" element={<CourseDetails />} />{" "}
        {/*give a unique id for the cource */}
        
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        
        <Route path="/educator" element={<Educator/>}>
          <Route  path="/educator" element={<Dashboard/>}/>
          <Route  path="add-course" element={<AddCourse/>}/>
          <Route  path="my-course" element={<MyCourses/>}/>
          <Route  path="student-enrolled" element={<StudentEnrolled/>}/>
        </Route> {/*nested routes */}

      </Routes>
    </div>
  );
};

export default App;
