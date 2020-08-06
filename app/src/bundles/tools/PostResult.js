import React from 'react';
import { Route, Link } from 'react-router-dom';

import './PostResult.css';

class PostResult extends React.Component {
    render() {
        let { post } = this.props;

        // List of tags
        let tagsToShow = post.Categories.map((tag) => {
            return (
                <a href="#" className="mr-2 badge badge-secondary">
                    {tag}
                </a>
            );
        });

        let blogPostItemsToShow = (
            <div>
                <span>{post.developer}</span>
            </div>
        );

        return (
            <div className="card rounded">
                <div className="card-body">
                    <h5 className="card-title">
                        <div className="row">
                            <Link
                                to="/post"
                                className="title-text col-sm-8 text-decoration-none"
                            >
                                {post.name}
                            </Link>
                            <div className="col-sm-4 text-right font-weight-light">
                            <img
                                src={post.icon}
                                width="60"
                                height="60"
                                className="d-inline-block align-top"
                                alt={post.name}
                                />
                            </div>
                        </div>
                    </h5>
                    <h6 class="card-subtitle mb-3">
                        <div className="text-muted">{tagsToShow}</div>
                    </h6>
                    <h6 class="card-subtitle font-weight-light">
                        {blogPostItemsToShow}
                    </h6>
                    <hr />
                    <p className="card-text">
                        <Link to="/post" className="text-decoration-none">
                            <div>{post.description}</div>
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default PostResult;
