import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import './login.css';

export default class Login extends Component {
    renderSignup(){
       return( 
        <form>
                <h2>Sign Up</h2>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Account Type</Form.Label>
                    <Form.Control as="select">
                        <option>Select Account Type </option>
                        <option>Student</option>
                        <option>Educational Staff</option>
                        <option>Vendor</option>
                    </Form.Control>
                </Form.Group>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/login">Login?</Link>
                </p>
            </form>
        )
    }
    
    renderLogin(){
        return(
            
            <form>
                <h2> Login </h2>
                <div className="form-group">
                    <label>Username</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        )
    }

    torender(){
        if(window.location.pathname == '/login'){
            return this.renderLogin();
        }
        if (window.location.pathname == '/signup'){
            return this.renderSignup();
        }
    }
    
    
    render() {
        return (
            <div className="page1">
                <Nav justify variant="tabs">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                    </Nav.Item>
                </Nav> 
                {this.torender()}
            </div>            
        );
    }
}