import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const Dashboard = () => {
  const [dashBoardData, setDashBoardData] = useState(null);
  const { currency } = useContext(AppContext);

  const fetchDashboardData = async () => {
    setDashBoardData(dummyDashboardData);
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashBoardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap8 md:p-8 md:pb-0 p-4 pb-0">
      <div className="space-y-5">
        {/*in side this div has 1row and 3 columns */}
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap3 shadow-card border border-blue-500  p-4 w-56 rounded-md">
            {" "}
            {/*in side this div has 1row and 3 columns */}
            <img src={assets.patients_icon} alt="patients_icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashBoardData.enrolledStudentsData.length}
              </p>
              <p className="text-base text-gray-500">Total Enrolments</p>
            </div>
          </div>

          <div className="flex items-center gap3 shadow-card border border-blue-500  p-4 w-56 rounded-md">
            <img src={assets.appointments_icon} alt="appointments_icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashBoardData.totalCourses}
              </p>
              <p className="text-base text-gray-500">Total Courses</p>
            </div>
          </div>

          <div className="flex items-center gap3 shadow-card border border-blue-500  p-4 w-56 rounded-md">
            <img src={assets.earning_icon} alt="earning_icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {currency} {dashBoardData.totalEarnings}
              </p>
              <p className="text-base text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="pb-4 text-lg font-medium">Latest Enrollments</h2>
          <div
            className="flex flex-col items-center max-w-4xl w-full overflow-hidden
          rounded-md bg-white border border-gray-500/20"
          >
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className=" px-4 py-3 font-semibold text-center hidden sm:table-cell">
                    #
                  </th>
                  <th className=" px-4 py-3 font-semibold">Student Name</th>
                  <th className=" px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-m text-gray-500">
                {dashBoardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-500/20">
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {index + 1}
                    </td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt="profile"
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="truncate px-4 py-2">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
