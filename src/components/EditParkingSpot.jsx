import React, { createRef, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosClient from "../axios/AxiosClient";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import DatePicker from "react-datepicker";
import { getLatLong } from "../utils/GoogleApi";
import { formatDate } from "../utils/DateTime";
import Loader from "./Loader";

const EditParkingSpot = () => {
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState(null);
  const [apiValue, setApiValue] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Api value", apiValue);
    console.log("placeId api", apiValue?.value?.place_id);
    const getUtil = async () => {
      if (apiValue !== null) {
        const { lat, lng } = await getLatLong(apiValue?.value?.place_id);
        console.log("callback", lat, lng);
        setValue("google_map", apiValue?.label);
        if (lat && lng) {
          setValue("latitude", lat);
          setValue("longitude", lng);
        }
      }
    };
    getUtil();
  }, [apiValue]);

  useEffect(() => {
    if (state) {
      console.log("state", state);
      setData(state);
      setValue("latitude", state.latitude);
      setValue("longitude", state.longitude);
      setValue("slot_name", state.auth_owner.username);
      setValue("from_date_time", state.from_date_time);
      setValue("to_date_time", state.to_date_time);
      setValue("available_slots", state.available_slots);
      setValue("nearby_places", state.nearby_places);
      setValue("available_time", state.available_time);
      setValue("vehicle_fees", state.vehicle_fees);
      // setValue("created_at", state.created_at);
      setValue("status", state.status.toString());
      // Set the initial value for the GooglePlacesAutocomplete component
      setValue("google_map", state.google_map);

      setFromDate(new Date(state.from_date_time));
      setToDate(new Date(state.to_date_time));
    }
  }, [state, setValue]);

  useEffect(() => {
    console.log("Errors", errors);
  }, [errors]);

  const onSubmit = async (formData) => {
    console.log("Edit formdata", formData);
    // Handle form submission logic here
    try {
      setLoading(true);
      const response = await AxiosClient.put(
        `/api/parking-spots-edit/${data.id}`,
        formData
      );
      console.log("Updated parking spot:", response.data);
      if (response.status === 200) {
        setLoading(false);

        alert("Parking spot updated successfully!");
        navigate("/parking-spot");
      }
    } catch (error) {
      console.error("Error updating parking spot:", error);
      alert("Failed to update parking spot. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const CustomDatePickerInput = ({ value, onClick }) => {
    console.log("date ", value);
    return (
      <>
        <div className="input-group date picker-date" id="datepicker">
          <input
            disabled
            required
            type="text"
            className="form-control style-2 border-right"
            value={value}
            onClick={onClick}
            placeholder="Choose Date"
          />
          <span className="input-group-append" onClick={onClick}>
            <span className="input-group-text bg-white d-block">
              <i className="fa fa-calendar"></i>
            </span>
          </span>
        </div>
      </>
    );
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
                    <h3>Edit Parking Slots</h3>
                    <NavLink to="/parking-spot">Back</NavLink>
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
                                <input
                                  disabled
                                  type="text"
                                  id="name"
                                  name="name"
                                  className="form-control "
                                  {...register("slot_name", {
                                    required: true,
                                  })}
                                />
                                {errors?.slot_name && (
                                  <span className="text-danger">
                                    This field is required
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Address
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <input
                                  disabled
                                  type="text"
                                  id="name"
                                  name="name"
                                  className="form-control "
                                  defaultValue="Jhon"
                                  {...register("google_map", {
                                    required: true,
                                  })}
                                />
                                {/* <GooglePlacesAutocomplete
                                  apiKey={
                                    import.meta.env.VITE_APP_GOOGLE_API_KEY
                                  }
                                  selectProps={{
                                    // apiValue,
                                    value: apiValue,
                                    onChange: setApiValue,
                                  }}
                                  {...register("google_map", {
                                    required: true,
                                  })}
                                /> */}
                                {errors?.google_map && (
                                  <span className="text-danger">
                                    This field is required
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Available Time
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <input
                                  disabled
                                  type="text"
                                  id="designation"
                                  name="designation"
                                  className="form-control "
                                  defaultValue={data?.available_time}
                                  {...register("available_time", {
                                    required: true,
                                  })}
                                />
                                {errors?.available_time && (
                                  <span className="text-danger">
                                    This field is required
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Photos
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                {data?.photos &&
                                  data?.photos.map((item) => {
                                    return (
                                      <img
                                        style={{
                                          height: "100px",
                                          width: "120px",
                                        }}
                                        key={item.id}
                                        src={`http://localhost:8000/storage/${item.photo_path.slice(
                                          6
                                        )}`}
                                        alt={item.id}
                                      />
                                    );
                                  })}
                              </div>
                            </div> */}

                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Total Slots
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <input
                                  disabled
                                  type="text"
                                  id="email"
                                  name="email"
                                  className="form-control "
                                  defaultValue={data?.available_slots}
                                  {...register("available_slots", {
                                    required: true,
                                  })}
                                />
                                {errors?.available_slots && (
                                  <span className="text-danger">
                                    This field is required
                                  </span>
                                )}
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
                                          }/storage/${item.photo_path.slice(
                                            6
                                          )}`}
                                          alt={item.id}
                                        />
                                      );
                                    })}
                                </span>
                              </div>
                            </div>

                            {/* From Date */}
                            <div className="form-group row">
                              <label
                                htmlFor="from_date_time"
                                className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                              >
                                From Date
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <DatePicker
                                  disabled
                                  minDate={new Date()}
                                  selected={fromDate} // Pass the selected date here
                                  name="from_date_time"
                                  required
                                  customInput={<CustomDatePickerInput />}
                                  onChange={(date) => {
                                    setFromDate(date);
                                    setValue(
                                      "from_date_time",
                                      formatDate(date)
                                    );
                                  }}
                                  // {...register("from_date_time", {
                                  //   required: "From Date is required",
                                  // })}
                                  // {...register("from_date_time", {
                                  //   required: true,
                                  // })}
                                />
                                {errors?.from_date_time && (
                                  <span className="text-danger">
                                    This field is required
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="to_date_time"
                                className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                              >
                                To Date
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <DatePicker
                                  disabled
                                  minDate={new Date()}
                                  selected={toDate} // Pass the selected date here
                                  name="to_date_time"
                                  required
                                  customInput={<CustomDatePickerInput />}
                                  defaultValue={data?.to_date_time}
                                  onChange={(date) => {
                                    setToDate(date);
                                    setValue("to_date_time", formatDate(date));
                                  }}
                                  // {...register("to_date_time", {
                                  //   required: true,
                                  // })}
                                />
                                {errors?.to_date_time && (
                                  <span className="text-danger">
                                    This field is required
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* To Date */}

                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Amount(Per Hour)
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <input
                                  type="text"
                                  id="vehicle_fees"
                                  name="vehicle_fees"
                                  className="form-control"
                                  {...register("vehicle_fees", {
                                    required: true,
                                  })}
                                />
                                {errors.vehicle_fees && (
                                  <span className="text-danger">
                                    This field is required
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Status */}
                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Status
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    value="0"
                                    {...register("status", { required: true })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="active"
                                  >
                                    Active
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    value={1}
                                    {...register("status", { required: true })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="inactive"
                                  >
                                    Inactive
                                  </label>
                                </div>
                                {errors.status && (
                                  <span className="text-danger">
                                    Please select status
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-9 col-md-12 mx-auto">
                            <div className="form-group row">
                              <div className="col-md-12 offset-lg-3">
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-sm"
                                >
                                  {loading ? (
                                    <div className="loader">
                                      <Loader />
                                    </div>
                                  ) : (
                                    "Edit"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* <h3> Vehicle Types &amp; Fees</h3>
                  <div className="card mb-4 mt-2">
                    <div className="card-body corporateMenu">
                      <form name="addUser" id="addUser">
                        <div className="row">
                          <div className="col-lg-9 col-md-12 mx-auto mt-3">
                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Vehicle Types
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <select className="form-control">
                                  <option defaultValue="Hatchback">Hatchback</option>
                                  <option value="Sedan">Sedan</option>
                                  <option value="SUVs">SUVs</option>
                                </select>
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Parking Fees
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="row">
                                  <div className="col-xl-8 col-lg-8 col-md-6 col-sm-6 col-xs-12 perhourfields">
                                    <div>
                                      
                                      <label className="checkboxField">
                                        
                                        Per Hour
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="perhoursfees">
                                        
                                        $
                                        <input
                                          type="text"
                                          id="email"
                                          name="email"
                                          className="form-control "
                                          value=""
                                          placeholder=""
                                        />
                                      </span>
                                    </div>

                                    <div>
                                      
                                      <label className="checkboxField">
                                        
                                        4 Hours
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="perhoursfees">
                                        
                                        $
                                        <input
                                          type="text"
                                          id="email"
                                          name="email"
                                          className="form-control "
                                          value=""
                                          placeholder=""
                                        />
                                      </span>
                                    </div>

                                    <div>
                                      
                                      <label className="checkboxField">
                                        
                                        8 Hours
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="perhoursfees">
                                        
                                        $
                                        <input
                                          type="text"
                                          id="email"
                                          name="email"
                                          className="form-control "
                                          value=""
                                          placeholder=""
                                        />
                                      </span>
                                    </div>

                                    <div>
                                      
                                      <label className="checkboxField">
                                        
                                        12 Hours
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="perhoursfees">
                                        
                                        $
                                        <input
                                          type="text"
                                          id="email"
                                          name="email"
                                          className="form-control "
                                          value=""
                                          placeholder=""
                                        />
                                      </span>
                                    </div>

                                    <div>
                                      
                                      <label className="checkboxField">
                                        
                                        24 Hours
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="perhoursfees">
                                        
                                        $
                                        <input
                                          type="text"
                                          id="email"
                                          name="email"
                                          className="form-control "
                                          value=""
                                          placeholder=""
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"></label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <span
                                  className="label"
                                  style={{
                                    display: "block",
                                    textAlign: "right",
                                    fontWeight: "bold",
                                    textDecoration: "underline",
                                  }}
                                >
                                  + Add Vehicle
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditParkingSpot;
