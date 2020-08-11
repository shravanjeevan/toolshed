import React from 'react';
import './UserPage.css';

class UserPage extends React.Component {
    render() {
        console.log(this.props.params);
        return (
            <div class="container emp-profile">
                <form method="post">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img">
                                <img
                                    src="https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="profile-head">
                                <h5>John Doe</h5>
                                <h6>User</h6>
                                <ul
                                    class="nav nav-tabs"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li class="nav-item">
                                        <a
                                            class="nav-link active"
                                            id="home-tab"
                                            data-toggle="tab"
                                            href="#home"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="true"
                                        >
                                            About
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <input
                                type="button"
                                class="profile-edit-btn"
                                name="btnAddMore"
                                value="Edit Profile"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-8">
                            <div
                                class="tab-content profile-tab"
                                id="myTabContent"
                            >
                                <div
                                    class="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                >
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>User Name</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>JaneDoe4Evr</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Full Name</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>John Doe</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>johndoe@example.com</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Student</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserPage;
