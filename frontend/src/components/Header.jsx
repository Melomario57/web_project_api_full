import HeaderLogo from "../images/logo.svg";
import CurrentUser from "../contexts/CurrentUserContext";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ handleLogout, email }) {
  const currentUser = React.useContext(CurrentUser);
  const location = useLocation();

  React.useEffect(() => {
    console.log("useLocation", location.pathname);
  }, [location]);
  return (
    <header className="header">
      <img
        className="header__logo"
        src={HeaderLogo}
        alt="Logo alrededor de usa"
      />
      <div className="header__user">
        <p className="header__user-email"> {currentUser ? email : ""}</p>
        {!location.pathname == "/login" && (
          <Link to="/register">Registrarse</Link>
        )}
        {!location.pathname == "/register" && (
          <Link to="/register">Iniciar sesión</Link>
        )}
        {currentUser && (
          <a className="header__user-close" onClick={handleLogout}>
            Cerrar sesión
          </a>
        )}
      </div>
      <hr id="line" />
    </header>
  );
}
