import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom"; // Use useNavigate for programmatic navigation
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
import useEmployee from "../../hooks/useEmployee";
import useHR from "../../hooks/useHR";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const { data: userInfo = {} } = useQuery({
    queryKey: ["dashboard", user.email],
    queryFn: async () => {
      const response = await axiosPublic.get("/users", {
        params: { email: user?.email },
      });
      return response.data;
    },
  });

  // Employee, HR, and Admin role check
  const { isEmployee } = useEmployee();
  const { isHR } = useHR();
  const { isAdmin } = useAdmin();

  // Redirect to the first route based on the user's role when the page mounts
  useEffect(() => {
    if (userInfo?.role === "employee") {
      navigate("/dashboard/work-sheet"); // Redirect to the first employee route
    } else if (userInfo?.role === "HR") {
      navigate("/dashboard/employee-list"); // Redirect to the first HR route
    } else if (userInfo?.role === "admin") {
      navigate("/dashboard/all-employee-list"); // Redirect to the first admin route
    }
  }, [userInfo, navigate]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <Navbar />
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

          <div className="mt-8 pb-8">
            {/* Employee route */}
            {userInfo?.role === "employee" && (
              <>
                <NavLink
                  to="/dashboard/work-sheet"
                  className={({ isActive }) =>
                    `block py-1 mx-12 ${
                      isActive ? "bg-[#6F42C1] text-white" : "text-black"
                    } rounded-xl text-center font-medium`
                  }
                >
                  <p className="mb-4 flex items-center justify-center pt-3 gap-1">
                    <LuSheet />
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
                    <FaHistory />
                    Payment History
                  </p>
                </NavLink>
              </>
            )}

            {/* HR route */}
            {userInfo?.role === "HR" && (
              <>
                <NavLink
                  to="/dashboard/employee-list"
                  className={({ isActive }) =>
                    `block py-1 mx-12 ${
                      isActive ? "bg-[#6F42C1] text-white" : "text-black"
                    } rounded-xl text-center font-medium`
                  }
                >
                  <p className="mb-4 flex items-center justify-center pt-3 gap-1">
                    <MdPeopleAlt />
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
                    <BsGraphUpArrow />
                    Progress
                  </p>
                </NavLink>
              </>
            )}

            {/* Admin route */}
            {userInfo?.role === "admin" && (
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
                    <FaPeopleGroup />
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
                    <FaEnvelopeOpenText />
                    Messages
                  </p>
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Toggle button for mobile */}
        <div className="sm:hidden p-4">
          <button onClick={toggleDrawer} className="text-2xl focus:outline-none">
            {isDrawerOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Drawer for mobile */}
        <div
          className={`fixed inset-0 z-50 transition-transform transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } sm:hidden bg-[#E9ECEF] min-h-screen min-w-screen`}
        >
          <div className="p-6">
            <button onClick={toggleDrawer} className="text-2xl mb-4 focus:outline-none">
              <FaTimes />
            </button>

            {/* employee route */}
            {userInfo?.role === "employee" && (
              <>
                {" "}
                <NavLink
                  to="/dashboard/work-sheet"
                  onClick={toggleDrawer}
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
                  onClick={toggleDrawer}
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
              </>
            )}


            {/* HR route */}
            {userInfo?.role === "HR" && (
              <>
                <NavLink
                  to="/dashboard/employee-list"
                  onClick={toggleDrawer}
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
                  onClick={toggleDrawer}
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
              </>
            )}


            {/* admin route */}
            {userInfo?.role === "admin" && (
              <>
                <NavLink
                  to="/dashboard/all-employee-list"
                  onClick={toggleDrawer}
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
                  onClick={toggleDrawer}
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
            )}
            {/* Render links based on role (similar to desktop) */}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
