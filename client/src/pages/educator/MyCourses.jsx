import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'

const MyCourses = () => {
  const {currency,allCourses} = useContext(AppContext);
  const [courses,setCourses]=useState(null);

  const fetchEducatorCourses=async()=>{
    setCourses(allCourses);
  }

  // useEffect runs only once when the component loads (like componentDidMount)
  useEffect(() => {
    fetchEducatorCourses();
  }, []); // we no need to add the allCourses to the dependency array why because we want to fetch the data when the component mounts

  // useEffect runs every time 'allcourses' changes
// useEffect(() => {
//   fetchEducatorCourses();
// }, [allcourses]);

  return courses ? (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>

        <div className='flex flex-col items max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
          <table className='md:table-auto table-fixed w-full overflow-hidden '>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left '>
              <tr>
                <th className='font-semibold truncate px-4 py-3'>All Course</th>
                <th className='font-semibold truncate px-4 py-3'>Earnings</th>
                <th className='font-semibold truncate px-4 py-3'>Students</th>
                <th className='font-semibold truncate px-4 py-3'>Published On</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500/20"> 
                  <td className="truncate md:px-4 py-3 pl-2 md:pl-4 flex items-center space-x-3">
                    <img src={course.courseThumbnail} alt="courseThumbnail" className='w-16' />
                    <span className='truncate hidden md:block'>{course.courseTitle}</span></td>
                  <td className="truncate px-4 py-3">
                    {currency}
                    {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice /100))}
                    </td>
                  
                  <td className=" px-4 py-3">{course.enrolledStudents.length}</td>
                  <td className=" px-4 py-3">{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  ): <Loading/>
}

export default MyCourses
