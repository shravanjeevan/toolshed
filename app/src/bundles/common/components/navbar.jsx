import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// For user authentication
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import SearchBar from './searchbar.jsx';
import logo from './logo.png';

class NavBar1 extends Component {
    state = {
        query: '',
    };

    changeHandler = (event) => {
        this.setState({
            query: event.target.value,
        });
    };

    render() {
        const { user, isAuthenticated, token } = this.props.auth; // Access user login data
        console.log(isAuthenticated);
        console.log(this.props.auth);

        let loginOrLogout;
        if (user && isAuthenticated) {
            loginOrLogout = (
                <div>
                    <button
                        class="btn btn-outline-danger mr-3 my-sm-0"
                        type="button"
                        onClick={() => this.props.logout}
                    >
                        Logout
                    </button>
                </div>
            );
        } else if (!isAuthenticated) {
            loginOrLogout = (
                <div>
                    <Link class="btn btn-primary mr-3 my-sm-0" to="/register">
                        Sign Up
                    </Link>
                    <Link class="btn btn-primary mr-2 my-sm-0" to="login">
                        Login
                    </Link>
                </div>
            );
        }

        let searchPath = `/search?query=${this.state.query}`;

        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between fixed-top">
                    <Link class="navbar-brand" to="/">
                        The Toolshed{' '}
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            alt="Toolshed Logo"
                        />
                    </Link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div
                        class="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <Link class="nav-link" to="/">
                                    Home <span class="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li class="nav-item active">
                                <Link class="nav-link" to="/categories">
                                    Categories
                                </Link>
                            </li>
                            <li class="nav-item active">
                                <Link class="nav-link" to="/categories/all">
                                    Tools
                                </Link>
                            </li>
                            <li class="nav-item active">
                                <Link class="nav-link" to="/blogs">
                                    Blogs
                                </Link>
                            </li>
                            <li class="nav-item active dropdown mr-2">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown2"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Top Posts
                                </a>
                                <div
                                    class="dropdown-menu"
                                    aria-labelledby="navbarDropdown2"
                                >
                                    <Link class="dropdown-item" to="/blogs">
                                        Browse Top Blogs
                                    </Link>
                                    <Link
                                        class="dropdown-item"
                                        to="/knowledge"
                                    >
                                        Browse Top Knowledge Items
                                    </Link>
                                </div>
                            </li>
                            <li class="nav-item active dropdown mr-2">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Create
                                </a>
                                <div
                                    class="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <Link
                                        class="dropdown-item"
                                        to="/posts/create"
                                    >
                                        Create Blog Post
                                    </Link>
                                    {user && isAuthenticated ? (
                                        <Link
                                            class="dropdown-item"
                                            to="/knowledge/create"
                                        >
                                            Create Knowledge Item
                                        </Link>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </li>
                            <li class="nav-item">
                                <form
                                    class="form-inline"
                                    onsubmit={() => {
                                        return <Redirect to={searchPath} />;
                                    }}
                                >
                                    <input
                                        class="form-control ml-sm-5 mr-sm-4"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        name="query"
                                        value={this.state.query}
                                        onChange={this.changeHandler}
                                    />
                                    <Link
                                        className="btn btn-primary my-2 my-sm-0"
                                        to={searchPath}
                                    >
                                        Search
                                    </Link>
                                </form>
                            </li>
                        </ul>
                        <div class="navbar-text ml-sm-4 mr-sm-4">
                            {user && isAuthenticated
                                ? `logged in as ${user.username}`
                                : ''}
                        </div>
                        <ul class="navbar-nav mr-auto">
                            {isAuthenticated ? (
                                <li class="nav-item active">
                                    <Link
                                        class="nav-link mr-4"
                                        to={`/users/${user.username}`}
                                    >
                                        Profile
                                    </Link>
                                </li>
                            ) : (
                                ''
                            )}
                            <li>{loginOrLogout}</li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar1);
