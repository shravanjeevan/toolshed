import React from 'react';
import logo from './logo.png';
import './App.css';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button, Container} from 'react-bootstrap'

function App() {
  return (
    <div>
      <Navbar className="topnav">
          <Nav className="mr-auto" activeKey="/home">
          <Navbar.Brand href="/home">
            <img
              src={logo}
              width="45"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>    
            <Navbar.Brand  href="/home">The ToolShed</Navbar.Brand>
            <NavDropdown title="Knowledge Base" id="nav-dropdown">
              <NavDropdown.Item href="/knowledge/tools">Tools</NavDropdown.Item>
              <NavDropdown.Item href="/knowledge/categories">Categories</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
          </Nav>
          <Nav className="justify-content-center" activeKey="/home">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="topnav input" />
            </Form>
          </Nav>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Link href="/login">Sign Up/Login</Nav.Link>
          </Nav>
      </Navbar>
      {/* <header className="App-header">
          <img src={logo} alt="logo" />
          <h1>
            The Toolshed
          </h1>
        </header> */}
    </div>
  );
}

export default App;
