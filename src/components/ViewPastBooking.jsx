import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { NavLink, useLocation } from "react-router-dom";

const ViewPastBooking = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(state);
  }, [state]);
  return (
    <div className="fixed-nav sticky-footer bg-dark" id="page-top">
      <SideBar />
      <div className="content-wrapper">
        <div className="dashboard">
          <div className="headerTop">{/* <span>Hi Amin </span> */}</div>
          <div className="contentwrapperInner">
            <div className="dashboardList">
              <div className="row tabContentOuter">
                <div className="col-lg-12 col-md-12 mx-auto">
                  <div className="d-flex align-items-center justify-content-between">
                    <h3>View Bookings</h3>
                    <NavLink to="/past-booking">Back</NavLink>
                  </div>
                  <div className="card mb-4 mt-2">
                    <div className="card-body corporateMenu">
                      <div className="row">
                        <div className="col-lg-9 col-md-12 mx-auto mt-3">
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Name
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">{data?.user.name}</span>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Slot Address
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.parking_spots.google_map}
                              </span>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Slot Owner
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.parking_spots.auth_owner.username}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              From Date & Time
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.from_datetime}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              To Date & Time
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">{data?.to_datetime}</span>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Vehicle Name
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.vehicle_name}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Vehicle Number
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.vehicle_number}
                              </span>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Amount Paid
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">{data?.amount_paid}</span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Booked On
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">{data?.booked_on}</span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Total Hours
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">{data?.total_hours}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPastBooking;
