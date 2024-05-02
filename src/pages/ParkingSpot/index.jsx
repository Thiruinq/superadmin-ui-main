import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { NavLink, useNavigate } from "react-router-dom";
import AxiosClient from "../../axios/AxiosClient";
import Loader from "../../components/Loader";
import { confirmAlert } from "react-confirm-alert";

const ParkingSpot = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosClient.get("/api/admin-parking-spots");
      console.log("response data", response.data);
      if (response.data) {
        setLoading(false);
        const sortedParkingSpots = response.data.sort((a, b) => b.id - a.id);
        setParkingSpots(sortedParkingSpots);
        // setParkingSpots(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (data) => {
    navigate("/view-parking-spot", { state: data });
  };

  const handleEdit = (data) => {
    navigate("/edit-parking-spot", { state: data });
  };

  const handleDelete = async (id) => {
    // Display confirmation dialog before deleting
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this parking spot?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              // Send a DELETE request to the server to delete the parking spot with the given ID
              await AxiosClient.delete(`/api/parking-spots/${id}`);
              // Remove the deleted parking spot from the local state
              setParkingSpots(
                parkingSpots.filter((parkingSpot) => parkingSpot.id !== id)
              );
              console.log("Parking spot deleted successfully");
            } catch (error) {
              console.error("Error deleting parking spot:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const TextTrimmer = ({ originalText, maxLength }) => {
    const [trimmedText, setTrimmedText] = useState("");

    useEffect(() => {
      const trimText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + "...";
        }
        return text;
      };

      const trimmed = trimText(originalText, maxLength || 100);
      setTrimmedText(trimmed);
    }, [originalText, maxLength]);

    return <span>{trimmedText}</span>;
  };
  return (
    <div className="fixed-nav sticky-footer bg-dark" id="page-top">
      <SideBar />
      <div className="content-wrapper">
        <div className="dashboard">
          <div className="headerTop">{/* <span>Hi Amin </span> */}</div>
          <div className="contentwrapperInner">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="mr-auto">Parking Slots</h2>
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
                            <th style={{ width: "15%" }}>Name</th>
                            <th style={{ width: "10%" }}>Address</th>
                            <th style={{ width: "15%" }}>Available Time</th>
                            <th style={{ width: "10%" }}>Total Slots</th>
                            <th style={{ width: "10%" }}>Photos</th>
                            <th>Amount(Per Hour)</th>
                            <th style={{ width: "20%" }}>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {parkingSpots.map((parkingSpot, index) => (
                            <tr key={parkingSpot.id}>
                              <td>{index + 1}</td>
                              <td>{parkingSpot.auth_owner.username}</td>
                              <td style={{ textWrap: "balance" }}>
                                {parkingSpot.google_map}
                              </td>
                              <td>{parkingSpot.available_time}</td>
                              <td>{parkingSpot.available_slots}</td>

                              <td>
                                <div style={{ display: "flex" }}>
                                  {parkingSpot.photos.map((photo) => (
                                    <div key={photo.id}>
                                      <img
                                        style={{
                                          height: "20px",
                                          width: "25px",
                                        }}
                                        src={`${
                                          import.meta.env.VITE_APP_BASE_URL
                                        }/storage/${photo.photo_path.slice(6)}`}
                                        alt="Parking Spot"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </td>
                              <td>${parkingSpot.vehicle_fees}</td>
                              <td>
                                {parkingSpot.status ? "Inactive" : "Active"}
                              </td>

                              <td>
                                <i
                                  className="fa fa-eye"
                                  style={{
                                    marginRight: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleClick(parkingSpot)}
                                ></i>

                                <i
                                  style={{
                                    marginRight: "5px",
                                    cursor: "pointer",
                                  }}
                                  className="fa fa-pencil text-success "
                                  onClick={() => handleEdit(parkingSpot)}
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

export default ParkingSpot;
