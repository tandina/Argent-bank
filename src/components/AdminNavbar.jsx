import { useNavigate } from "react-router-dom";
import LOGO from "../Assets/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../reducers/auth";

function AdminNavbar() {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.login.firstName);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(reset());
    navigate("/login");
  };
  const handleHome = () => {
    localStorage.removeItem("token");
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="main-nav">
        <div className="logoutBar">
        <img
          className="main-nav-logo-image"
          src={LOGO}
          alt="Argent Bank Logo"
          onClick={handleHome}
        />
        <h1 className="sr-only">Argent Bank</h1>
        </div>

      <div className="main-nav-item loggedStyle">
        <i className="fa fa-user-circle pad5"></i>
        <p className="pad5">{firstName}</p>
        <p className="LinkOut" onClick={handleLogout}>
          <i className="fa fa-sign-out pad5"></i> Sign Out
        </p>
      </div>
    </nav>
  );
}
export default AdminNavbar;
