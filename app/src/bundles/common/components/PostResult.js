// The multi-use post result component to be used when displaying post results, popular posts, related posts, user posts, etc.

import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import TagTab from './TagTab';
import './PostResult.css';

class PostResult extends React.Component {
    render() {
        let { post } = this.props;

        // List of tags
        let tagsToShow;
        if (post.tags && post.tags.length > 0) {
            tagsToShow = post.tags.map((tag) => {
                let path = `/search?query=${tag}`;
                return (
                    <span key={tag} className="mr-2 mb-1">
                        <TagTab tagName={tag} />
                    </span>
                );
            });
        }

        // Dynamically update the destination route depending on type of post
        let linkToPost = `/${post.type === 'blog_post' ? 'posts' : 'knowledge'}/${post.id}`;

        // Format to n days ago, x minutes ago, etc.
        let timeAgo = moment(post.createdOn).fromNow();     

        //let daysAgo = formatDistance(parse(post.createdOn, 'dd/MM/yyyy HH:mm:ss', new Date()), Date.now());

        // Conditionally display blog post elements
        // Knowledge Base Items defaults to only the date - this is the Knowledge Base subtitle
        let blogPostItemsToShow = (
            <div>
            </div>
        );

        // Blog Post Items includes other data points, this conditionally renders that additional info like author, date, claps, comments
        if (post.type === 'blog_post') {
            blogPostItemsToShow = (
                <div className="row">
                    <div className="col-sm text-muted">
                        <span className="font-italic">{timeAgo}</span>
                        <span>
                            {' '}
                            by{' '}
                            <Link
                                to={`/users/${post.createdBy_id ? post.createdBy_id : post.createdById}`}
                                className="text-primary font-weight-normal"
                            >
                                {post.createdByDisplayName}
                            </Link>
                        </span>
                    </div>
                    <div className="col-sm text-right text-muted">
                        <span className="">👏 {post.likeCount} claps</span>
                        <span className="ml-3">💬 {post.commentCount} comments</span>
                    </div>
                </div>
            );
        }

        // The 2 sentence preview shows HTML, this reduces to plain text
        function strip_html_tags(str) {
            if (!str || str === null || str === '') return false;
            else str = str.toString();
            return str.replace(/<[^>]*>/g, '');
        }

        return (
            <div className="post-card card rounded">
                <div className="card-body">
                    <h5 className="card-title">
                        <div className="row">
                            <Link
                                to={linkToPost}
                                className="title-text col-sm-8 text-decoration-none post-title"
                            >
                                {post.title}
                            </Link>
                            <div className="col-sm-4 text-right font-weight-light">
                                {post.type === 'blog_post'
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
                    <p className="post-text card-text">
                        <Link
                            to={linkToPost}
                            className="text-decoration-none post-content"
                        >
                            <div>{strip_html_tags(post.content)}</div>
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default PostResult;
