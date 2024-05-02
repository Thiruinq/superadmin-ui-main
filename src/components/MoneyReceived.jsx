import SideBar from "./SideBar";
import DashhboardCard from "./DashhboardCard";
import { useState } from "react";
import Datetime from "react-datetime";
import Loader from "./Loader";

const MoneyReceived = () => {
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDateChange = (date) => {
    setSelectedFromDate(date);
  };
  return (
    <div className="fixed-nav sticky-footer bg-dark" id="page-top">
      <SideBar />
      <div className="content-wrapper">
        <div className="dashboard">
          <div className="headerTop">{/* <span>Hi Amin </span> */}</div>
          <div className="contentwrapperInner">
            <h1>Money Received</h1>
            <div className="dashboardList">
              <div className="row">
                <DashhboardCard title={"TODAY BOOKING"} total={0} />
                <DashhboardCard title={"THIS WEEK BOOKINGS"} total={0} />
                <DashhboardCard title={"THIS MONTH BOOKINGS"} total={0} />
              </div>

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
                            <th style={{ width: "15%" }}> Date</th>
                            <th style={{ width: "15%" }}>Amount</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>15/02/24</td>
                            <td>$ 100</td>
                          </tr>

                          <tr>
                            <td>2</td>
                            <td>16/02/24</td>
                            <td>$ 200</td>
                          </tr>
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

export default MoneyReceived;
