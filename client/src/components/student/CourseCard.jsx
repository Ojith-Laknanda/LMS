import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {
 
  const {currency,calculateRating } =useContext(AppContext) 
  {/*useing usecontext hook we can get the data from the
    context file that we already made, this is use for currency language things i think */}
  
  return (
    <Link to={'/course/'+course._id} className='border border-gray-500/30 pb-6 rounded-lg overflow-hidden' 
    onClick={()=> scrollTo(0,0)}> {/*this is use to link to the inidivual course page*/}
      <img src={course.courseThumbnail} alt="" className='w-full ' />{/*this is use to display the image of the course*/} 
      <div className='p-3 text-left'> {/*this is use to display the course title, educator name, rating, price*/}
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        {/* <p className='text-sm text-gray-600 mt-2'>{course.educator.name}</p> */}
        <p className='text-sm text-gray-600 mt-2'>Ojith</p>
        <div className='flex items-center space-x-2 mt-2'>
          <p>{calculateRating(course)}</p>
          <div className='flex gap-1'>
            {[...Array(5)].map((_,i)=>(<img key={i} src={i<Math.floor(calculateRating(course))?assets.star :assets.star_blank} alt='' 
            className='w-3.5 h-3.5' />) )} 
          </div>
          <p className='text-gray-500'>{course.courseRatings.length}</p>
        </div>
        <p className='text-base font-semibold tet-gray-800'>{currency }{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default CourseCard
