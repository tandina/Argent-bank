import LOGO from "../Assets/argentBankLogo.png"
import { Link } from 'react-router-dom';


function Header() {
    return (
        <nav className="main-nav">
        <a className="main-nav-logo" href="./">
          <img
            className="main-nav-logo-image"
            src={LOGO}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            <Link to="/login">Sign In</Link>
        </div>
      </nav>
    )
}
export default Header;