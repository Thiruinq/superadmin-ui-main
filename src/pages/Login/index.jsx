import { useState } from "react";
import Logo from "../../assets/images/logo1.png";
import { useNavigate } from "react-router-dom";
import AxiosClient from "../../axios/AxiosClient";
import Loader from "../../components/Loader";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
    form: "",
  });
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    setErrors("");
    e.preventDefault();
    setError({
      username: "",
      password: "",
      form: "",
    });
    try {
      setLoading(true);
      await AxiosClient.get("/sanctum/csrf-cookie");
      const { username, password } = formData;
      const { data, status } = await AxiosClient.post(
        "api/auth/superadminlogin",
        {
          username,
          password,
        }
      );
      if (status === 200) {
        console.log("data ", data);
        localStorage.setItem("isAdminLogin", true);
        localStorage.setItem("ACCESS_TOKEN", data.access_token);
        navigate("/");
      }
      if (status !== 200) {
        setError({
          ...error,
          form: "OOPS! Check your username and password",
        });
        setErrors("OOPS! Check your username and password");
      }
    } catch (err) {
      console.error("catching error", err);
      setErrors("Internal server Error");
    } finally {
      setLoading(false); // Set loading state to false when API call completes
    }
  };

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="loginBg">
      <div className="row h-100">
        <div className="mx-auto my-auto col-12 col-md-4">
          <div className="login">
            <div className="login-wrapper">
              <div className="row">
                <div className="mx-auto col-12 col-md-7">
                  <div className="text-center mb-3">
                    <img src={Logo} alt="Logo" />
                  </div>
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label className="form-label">
                        Username<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder=""
                        required
                        value={formData.username}
                        onChange={handleInput}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">
                        Password<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder=""
                        required
                        value={formData.password}
                        onChange={handleInput}
                      />
                    </div>
                    {errors && <span className="text-danger">{errors}</span>}

                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-shadow"
                      >
                        {loading ? (
                          <div className="loader">
                            <Loader />
                          </div>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
