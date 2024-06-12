import { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { FaBars, FaEnvelopeOpenText, FaHistory, FaTimes } from "react-icons/fa";
import { LuSheet } from "react-icons/lu";
import { MdPeopleAlt } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { BsGraphUpArrow } from "react-icons/bs";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const { data: userInfo = {} } = useQuery({
    queryKey: ["dashboard", user.email],
    queryFn: async () => {
      const response = await axiosPublic.get("/users", {
        params: { email: user?.email },
      });
      return response.data;
    },
  });

  console.log(userInfo)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex min-h-screen">
        {/* Sidebar for large screens */}
        <div className="hidden sm:block sm:w-64 bg-[#E9ECEF] min-h-screen">
          <div className="flex justify-center mt-8">
            <img className="w-40 rounded-full" src={userInfo?.image} alt="" />
          </div>

          <h2 className="text-center text-xl font-semibold my-2">
            {userInfo?.name}
          </h2>
          <h2 className="text-center text-lg font-medium my-2">
            {userInfo?.role}
          </h2>

          <div className="divider"></div>

          <div className="mt-8">
            {/* employee route */}
            {userInfo?.role === 'employee' && <> <NavLink
              to="/dashboard/work-sheet"
              className={({ isActive }) =>
                `block py-1 mx-12 ${
                  isActive ? "bg-[#6F42C1] text-white" : "text-black"
                } rounded-xl text-center font-medium`
              }
            >
              <p className="mb-4 flex items-center justify-center pt-3 gap-1">
                <span>
                  <LuSheet />
                </span>{" "}
                Work Sheet
              </p>
            </NavLink>

            <NavLink
              to="/dashboard/payment-history"
              className={({ isActive }) =>
                `block py-1 mx-12 ${
                  isActive ? "bg-[#6F42C1] text-white" : "text-black"
                } rounded-xl text-center font-medium`
              }
            >
              <p className="mb-4 flex items-center justify-center pt-3 gap-1">
                {" "}
                <span>
                  <FaHistory />
                </span>
                Payment History
              </p>
            </NavLink>
            </>}


            {/* HR route */}
              {userInfo?.role === 'HR' && <>
              <NavLink
              to="/dashboard/employee-list"
              className={({ isActive }) =>
                `block py-1 mx-12 ${
                  isActive ? "bg-[#6F42C1] text-white" : "text-black"
                } rounded-xl text-center font-medium`
              }
            >
              <p className="mb-4 flex items-center justify-center pt-3 gap-1">
                <span>
                  <MdPeopleAlt />
                </span>
                Employee List
              </p>
            </NavLink>


            <NavLink
              to="/dashboard/progress"
              className={({ isActive }) =>
                `block py-1 mx-12 ${
                  isActive ? "bg-[#6F42C1] text-white" : "text-black"
                } rounded-xl text-center font-medium`
              }
            >
              <p className="mb-4 flex items-center justify-center pt-3 gap-1">
                <span>
                <BsGraphUpArrow />
                </span>
                Progress
              </p>
            </NavLink>
              </>}


              {/* admin route */}
            {userInfo?.role === 'admin' &&
              <>
              <NavLink
              to="/dashboard/all-employee-list"
              className={({ isActive }) =>
                `block py-1 mx-12 ${
                  isActive ? "bg-[#6F42C1] text-white" : "text-black"
                } rounded-xl text-center font-medium`
              }
            >
              <p className="mb-4 flex items-center justify-center pt-3 gap-1">
                <span>
                  <FaPeopleGroup />
                </span>{" "}
                All Employee List
              </p>
            </NavLink>

            <NavLink
              to="/dashboard/feedback"
              className={({ isActive }) =>
                `block py-1 mx-12 ${
                  isActive ? "bg-[#6F42C1] text-white" : "text-black"
                } rounded-xl text-center font-medium`
              }
            >
              <p className="mb-4 flex items-center justify-center pt-3 gap-1">
                <span>
                <FaEnvelopeOpenText />
                </span>{" "}
                Messages
              </p>
            </NavLink>
              </>
            }
          </div>
        </div>

        {/* Toggle button for mobile */}
        <div className="sm:hidden p-4">
          <button
            onClick={toggleDrawer}
            className="text-2xl focus:outline-none"
          >
            {isDrawerOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Drawer for mobile */}
        <div
          className={`fixed inset-0 z-50 transition-transform transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } sm:hidden bg-[#E9ECEF] min-h-screen`}
        >
          <div className="p-6">
            <button
              onClick={toggleDrawer}
              className="text-2xl mb-4 focus:outline-none"
            >
              <FaTimes />
            </button>
            <Link to="/dashboard/work-sheet" onClick={toggleDrawer}>
              <p className="mb-4">Work Sheet</p>
            </Link>
            <Link to="/dashboard/payment-history" onClick={toggleDrawer}>
              <p className="mb-4">Payment History</p>
            </Link>
            <Link to="/dashboard/employee-list" onClick={toggleDrawer}>
              <p className="mb-4">Employee List</p>
            </Link>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>

      {/* <div className="flex">

        <div className="max-w-80 min-h-screen bg-[#E9ECEF]">
          <div className="p-6">
            <Link to="/dashboard/work-sheet">
              <p>Work Sheet</p>
            </Link>
            <Link to="/dashboard/payment-history">
              <p>Payment History</p>
            </Link>
            <Link to="/dashboard/employee-list">
              <p>Employee List</p>
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div> */}
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
