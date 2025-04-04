import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import {Line} from 'rc-progress';
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration,navigate } = useContext(AppContext);
  const [ progressArray, setProgressArray ] = useState([
    { lecturesCompleted: 4, totalLectures: 10 },
    { lecturesCompleted: 8, totalLectures: 10 },
    { lecturesCompleted: 8, totalLectures: 8 },
    { lecturesCompleted: 3, totalLectures: 7 },
    { lecturesCompleted: 9, totalLectures: 10 },
    { lecturesCompleted: 5, totalLectures: 12 },
    { lecturesCompleted: 7, totalLectures: 15 },
    { lecturesCompleted: 2, totalLectures: 6 },
    { lecturesCompleted: 10, totalLectures: 10 },
    { lecturesCompleted: 4, totalLectures: 5 }
  ]);//initially display dummy data after set it with backend data 

  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className=" text-2xl font-semibold">My Enrollments</h1>
        <table className="md:table-auto table-fixed w-full mt-10 overflow-hidden border">
          <thead className="text-gray-900 border-b boarder-gray-500/20 text-sm text-left max-sm:hidden ">{/* max-sm means screens smaller than the sm breakpoint) */}
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>{/* truncate is like overflow hidden */}
              <th className="px-4 py-3 font-semibold truncate">
                Duration
              </th>{/* truncate is like overflow hidden */}
              <th className="px-4 py-3 font-semibold truncate">
                Completed
              </th>{/* truncate is like overflow hidden */}
              <th className="px-4 py-3 font-semibold truncate">status</th>{/* truncate is like overflow hidden */}
            </tr>
          </thead>
          <tbody className="text-gray-700 ">{/* max-sm means screens smaller than the sm breakpoint) */}
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">{/*Purpose: Adds horizontal space between the child elements inside the <td> element. The space is 0.75rem (12px) between each child element.Result: If you have multiple items (e.g., icons, text, etc.) inside the <td>, there will be a 12px gap between each of them.*/}
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-14 sm:w24 md:w-28"
                  />
                  <div className="flex-1"> {/*flex-1 is a utility class that sets the flex-grow property to 1. This means that the flex item will grow to fill the available space in the flex container.*/}
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle} </p>
                    <Line strokeWidth={2} percent={progressArray[index]?(progressArray[index].lecturesCompleted*100/progressArray[index].totalLectures):0} className="bg-gray-300 rounded-full"/> {/*Line is a progress bar */}
                  </div>
                </td>

                <td className="px-4 py-3 max-sm:hidden">{calculateCourseDuration(course)}</td>
                <td className="px-4 py-3 max-sm:hidden">{progressArray[index] && `${progressArray[index].lecturesCompleted } / ${progressArray[index].totalLectures }`} <span>lectures</span></td>
                <td className="px-4 py-3 max-sm:hidden ">
                  <button className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white" onClick={() => navigate(`/player/`+ course._id)}>
                    {progressArray[index] && progressArray[index].lecturesCompleted === progressArray[index].totalLectures ? "Completed" : "On Going"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};

export default MyEnrollments;
