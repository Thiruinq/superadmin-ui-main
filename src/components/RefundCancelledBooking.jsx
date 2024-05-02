import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosClient from "../axios/AxiosClient";
import Loader from "./Loader";

const RefundCancelledBooking = () => {
  const { state } = useLocation();
  console.log("view cancelled booking", state);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(state);
    // Set default values for refund amount and comments
    if (state) {
      setValue("refund_status", "Refunded");
      setValue("refund_amount", state.refund_amount);
      setValue("comments", state.comments);
    }
  }, [state, setValue]);

  const onSubmit = async (formData) => {
    console.log("Edit formdata", formData);
    // Handle form submission logic here
    try {
      setLoading(true);
      const response = await AxiosClient.put(
        `/api/refund-cancel-booking/${data.id}`,
        formData
      );
      console.log("Updated cancelled booking:", response.data);
      if (response.status === 200) {
        setLoading(false);
        await handleRefund(formData);

        navigate("/cancelled-booking");
      }
    } catch (error) {
      console.error("Error updating Cancelled booking:", error);
      alert("Failed to update Cancelled booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async (formData) => {
    console.log("handleRefund", state);
    setLoading(true);

    try {
      const response = await AxiosClient.post("/api/payment-refund", {
        booking_id: data.booking.id,
        refund_amount: formData.refund_amount,
        reason_for_refund: formData.comments,
      });
      if (response.data) {
        setLoading(false);
        alert("Amount Refunded successfully!");
        console.log("refund amount response", response.data);
      }
    } catch (error) {
      setLoading(false);

      console.error("Error Cancel booking:", error);
    }
  };

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
                    <h3>Refund Cancelled Booking</h3>
                    <NavLink to="/cancelled-booking">Back</NavLink>
                  </div>
                  <div className="card mb-4 mt-2">
                    <div className="card-body corporateMenu">
                      <form onSubmit={handleSubmit(onSubmit)}>
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
                                <input
                                  className="form-control"
                                  defaultValue={data?.refund_amount}
                                  {...register("refund_amount", {
                                    required: true,
                                  })}
                                />
                                {errors?.refund_amount && (
                                  <span className="text-danger">
                                    This field is required
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Comments
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <textarea
                                  className="form-control"
                                  defaultValue={data?.comments}
                                  {...register("comments", {
                                    required: true,
                                  })}
                                ></textarea>
                                {errors?.comments && (
                                  <span className="text-danger">
                                    This field is required
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="form-group row">
                              <div className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"></div>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-sm"
                                >
                                  {loading ? (
                                    <div className="loader">
                                      <Loader />
                                    </div>
                                  ) : (
                                    " Refund Now"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
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

export default RefundCancelledBooking;
