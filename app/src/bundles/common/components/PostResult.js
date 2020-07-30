import React from 'react';
import { Route, Link } from 'react-router-dom';

import Post from '../../post-page/components/Post';
import './PostResult.css';

class PostResult extends React.Component {
    render() {
        let { post } = this.props;

        // List of tags
        let tagsToShow = post.tags.map((tag) => {
            return (
                <a href="#" className="mr-2 badge badge-secondary">
                    {tag}
                </a>
            );
        });

        // Conditionally display blog post elements
        // Knowledge Base Items defaults to only the date - this is the Knowledge Base subtitle
        let blogPostItemsToShow = (
            <div>
                <span>{post.createdDate}</span>
            </div>
        );

        // Blog Post Items includes other data points
        if (post.isBlogPost) {
            blogPostItemsToShow = (
                <div className="row">
                    <div className="col-sm text-muted">
                        <span>{post.createdDate}</span>
                        <span>
                            {' '}
                            by{' '}
                            <a
                                className="text-primary font-weight-normal"
                                href="#"
                            >
                                {post.author}
                            </a>
                        </span>
                    </div>
                    <div className="col-sm text-right text-muted">
                        <span className="">👍 {post.likes} likes</span>
                        <span className="ml-3">
                            💬 {post.comments} comments
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
                                to="/post"
                                className="title-text col-sm-8 text-decoration-none"
                            >
                                {post.title}
                            </Link>
                            <div className="col-sm-4 text-right font-weight-light">
                                {post.isBlogPost
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
                        <Link to="/post" className="text-decoration-none">
                            <div>{post.body}</div>
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default PostResult;
