import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-primary">
      <div className="collapse navbar-collapse m-2 ">
        My Link |
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item p-2">
            <Link to="UserProfile">UserProfile</Link>
          </li>
          <li className="nav-item active p-2">
            <Link to="Login">Login</Link>
          </li>
          <li className="nav-item p-2">
            <Link to="Movie">Search Select</Link>
          </li>
          <li className="nav-item p-2">
            <Link to="Student">Student</Link>
          </li>
          <li className="nav-item p-2">
            <Link to="Select">Thêm</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
