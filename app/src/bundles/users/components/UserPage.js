import React from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';

// For accessing user data
import backend from '../../apis/backend';
import { connect } from 'react-redux';

import PostResult from '../../common/components/PostResult';

class UserPage extends React.Component {
    state = {
        user: {
            id: null,
            display_name: null,
            email: null,
            username: null,
        },
        posts: [],
    };

    componentDidMount() {
        this.getUser();
        this.getUserPosts();
    }

    getUser = async () => {
        const {
            match: { params },
        } = this.props;
        try {
            let res = await backend.get(`/users/${params.slug}`);
            let { data } = res;
            this.setState({ user: data });
        } catch (e) {
            console.log(e);
            document.querySelector('#error').click();
        }
    };

    getUserPosts = async () => {
        const {
            match: { params },
        } = this.props;
        try {
            let res = await backend.get(`/posts/users/${params.slug}`);
            let { data } = res;
            this.setState({ posts: data });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        const { user } = this.state;

        let postsToShow;
        if (!this.state.posts) {
            postsToShow = (
                <div className="alert alert-light">Fetching results...</div>
            );
        } else if (this.state.posts.length > 0) {
            postsToShow = this.state.posts.map((post) => {
                return (
                    <div className="my-4">
                        <PostResult post={post} />
                    </div>
                );
            });
        } else {
            postsToShow = (
                <div className="alert alert-light">
                    User has not posted anything yet.
                </div>
            );
        }

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
                                <h5>{this.state.user.username}</h5>
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
                                            <p>{this.state.user.username}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Full Name</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>
                                                {this.state.user.display_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{this.state.user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <h2>Popular Posts</h2>
                        <div className="mt-4">{postsToShow}</div>
                    </div>
                </form>
                <Link id="error" to="/404" replace />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(UserPage);
