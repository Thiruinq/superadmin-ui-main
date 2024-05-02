import React from "react";
import SideBar from "../../components/SideBar";
import DashhboardCard from "../../components/DashhboardCard";

const Dashboard = () => {
  return (
    <div className="fixed-nav sticky-footer bg-dark" id="page-top">
      <SideBar />
      <div className="content-wrapper">
        <div className="dashboard">
          <div className="headerTop">{/* <span>Hi Amin </span> */}</div>
          <div className="contentwrapperInner">
            <h1>Welcome Admin</h1>
            <div className="dashboardList">
              <div className="row">
                {/* <DashhboardCard title={"TODAT BOOKING"} total={0} />
                <DashhboardCard title={"THIS WEEK BOOKINGS"} total={0} />
                <DashhboardCard title={"THIS MONTH BOOKINGS"} total={0} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
