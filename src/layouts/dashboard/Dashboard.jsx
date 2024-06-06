import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";

const Dashboard = () => {
  return (
    <div className="md:mx-20">
      <Navbar></Navbar>

      <div className="flex">

        <div className="max-w-80 min-h-screen bg-[#E9ECEF]">
          <div className="p-6">
            <Link to="/dashboard/work-sheet">
              <p>Work Sheet</p>
            </Link>
            <Link to="/dashboard/payment-history">
              <p>Payment History</p>
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
