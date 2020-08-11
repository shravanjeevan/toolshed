import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'

// For user authentication
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import SearchBar from "./searchbar.jsx"
import logo from './logo.png';

class NavBar1 extends Component {
  render() {
    const { user, isAuthenticated, token } = this.props.auth;    // Access user login data
    console.log(isAuthenticated);
    console.log(this.props.auth);

    let loginOrLogout;
    if (user && isAuthenticated) {
      loginOrLogout = (
        <Nav className="justify-content-end" activeKey="/home">
           <Nav.Link bsPrefix="topnav a" onClick={() => this.props.logout}>Logout</Nav.Link>
        </Nav>
      );
    } else if (!isAuthenticated) {
      loginOrLogout = (
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Link bsPrefix="topnav a" as={Link} to="/register">Sign Up</Nav.Link>
          <Nav.Link bsPrefix="topnav a" as={Link} to="/login">Login</Nav.Link>  
        </Nav>
      );
    }

    return (
      <React.Fragment>
       <Navbar className="topnav">
          <Nav className="mr-auto" activeKey="/home">
            <Link to="/">
            
              <Navbar.Brand bsPrefix="topnav a">
                  <img
                  src={logo}
                  width="45"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                  />
              </Navbar.Brand>
            </Link>
    <Navbar.Brand bsPrefix="topnav a" as={Link} to="/">The ToolShed {user ? `(logged in as ${user.email}: ${user.first_name} ${user.last_name})` : ''}</Navbar.Brand>
            <NavDropdown bsPrefix="topnav a" title="Explore" id="nav-dropdown">
                <NavDropdown.Item className="topnav a" as={Link} to="/categories/all">Tools</NavDropdown.Item>
                <NavDropdown.Item className="topnav a" as={Link} to="/categories">Categories</NavDropdown.Item>
                <NavDropdown.Item className="topnav a" as={Link} to="/blogs">Blogs</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="justify-content-center" activeKey="/home">
            <SearchBar />
          </Nav>
          {loginOrLogout}
      </Navbar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
 
export default connect(
  mapStateToProps,
  { logout }
)(NavBar1);
