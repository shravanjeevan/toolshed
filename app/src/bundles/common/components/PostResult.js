import React from 'react';
import { Link } from 'react-router-dom';

import './PostResult.css';

class PostResult extends React.Component {
    render() {
        let { post } = this.props;

        // List of tags
        let tagsToShow = post.tags.map((tag) => {
            let path = `/search?tag=${tag}`;
            return (
                <Link to={path} className="mr-2 badge badge-secondary">
                    {tag}
                </Link>
            );
        });

        let linkToPost = `/posts/${post.id}`;

        // Conditionally display blog post elements
        // Knowledge Base Items defaults to only the date - this is the Knowledge Base subtitle
        let blogPostItemsToShow = (
            <div>
                <span>{post.createdOn}</span>
            </div>
        );

        // Blog Post Items includes other data points
        if (post) {
            blogPostItemsToShow = (
                <div className="row">
                    <div className="col-sm text-muted">
                        <span>{post.createdOn}</span>
                        <span>
                            {' '}
                            by{' '}
                            <Link
                                to="/user/:id"
                                className="text-primary font-weight-normal"
                            >
                                {post.createdByDisplayName}
                            </Link>
                        </span>
                    </div>
                    <div className="col-sm text-right text-muted">
                        <span className="">👍 {post.likeCount} likes</span>
                        <span className="ml-3">
                            💬 X comments
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <div className="card rounded">
                <div className="card-body">
                    <h5 className="card-title">
                        <div className="row">
                            <Link
                                to={linkToPost}
                                className="title-text col-sm-8 text-decoration-none"
                            >
                                {post.title}
                            </Link>
                            <div className="col-sm-4 text-right font-weight-light">
                                { post
                                    ? 'Blog Post'
                                    : 'Knowledge Base'}
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
                        <Link to={linkToPost} className="text-decoration-none">
                            <div>{post.content}</div>
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default PostResult;
