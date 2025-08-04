import { Container, Button, Dropdown } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; 
import "./Header.css";
import { useAuth } from "../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const { currentUser, logout } = useAuth();
  
  return (
    <>
      <header className="bookmyshow-header">
        <Container className="d-flex align-items-center justify-content-between gap-3">
          <Link to="/">
            <img src={logo} alt="BookMyShow" className="logo" />
          </Link>

          <div className="search-box d-flex align-items-center flex-grow-1 mx-3">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for Movies and Events"
              className="search-input"
            />
          </div>

          <div className="d-flex align-items-center gap-3">
            <span>Surat ▾</span>
            
            {currentUser ? (
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic" className="user-dropdown">
                  <FaUserCircle className="user-icon" />
                  {currentUser.displayName || currentUser.email.split('@')[0]}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/add-movie">Add Movie</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" className="menu-link">Login / Sign Up</Link>
            )}
          </div>
        </Container>
      </header>

      <div className="bottom-nav">
  <Container className="d-flex justify-content-between">
    <ul className="nav-left d-flex gap-4">
      <li>Movies</li>
      <li>Stream</li>
      <li>Plays</li>
      <li>Activities</li>
      <li>Events</li>
      <li>Sports</li>
    </ul>
    <ul className="nav-right d-flex gap-4">
      <li>Offers</li>
      <li>Gift Cards</li>
    </ul>
  </Container>
</div>
    </>
  );
}

export default Header;
