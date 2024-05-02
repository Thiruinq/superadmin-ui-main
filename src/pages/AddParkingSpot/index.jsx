import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosClient from "../../axios/AxiosClient";
import DatePicker from "react-datepicker";
import { formatDate } from "../../utils/DateTime";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Loader from "../../components/Loader";
import { getLatLong } from "../../utils/GoogleApi";

const AddParkingSpot = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [apiValue, setApiValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(null);
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
    console.log("errors", errors);
  }, [errors]);

  const onSubmit = async (data) => {
    setBackendError(null);
    setLoading(true);

    // Check if the google_map field is empty
    if (!apiValue) {
      setBackendError("Google Map field is required");
      return; // Stop form submission
    }

    console.log("submttted data", data);
    try {
      const formData = new FormData();
      // Append form data
      formData.append("slot_name", data.slot_name);
      formData.append("available_time", data.available_time);
      formData.append("google_map", data.google_map);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      formData.append("available_slots", data.available_slots);
      formData.append("from_date_time", formatDate(data.from_date_time));
      formData.append("to_date_time", formatDate(data.to_date_time));
      formData.append("nearby_places", data.nearby_places);
      formData.append("vehicle_types", data.vehicle_types);
      formData.append("vehicle_fees", data.vehicle_fees);
      // Append image files
      for (let i = 0; i < data.photos.length; i++) {
        formData.append("photos[]", data.photos[i]);
      }

      const response = await AxiosClient.post("/api/parking-spots", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // if (!response.ok) {
      //   throw new Error("Error occurred while submitting the form");
      // }

      // const responseData = await response.json();
      console.log("Add parking Spot ", response);

      if (response.status === 200 || response.status === 201) {
        alert("Parking spot added successfully!");
        setLoading(false);
        navigate("/parking-spot");
      }
      if (response.status !== 200 && response.status !== 201) {
        console.log("backend error", response.data, response);
        setBackendError("Internal server error");
      }
    } catch (error) {
      console.error("Error:", error);
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
            required
            type="text"
            className="form-control style-2 border-right"
            value={value || ""}
            onClick={onClick}
            placeholder="Choose Date & Time"
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
            <div className="d-flex align-items-center justify-content-between">
              <h2>Add Parking Spot</h2>
              <NavLink to="/parking-spot">Back</NavLink>
            </div>
            <div className="dashboardList">
              <div className="row">
                <div className="col-lg-12 col-xs-12">
                  <div className="card mb-4 mt-2">
                    <div className="card-body corporateMenu">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Slot Name */}
                        <div className="form-group row">
                          <label
                            htmlFor="slot_name"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Slot Name
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="text"
                              id="slot_name"
                              name="slot_name"
                              {...register("slot_name", { required: true })}
                              className="form-control"
                            />
                            {errors?.slot_name && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Available Time */}
                        <div className="form-group row">
                          <label
                            htmlFor="available_time"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Available Time
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <select
                              id="available_time"
                              name="available_time"
                              {...register("available_time", {
                                required: true,
                              })}
                              className="form-control"
                            >
                              <option value="24/7">24/7</option>
                            </select>
                            {errors?.available_time && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Photos */}
                        <div className="form-group row">
                          <label
                            htmlFor="photos"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Photos
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="file"
                              id="photos"
                              multiple
                              name="photos"
                              {...register("photos", { required: true })}
                              className="form-control"
                            />
                            {errors?.photos && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Google Map */}
                        <div className="form-group row">
                          <label
                            htmlFor="google_map"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Google Map
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            {/* <input
                              type="text"
                              id="google_map"
                              name="google_map"
                              onChange={handleGoogleApi}
                              // {...register("google_map", { required: true })}
                              className="form-control"
                            /> */}
                            <GooglePlacesAutocomplete
                              apiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}
                              selectProps={{
                                apiValue,
                                onChange: setApiValue,
                              }}
                              {...register("google_map", { required: true })}
                            />

                            {errors?.google_map && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Latitude */}
                        <div className="form-group row">
                          <label
                            htmlFor="latitude"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Latitude
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="text"
                              id="latitude"
                              disabled
                              name="latitude"
                              {...register("latitude", {
                                required: true,
                              })}
                              className="form-control"
                            />
                            {errors?.latitude && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Longitude */}
                        <div className="form-group row">
                          <label
                            htmlFor="longitude"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Longitude
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="text"
                              id="longitude"
                              disabled
                              name="longitude"
                              {...register("longitude", {
                                required: true,
                              })}
                              className="form-control"
                            />
                            {errors?.longitude && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Available Slots */}
                        <div className="form-group row">
                          <label
                            htmlFor="available_slots"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Available Slots
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="text"
                              id="available_slots"
                              name="available_slots"
                              {...register("available_slots", {
                                required: "Invalid numeric format",
                                validate: (value) =>
                                  !isNaN(value) || "Invalid numeric format",
                              })}
                              className="form-control"
                            />
                            {errors?.available_slots && (
                              <span className="text-danger">
                                Invalid numeric format
                              </span>
                            )}
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
                              minDate={new Date()}
                              selected={fromDate} // Pass the selected date here
                              name="from_date_time"
                              required
                              customInput={<CustomDatePickerInput />}
                              onChange={(date) => {
                                setFromDate(date);
                                // setError("from_date_time", { required: true });
                                // Handle date change and set the value using setValue
                                setValue("from_date_time", date);
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

                        {/* To Date */}
                        <div className="form-group row">
                          <label
                            htmlFor="to_date_time"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            To Date
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <DatePicker
                              minDate={new Date()}
                              selected={toDate} // Pass the selected date here
                              name="to_date_time"
                              required
                              customInput={<CustomDatePickerInput />}
                              onChange={(date) => {
                                setToDate(date);
                                // setError("to_date_time", {
                                //   types: {
                                //     required: true,
                                //   },
                                // });

                                // Handle date change and set the value using setValue
                                setValue("to_date_time", date);
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

                        {/* Nearby Places */}
                        <div className="form-group row">
                          <label
                            htmlFor="nearby_places"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Nearby Places
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="text"
                              id="nearby_places"
                              name="nearby_places"
                              {...register("nearby_places", { required: true })}
                              className="form-control"
                            />
                            {errors?.nearby_places && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* <div className="form-group row">
                          <label
                            htmlFor="vehicle_types"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Vehicle Types
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="text"
                              id="vehicle_types"
                              name="vehicle_types"
                              {...register("vehicle_types", { required: true })}
                              className="form-control"
                            />
                            {errors?.vehicle_types && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                       
                        <div className="form-group row">
                          <label
                            htmlFor="vehicle_fees"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Vehicle Fees
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="text"
                              id="vehicle_fees"
                              name="vehicle_fees"
                              {...register("vehicle_fees", { required: true })}
                              className="form-control"
                            />
                            {errors?.vehicle_fees && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div> */}

                        {/* Submit Button */}
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
                                "Add"
                              )}
                            </button>
                          </div>
                        </div>

                        {backendError && (
                          <span className="text-danger">
                            Internal server error
                          </span>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data table */}
        </div>
      </div>
    </div>
  );
};

export default AddParkingSpot;
