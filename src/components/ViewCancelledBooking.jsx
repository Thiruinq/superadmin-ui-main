import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { NavLink, useLocation } from "react-router-dom";

const ViewCancelledBooking = () => {
  const { state } = useLocation();
  console.log("view cancelled booking", state);
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
                    <h3>Cancelled Booking</h3>
                    <NavLink to="/cancelled-booking">Back</NavLink>
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
                                {data?.booking.user.name}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Slot Address
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.booking.parking_spots.google_map}
                              </span>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Vehicle Number
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.booking.vehicle_number}
                              </span>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Amount Paid
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.booking.amount_paid}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Cancelled By
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.cancelled_by}
                              </span>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Cancelled on
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.cancelled_date}
                              </span>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Reason for cancelled
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <span className="label">
                                {data?.reason_for_cancellation}
                              </span>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Refund Amount
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              {data?.refund_amount ? data.refund_amount : ""}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Refund on
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              {data?.refund_on ? data.refund_on : ""}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Reason for Refund
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              {data?.reason_for_refund
                                ? data.reason_for_refund
                                : ""}
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

export default ViewCancelledBooking;
