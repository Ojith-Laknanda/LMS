// storing states and functions aka logics
//first add creat context hook

import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate(); // we can use this for navigate to other pages //useNavigate is a hook that returns a navigate function that you can use to navigate programmatically

  const [allCourses, setAllCourses] = useState([]); //for get all the courses data and display 4 for it
  const [isEducator, setIsEducator] = useState(true); //for checking if the user is educator or not //useState is a hook that returns a stateful value, and a function to update it.
  const [enrolledCourses, setEnrolledCourses] = useState([]); //for get the enrolled courses data and display 4 for it 
  // [] is used to store the data in array ,{} is used to store the data in object
  
  //fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };
  const fetchEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  }

  //function to calculate average rating of a course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((review) => {
      totalRating += review.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  //funtion to calculate cousre chapter time
  const calculateChapter = (chapter) => {
    let time = 0;
    chapter.chapterContent.map( // we get the chapterCntent from the dummyCourses 
        (lecture) => { // we get the lecture from the chapterContent 
      time += lecture.lectureDuration;
      return humanizeDuration(time *60 * 1000 ,{units: ['h', 'm'], round: true});
    });
    return time;
  };

  // function for calculating the total course duration in hours and minutes
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) =>
      chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration;
      })
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
  };

  //function to calculate No of Lectures in the course
    // const calculateNoOfLectures = (course) => {
    //     let lectures = 0;
    //     course.courseContent.map((chapter) => {
    //     lectures += chapter.chapterContent.length;
    //     });
    //     return lectures;
    // };

    const calculateNoOfLectures = (course) => {
        let lectures = 0;
        course.courseContent.forEach((chapter) => {
            if(Array.isArray(chapter.chapterContent)){
                lectures += chapter.chapterContent.length;
            }
        });
        return lectures;
    };

  useEffect(() => {
    //useEffect is used to call the fetchAllCourses function
    fetchAllCourses();
    fetchEnrolledCourses();
  }, []);

  const value = {
    currency,
    allCourses, //this is used to get all the courses
    navigate, //this is used to navigate to the other pages
    calculateRating, //this is used to calculate the rating of the course
    isEducator, //this is used to check if the user is educator or not
    setIsEducator, //this is used to set the user as educator
    calculateNoOfLectures, //this is used to calculate the no of lectures in the course
    calculateChapter, //this is used to calculate the course time
    calculateCourseDuration, //this is used to calculate the course duration
    enrolledCourses, //this is used to get the enrolled courses
    fetchEnrolledCourses, //this is used to fetch the enrolled courses in other pages     // very important
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider> //this is used to provide the value to the children
  );
};
