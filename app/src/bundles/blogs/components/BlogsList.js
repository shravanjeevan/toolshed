import React from 'react';
import { Link } from 'react-router-dom';
import backend from '../../apis/backend';

import PostResult from '../../common/components/PostResult';

class BlogsList extends React.Component {
    state = {
        posts: [],
    };

    componentDidMount() {
        this.getBlogs();
    }

    getBlogs = async () => {
        try {
            let res = await backend.get('/posts/');
            let { data } = res;
            this.setState({ posts: data });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        let blogs;
        let postsToShow = <div className="alert alert-light">No blog posts found.</div>;

        if (this.state.posts && this.state.posts.length > 0) {
            blogs = this.state.posts.filter((item) => item.type === 'blog_post');
            if (blogs && blogs.length > 0) {
                let postsToEmbed = blogs.map((post) => {
                    return (
                        <div className="col-lg-6">
                            <PostResult post={post} />
                        </div>
                    );
                });

                postsToShow = (
                    <div className="container">
                        <div className="row">
                            {postsToEmbed}
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="container">
                <div>
                    <h2>
                        Top Blog Posts{' '}
                        <Link className="ml-3 button" to="posts/create">
                            {' '}
                            Create Blog{' '}
                        </Link>
                    </h2>{' '}
                </div>
                <div className="mt-4">{postsToShow}</div>
            </div>
        );
    }
}

export default BlogsList;
