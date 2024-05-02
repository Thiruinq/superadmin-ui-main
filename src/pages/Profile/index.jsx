import SideBar from "../../components/SideBar";
import { useForm } from "react-hook-form";

const Profile = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = () => {};
  return (
    <div className="fixed-nav sticky-footer bg-dark" id="page-top">
      <SideBar />
      <div className="content-wrapper">
        <div className="dashboard">
          <div className="headerTop">{/* <span>Hi Amin </span> */}</div>
          <div className="contentwrapperInner">
            <div className="d-flex align-items-center justify-content-between">
              <h2>Profile</h2>
            </div>
            <div className="dashboardList">
              <div className="row">
                <div className="col-lg-12 col-xs-12">
                  <div className="card mb-4 mt-2">
                    <div className="card-body corporateMenu">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="form-group row">
                          <label
                            htmlFor="name"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Name
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              disabled
                              {...register("name", { required: true })}
                              className="form-control"
                            />
                            {errors?.name && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div className="form-group row">
                          <label
                            htmlFor="email"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Email
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="email"
                              id="email"
                              disabled
                              name="email"
                              {...register("email", {
                                required: true,
                              })}
                              className="form-control"
                            />
                            {errors?.email && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Mobile */}
                        <div className="form-group row">
                          <label
                            htmlFor="mobile"
                            className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          >
                            Mobile
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                              type="text"
                              id="mobile"
                              disabled
                              name="mobile"
                              {...register("mobile", {
                                required: true,
                              })}
                              className="form-control"
                            />
                            {errors?.mobile && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-group row">
                          <div className="col-md-12 offset-lg-3">
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm"
                            >
                              Change Password
                            </button>
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

export default Profile;
