import React, { useEffect, useRef ,useState } from 'react'
//in here we give each course to a unique id it will be used to identify the course
import uniqueid from 'uniqid'
import Quill from 'quill' //this is use for the quill editor that doing the rich text editor,the rich text means the text with the formating
import { assets } from '../../assets/assets';
// https://quilljs.com/docs/installation add the link to the app.jsx file

const AddCourse = () => {

  const quillRef = useRef(null); //this is use for the quill editor like the rich text editor
  const editorRef = useRef(null); //this is use for the quill editor like the rich text editor

  //in here we need to make a for for get the editor data like cource title,price ,discount,img ,chapters and so on 

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);

  const[showPopUp , setShowPopUp] = useState(false);//this is for the pop up window
  const[currentChapterId , setCurrentChapterId] = useState(null);//this is for the current chapter id
  const [lecureDeails , setLecureDetails] = useState({
    lecureTitle : '',
    lecureDuration : '',
    lecureUrl : '',
    isPreviewFree : false,
  });//this is for the lecure details and initialize it with an object

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { 
        theme: 'snow',
      });
    }
  }, []);

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter chapter title');
      if (title) {
        const newChapter = {
          chapterId: uniqueid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureId) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopUp(true);
    }else if(action === 'remove'){
      setChapters(chapters.map((chapter) => {
        if (chapter.chapterId === chapterId) {
          chapter.chapterContent.splice(lectureId, 1);
        }
        return chapter;
      }));
    }
  }

  const addLecture = () => {
    setChapters(chapters.map((chapter) => {
      if (chapter.chapterId === currentChapterId) {
        const newLecture = {
          ...lecureDeails,
          lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
          lectureId: uniqueid(),
        };
        chapter.chapterContent.push(newLecture);
        }
        return chapter;
    })
    );
    setShowPopUp(true); // Show the popup
    setLecureDetails({
      lecureTitle : '',
      lecureDuration : '',
      lecureUrl : '',
      isPreviewFree : false,
    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      courseTitle,
      coursePrice,
      discount,
      image,
      chapters,
      lecureDeails,
    };
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className='h-screen overflow-hidden flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pb-0'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-md text-gray-500'>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required  placeholder='Enter Course Title'
          className='outline-none border border-gray-500 rounded md:py-2.5 py-2  px-3'/>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef} className="border border-gray-500 rounded p-2"></div> {/* Added border and padding for better styling */}
        </div>

        <div className='flex items-center justify-between flex-wrap gap-4'> {/* Added gap-4 for spacing */}
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input type="number" value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} required  placeholder='Enter Course Price'
            className='outline-none border border-gray-500 rounded md:py-2.5 py-2 w-28 px-3'/>
          </div>

          <div className='flex md:flex-row flex-col gap-3 items-center'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
            <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-500 rounded' /> {/*this is the icon for the file upload,htmlFor="thumbnailImage" this is a id for the input file when the fild is clicked the input file will be clicked */}
              <input type="file" id='thumbnailImage' className='hidden' onChange={(e) => setImage(e.target.files[0])} accept='image/*' hidden/>
              <img src={image ? URL.createObjectURL(image) : ''} alt="" className='max-h-12'/>{/* this is for the image preview */}
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <p>Discount</p>
          <input type="number" value={discount} placeholder='0' min={0} max={100} onChange={e=>setDiscount(e.target.value)} className='outline-none md:py-2.5 py-2 border border-gray-500 rounded px-3 w-28'/>
        </div>
      {/*adding chapters and lectures */}
      <div>
        {chapters.map((chapter, index) => (
          <div key={index} className='bg-white border rounded-lg mb-4'>
            <div className='flex items-center justify-between p-4 border-b'>
              <div className='flex items-center '>
                <img src={assets.dropdown_icon} width={14} alt=""  className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`} 
                onClick={() => handleChapter('toggle', chapter.chapterId)}/>
                <span className='font-semibold'>{index+1} {chapter.chapterTitle}</span>
              </div>
              <span className='text-gray-500'>{chapter.chapterContent.lenght} Lectures</span>
              <img src={assets.cross_icon}  alt="" className='cursor-pointer' onClick={() => handleChapter('remove', chapter.chapterId)}/> {/*this is for the delete icon */}
            </div>
            {!chapter.collapsed && (
              <div className='p-4'>
                {chapter.chapterContent.map((lecture, lectureIndex) => (
                  <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                    <span>{lectureIndex+1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target="_blank" 
                    className='text-blue-500'>Link</a> - {lecture.isPreviewFree ? "Free Preview" : "Paid"}</span>
                    <img src={assets.cross_icon} alt="" className='cursor-pointer' onClick={() => handleLecture('remove',chapter.chapterId, lectureIndex)}/>
                  </div>
                ))}  
                <div className='inline-flex bg-gray-100p-2 rounded cursor-pointer mt-2' onClick={() => handleLecture('add', chapter.chapterId)}>
                  + Add Lecture
                </div>
              </div>
            )}
          </div>
        ))}
        <div
          className='flex justify-between items-center p-2 bg-blue-100 rounded-lg cursor-pointer'
          onClick={() => handleChapter('add')} // Corrected function name
        >
          + Add Chapter
        </div>
        {showPopUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className='relative bg-white p-6 rounded-lg'>
              <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>

              <div className='mb-2'>
                <p>Lecture Title</p>
                <input
                  type="text"
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lecureDeails.lecureTitle}
                  onChange={(e) => setLecureDetails({ ...lecureDeails, lecureTitle: e.target.value })} // Fixed typo
                />
              </div>

              <div className='mb-2'>
                <p>Duration (mins)</p>
                <input
                  type="number"
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lecureDeails.lecureDuration}
                  onChange={(e) => setLecureDetails({ ...lecureDeails, lecureDuration: e.target.value })} // Fixed typo
                />
              </div>

              <div className='mb-2'>
                <p>Lecture Url</p>
                <input
                  type="text"
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lecureDeails.lecureUrl}
                  onChange={(e) => setLecureDetails({ ...lecureDeails, lecureUrl: e.target.value })} // Fixed typo
                />
              </div>

              <div className='flex gap-2 my-4'>
                <p>Is Preview Free?</p>
                <input
                  type="checkbox"
                  className='mt-1 scale-125'
                  checked={lecureDeails.isPreviewFree}
                  onChange={(e) => setLecureDetails({ ...lecureDeails, isPreviewFree: e.target.checked })} // Fixed checkbox handling
                />
              </div>

              <button
                type='button'
                className='w-full bg-blue-400 text-white px-4 py-2 rounded'
                onClick={addLecture } 
                >
                Add
              </button>
              <img
                src={assets.cross_icon}
                alt=""
                className='absolute top-4 right-4 cursor-pointer'
                onClick={() => setShowPopUp(false)} // Close the popup
              />
            </div>
          </div>
        )}
        <button type='submit' className='w-max bg-black text-white px-8 py-2.5 rounded my-4 cursor-pointer ' >ADD</button>
      </div>
      </form>

      
    </div>
  )
}

export default AddCourse
