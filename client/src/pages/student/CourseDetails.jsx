import React, { use } from "react";
import { useParams } from "react-router-dom"; //useParams is a hook that returns an object of key/value pairs of URL parameters.
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import Youtube from 'react-youtube';

const CourseDetails = () => {
  const { id } = useParams(); //get the id from the url
  const [courseData, setCourseData] = useState(null); //set the course data to null ,this is for store the coures data
  const [openSection, setOpenSection] = useState({}); // this is for open the section
  const [isEnrolled, setIsEnrolled] = useState(false); //this is for user is enroll or not
  //this is for player data
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateChapter,
    calculateCourseDuration,
    currency,
  } = useContext(AppContext); //get the all courses data from the context

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id); //find the course by id

    if (findCourse) {
      // Remove h2, ul, li, and p tags from courseDescription and replace with a space
      findCourse.courseDescription = findCourse.courseDescription.replace(
        /<\/?(h2|ul|li|p)[^>]*>/g,
        " "
      );
    }
    setCourseData(findCourse); //set the course data
  };
  
    useEffect(() => {
      fetchCourseData();
    }, [allCourses]); //useEffect is used to call the fetchCourseData function when the component is mounted if refresh the page load the data again


  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  }; //this is for toggle the section

  return courseData ? ( //if the course data is available then show the course data
    <>
      <div
        className="flex md:flex-row flex-col-reverse gap-10 relative items-start 
    md:px-36 px-8 pt-20 text-left justify-between"
      >
        <div className="absolute top-0 left-0 w-full h-section-height   bg-gradient-to-b from-cyan-100/70  "></div>
        {/* this is for gradianet color below the navbar */}
        {/* left col  */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:course-deatails-heading-large course-deatails-heading-small font-semibold text-gray-800">
            {courseData?.courseTitle}
          </h1>
          <p>{courseData.courseDescription}</p>

          {/* course review and rating*/}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt=""
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p className="text-gray-500">
              {courseData.courseRatings.length} (
              {courseData.courseRatings.length > 1 ? "Ratings" : "Rating"})
            </p>
            <p className="text-gray-500">
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1
                ? " Students"
                : " Student"}
            </p>
          </div>
          <p className="text-sm">
            Course by <span className="text-blue-600 underline"> Ojith</span>
          </p>
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    className="flex justify-between items-center py-3 px-4 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        alt=""
                        className={`transition-transform duration-300 ${
                          openSection[index] ? "rotate-180" : "rotate-0"
                        }`}
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-defualt text-gray-500">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapter(chapter)}{" "}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pr-4 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, index) => (
                        <li key={index} className="flex items-start gap-2 py-1">
                          <img
                            src={assets.play_icon}
                            alt=""
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex item justify-between w-full text-gray-800 text-xs md:text-defualt">
                            <p className="text-sm md:text-base">
                              {lecture.lectureTitle}
                            </p>
                            <div className=" flex gap-2">
                              {" "}
                              {/*this is for the preview  */}
                              {lecture.isPreviewFree && (
                                <p onClick={() => setPlayerData({
                                  videoId : lecture.videoUrl.split('/').pop(),

                                })} 
                                className=" cursor-pointer text-blue-500">
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                              {/*this is lecture duration  */}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-20 text-sm md:text-medium">
            {" "}
            {/*this is for the course duration */}
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <ul className="list-disc pl-5">
              {courseData.courseDescription
                .split(".")
                .map(
                  (desc, index) =>
                    desc.trim() && <li key={index}>{desc.trim()}.</li>
                )}
            </ul>
          </div>
        </div>

        {/* right col  */}
        <div
          className="max-w-course-card z-10 shadow-lg rounded-t md:rounded-none md:rounded-r-lg 
        overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]"
        >
          {playerData ? <Youtube videoId={playerData.videoId} opts={
                {
                  playerVars: {
                    autoplay: 1,
                  },
                }
              } iframeClassName="w-full aspect-video"/> //iframeClassName is used to add the class to the iframe
              : 
              <img src={courseData.courseThumbnail} alt="" /> //if the player data is not available then show the course thumbnail
               }
          

          <div className="pt-5 pb-3 px-5 shadow-2xl">
            <div>
              
              <img
                src={assets.time_left_clock_icon}
                alt="time_left_clock_icon"
                className="w-3.5"
              />
               
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-3">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold ">
                {currency}{" "}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 1000
                ).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">
                {courseData.discount}% off
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2 text-sm md:text-default md:pt-4 text-gary-500">
              <div className="flex items-center gap-2">
                <img src={assets.star} alt="star" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-2">
                <img src={assets.lesson_icon} alt="lesson_icon" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>{" "}
            {/*this is for the enroll button and check the user is enroll or not */}
            <div className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white text-center font-medium">
              <button
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setIsEnrolled(true)}
              >
                {isEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>
            </div>

            <div className="pt-5">
              {/*whats is in the couesre */}
              <p className="md:text-xl text-lg font-medium text-gray-800">what`s in the course?</p>
              <ul className="list-disc ml-5 pt-2 text-gray-600 text-sm md:text-defualt">
                <li>Full lifetime access with updates </li>
                <li>step-by-step, hands on project guidance.</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  ) : (
    <Loading />
  ); //if the course data is not available then show the loading component
};

export default CourseDetails;
