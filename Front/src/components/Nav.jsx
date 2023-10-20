import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../context/AuthActions";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Topbar = () => {
  const { dispatch, user, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Link to="/" className="link">
          <Navbar.Brand className="text-white">ReactRestCountries</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="d-flex gap-4">
            {user && (
              <Link to={`/profile/${currentUser}`} className="link">
                <span className="navLink text-white">Profile</span>
              </Link>
            )}
            {user && (
              <span className="navLink text-white" onClick={handleLogout}>
                Logout
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
