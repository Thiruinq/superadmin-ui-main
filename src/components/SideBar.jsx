import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="leftSidebarOuter">
      <a className="logo desktoplogo" href="/">
        <img src={Logo} alt="Sip Radius" />
      </a>
      <nav className="navbar navbar-expand-lg navbar-dark sidebar" id="sidebar">
        <a className="logo mobilelogo" href="/">
          <img src={Logo} alt="Sip Radius" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="leftSidebar">
            <ul className="nav flex-column list-unstyled ps-0">
              <SidebarItem
                icon="fa fa-th-large"
                text="Dashboard"
                to="/"
                isActive={location.pathname === "/"}
              />
              <SidebarItemWithSubmenu
                icon="fa fa-car"
                text="Bookings"
                submenuItems={[
                  { text: "Open Bookings", to: "/current-upcoming" },
                  { text: "Cancelled Bookings", to: "/cancelled-booking" },
                  { text: "Past Bookings", to: "/past-booking" },
                ]}
                isActive={
                  location.pathname === "/current-upcoming" ||
                  location.pathname === "/cancelled-booking" ||
                  location.pathname === "/past-booking"
                }
              />
              <SidebarItem
                icon="fa fa-money"
                text="Parking Slots"
                to="/parking-spot"
                isActive={location.pathname === "/parking-spot"}
              />
              <SidebarItem
                icon="fa fa-sign-out"
                text="Logout"
                onClick={handleLogout}
              />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, to, onClick, isActive }) => (
  <li className={`nav-item${isActive ? " active" : ""}`}>
    <NavLink to={to} className="nav-link text-white" onClick={onClick}>
      <i className={icon}></i> {text}
    </NavLink>
  </li>
);

const SidebarItemWithSubmenu = ({ icon, text, submenuItems, isActive }) => (
  <li className={`nav-item${isActive ? " active" : ""}`}>
    <a
      className="nav-link btn-toggle collapsed"
      data-bs-toggle="collapse"
      data-bs-target={`#${text.replace(/\s+/g, "-").toLowerCase()}-collapse`}
      aria-expanded="false"
    >
      <i className={icon}></i> {text}
    </a>
    <div
      className={`collapse${isActive ? " show" : ""}`}
      id={`${text.replace(/\s+/g, "-").toLowerCase()}-collapse`}
    >
      <ul className="btn-toggle-nav list-unstyled pb-1 small">
        {submenuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={`nav-link${
                location.pathname === item.to ? " active" : ""
              }`}
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </li>
);

export default Sidebar;
