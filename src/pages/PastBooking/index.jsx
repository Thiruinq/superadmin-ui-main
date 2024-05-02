import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";
import AxiosClient from "../../axios/AxiosClient";
import Loader from "../../components/Loader";

import Datetime from "react-datetime";

const PastBooking = () => {
  const [bookingLists, setBookingLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedFromDate(date);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosClient.get("/api/bookings");
      console.log("response data", response.data);
      if (response.data) {
        setLoading(false);
        setBookingLists(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (data) => {
    navigate("/view-current-booking", { state: data });
  };

  const handleEdit = (data) => {
    navigate("/edit-current-booking", { state: data });
  };

  return (
    <div className="fixed-nav sticky-footer bg-dark" id="page-top">
      <SideBar />
      <div className="content-wrapper">
        <div className="dashboard">
          <div className="headerTop">{/* <span>Hi Amin </span> */}</div>
          <div className="contentwrapperInner">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="mr-auto ">Past Booking </h2>
            </div>

            <div className="dashboardList" style={{ marginTop: "50px" }}>
              <div className="row">
                <div className="col-lg-12 col-xs-12">
                  <div className="mb-4 card">
                    <div className="card-body searchBox">
                      <div className="row ">
                        <div className="form-group col-lg-3 col-md-4">
                          <label htmlFor="inputState">Slot</label>
                          <select id="" className="form-control">
                            <option value="Front Gate - 1">
                              Front Gate - 1
                            </option>
                            <option value="Front Gate - 2">
                              Front Gate - 2
                            </option>
                            <option value="Side Gate - 1">Side Gate - 1</option>
                          </select>
                        </div>
                        <div className="form-group col-lg-3 col-md-4">
                          <label htmlFor="inputName">
                            From date &amp; Time
                          </label>
                          <div className="form-group">
                            <Datetime
                              value={selectedFromDate}
                              onChange={handleDateChange}
                            />
                          </div>
                        </div>
                        <div className="form-group col-lg-3 col-md-4">
                          <label htmlFor="inputName">To date &amp; Time </label>
                          <div className="form-group">
                            <Datetime
                              value={selectedToDate}
                              onChange={handleDateChange}
                            />
                          </div>
                        </div>

                        <div className="form-group col-lg-3 col-md-4 searchBtn">
                          <button type="button" className="btn btn-primary">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-xs-12">
                  {loading ? (
                    <div className="loader row">
                      <div
                        className="col-lg-12 col-xs-12 "
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "500px",
                        }}
                      >
                        <Loader />
                      </div>
                    </div>
                  ) : (
                    <div className="tableListing table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>Sl no</th>
                            <th style={{ width: "15%" }}> Name</th>
                            <th style={{ width: "15%" }}>From Date & Time</th>
                            <th style={{ width: "10%" }}>To Date & Time</th>
                            <th style={{ width: "10%" }}>Vehicle Name</th>
                            <th style={{ width: "10%" }}>Vehicle Number</th>
                            <th>Slot</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {bookingLists.map((booking) => (
                            <tr key={booking.id}>
                              <td>{booking.id}</td>
                              <td>{booking.name}</td>
                              <td>{booking.from_datetime}</td>
                              <td>{booking.to_datetime}</td>

                              <td>{booking.vehicle_name}</td>
                              <td>{booking.vehicle_number}</td>

                              <td>{booking.slot}</td>

                              <td>
                                <i
                                  className="fa fa-eye"
                                  style={{
                                    marginRight: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleClick(booking)}
                                ></i>

                                <i
                                  style={{
                                    marginRight: "5px",
                                    cursor: "pointer",
                                  }}
                                  className="fa fa-pencil text-success "
                                  onClick={() => handleEdit(booking)}
                                ></i>
                                {/* <i
                                  className="fa fa-trash text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(parkingSpot.id)}
                                ></i> */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastBooking;
