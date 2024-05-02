import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";
import AxiosClient from "../../axios/AxiosClient";
import Loader from "../../components/Loader";
import { separateDateAndTime } from "../../utils/DateTime";

const CancelledBooking = () => {
  const [bookingLists, setBookingLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosClient.get("/api/list-cancel-booking");
      console.log("response data cancelled", response.data);
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
    navigate("/view-cancelled-booking", { state: data });
  };
  const handleRefund = (data) => {
    navigate("/refund-cancelled-booking", { state: data });
  };

  return (
    <div className="fixed-nav sticky-footer bg-dark" id="page-top">
      <SideBar />
      <div className="content-wrapper">
        <div className="dashboard">
          <div className="headerTop">{/* <span>Hi Amin </span> */}</div>
          <div className="contentwrapperInner">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="mr-auto">Cancelled Booking</h2>
            </div>

            <div className="dashboardList">
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
                            <th style={{ width: "15%" }}>Slot Address</th>
                            {/* <th style={{ width: "15%" }}>Slot Owner</th> */}
                            <th style={{ width: "10%" }}>Cancelled Date</th>
                            <th style={{ width: "10%" }}>Vehicle Number</th>
                            <th style={{ width: "10%" }}>Amount Paid</th>
                            <th style={{ width: "10%" }}>Cancelled by</th>
                            <th style={{ width: "10%" }}>Refund status</th>

                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {bookingLists.map((booking, index) => (
                            <tr key={booking.id}>
                              <td>{index + 1}</td>
                              <td>{booking.booking.user.name}</td>
                              <td style={{ textWrap: "balance" }}>
                                {booking.booking.parking_spots.google_map}
                              </td>

                              <td>
                                {
                                  separateDateAndTime(booking.cancelled_date)
                                    .date
                                }
                              </td>

                              <td>{booking.booking.vehicle_number}</td>
                              <td>{booking.booking.amount_paid}</td>

                              <td>{booking.cancelled_by}</td>
                              <td>{booking.refund_status}</td>

                              <td>
                                <i
                                  className="fa fa-eye"
                                  style={{
                                    marginRight: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleClick(booking)}
                                ></i>
                                {booking.refund_status !== "COMPLETED" ? (
                                  <a
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleRefund(booking)}
                                  >
                                    Refund
                                  </a>
                                ) : (
                                  ""
                                )}
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

export default CancelledBooking;
