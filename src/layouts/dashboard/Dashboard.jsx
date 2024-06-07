import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { FaBars, FaTimes } from "react-icons/fa";

const Dashboard = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="md:mx-20">
      <Navbar></Navbar>
      <div className="flex min-h-screen">
            {/* Sidebar for large screens */}
            <div className="hidden sm:block sm:w-64 bg-[#E9ECEF] min-h-screen">
                <div className="p-6">
                    <Link to="/dashboard/work-sheet">
                        <p className="mb-4">Work Sheet</p>
                    </Link>
                    <Link to="/dashboard/payment-history">
                        <p className="mb-4">Payment History</p>
                    </Link>
                    <Link to="/dashboard/employee-list">
                        <p className="mb-4">Employee List</p>
                    </Link>
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
                    isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:hidden bg-[#E9ECEF] min-h-screen`}>
                <div className="p-6">
                    <button onClick={toggleDrawer} className="text-2xl mb-4 focus:outline-none">
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
