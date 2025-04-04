import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams(); //useParams is a hook that returns an object of key/value pairs of URL parameters.it use for get the input value from the url for the searach bar

  const [filteredCourse, setFilteredCourse] = useState([]); //useState is a hook that returns a stateful value, and a function to update it.
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setFilteredCourse(
            tempCourses.filter((course) =>
              course.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          ) // show the searached courses
        : setFilteredCourse(tempCourses); //show all the courses
    }
  }, [allCourses, input]); //useEffect is used to call the fetchAllCourses function
  //when the all courses and input(url) value is changed this function will be called
  // we will store the filtered data to the filteredCourse state
  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex justify-between w-full md:flex-row flex-col gap-6 items-start">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p onClick={() => navigate("/")} className="text-gray-500">
              <span className=" text-blue-600 cursor-pointer">Home </span> /
              <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 mt-8 px-4 py-2 border -mb-8 text-gray-600">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt=""
              className="cursor-pointer"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}
        {/*this is for add a close button */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-3 my-16 px-2 md:p-0">
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CoursesList;
