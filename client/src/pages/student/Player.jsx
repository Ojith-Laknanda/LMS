import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

const Player = () => {
  const { enrolledCourses, calculateChapter } = useContext(AppContext);
  const { courseId } = useParams(); // this one output a object
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState([]);
  const [playerData, setPlayerData] = useState(null);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        console.log("Course found:", course); // Debugging log
        setCourseData(course);
      }
    });
  };
  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  }; //this is for toggle the section

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]); //this enrolledCourse use for get the data when the page reload

  return (
    <>
      <div className="md:px-36 p-4 sm:p-10 flex flex-col md:grid md:grid-cols-2 gap-10">
        <div className="text-gray-800">
          {" "}
          {/* this is left column  for the structer of the course*/}
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
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
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <li key={lectureIndex} className="flex items-start gap-2 py-1">
                          <img
                            src={
                              false ? assets.blue_tick_icon : assets.play_icon
                            }
                            alt=""
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex item justify-between w-full text-gray-800 text-xs md:text-defualt">
                            <p className="text-sm md:text-base">
                              {lecture.lectureTitle}
                            </p>
                            <div className=" flex gap-2">
                              {" "}
                              {/*this is for the watch  */}
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1, // Use the chapter index here
                                      lecture: lectureIndex + 1, // Use the lecture index here
                                    })
                                  }
                                  className=" cursor-pointer text-blue-500"
                                >
                                  Watch
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

          <div className="flex ite gap-2 py-3 mt-10">
            <h1 className="text-xl font-semibold">Rate this course: </h1> {/*this will help to user to rate the course video */}
            <Rating initialRating={0}/>
          </div>

        </div>

        <div className="md:mt-10"> {/* this is right column  for play the video*/}
          {playerData ? (
            <div className="w-full h-full">
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                opts={{ playerVars: { autoplay: true } }}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex items-center justify-between mt-1">
                <p>{playerData.chapter}.{playerData.lecture } {playerData.lectureTitle}</p>
                <button className="text-blue-600 ">{false ? "Completed" : "Mark Complete"}</button>
              </div>
            </div>
          ) : (
            <img src={courseData ? courseData.courseThumbnail : ""} alt="" />
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Player;
