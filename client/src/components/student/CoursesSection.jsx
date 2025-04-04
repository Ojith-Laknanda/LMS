import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {

  const {allCourses}=useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>{/*  font-medium how mush it should bold  text-3xl means like size of the word*/}
      <p className='text-sm md:text-base text-gray-500 mt-3 pb-3'>Discover our top-rated courses across various categories.<br/> From coding and design to business and wellness, our courses are crafted to deliver results.</p>
      
      <div className='grid grid-template-columns md:grid-cols-4 gap-6 mt-10 mb-10'>{/*grid-cols-1 means how many columns should be there in the grid*/}
        {allCourses.slice(0,4).map((course,index)=><CourseCard key={index} course={course}/>)}{/*slice is use to get the first 4 courses from the all courses array*/}
      </div>

      <Link to={'/course-list'} onClick={()=> scrollTo(0,0)}
      className=' text-gray-500 boarder border border-gray-500/ px-10 py-3 rounded-2xl '
      >Show all Courses</Link>
    </div>
  )
}

export default CoursesSection