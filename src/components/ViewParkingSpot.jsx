import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { NavLink, useLocation } from "react-router-dom";
import { convertDateFormat, formatDate, getDateOnly } from "../utils/DateTime";

const ViewParkingSpot = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(state);
  }, [state]);

  const originalDate = data?.from_date_time;
  const formattedDate = convertDateFormat(originalDate);
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
                    <h3>View Parking Slots</h3>
                    <NavLink to="/parking-spot">Back</NavLink>
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
                              <span className="label">
                                {data?.auth_owner.username}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Address
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">{data?.google_map}</span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Available Time
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.available_time}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Total Slots
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.available_slots}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Photos
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.photos &&
                                  data?.photos.map((item) => {
                                    return (
                                      <img
                                        style={{
                                          height: "100px",
                                          width: "120px",
                                        }}
                                        key={item.id}
                                        src={`${
                                          import.meta.env.VITE_APP_BASE_URL
                                        }/storage/${item.photo_path.slice(6)}`}
                                        alt={item.id}
                                      />
                                    );
                                  })}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              From Date
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {getDateOnly(data?.from_date_time)}
                              </span>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              To Date
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {getDateOnly(data?.to_date_time)}
                              </span>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Amount(Per Hour)
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                ${data?.vehicle_fees}
                              </span>
                            </div>
                          </div>

                          {/* <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Started From
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                 {data?.formatDate()} 
                                {formattedDate}
                              </span>
                            </div>
                          </div> */}

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Status
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.status === 0 ? "Active" : "Inactive"}
                              </span>
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

export default ViewParkingSpot;
