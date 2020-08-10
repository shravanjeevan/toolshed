import React from 'react';

import PostResult from '../../common/components/PostResult';
import backend from '../../apis/backend';

class PopularPosts extends React.Component {
    state = { 
        posts: [] 
    };

    componentDidMount() {
        this.getPopularPosts();
    }

    getPopularPosts = async () => {
        try {
            let res = await backend.get('/posts/popular');
            let { data } = res;
            this.setState({ posts: data });
            console.log(this.state.posts);
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        let { posts } = this.state;
        let postsToShow;

        if (posts && posts.length > 0) {
            postsToShow = posts.map((post) => {
                return (
                    <div key={post.id} className="my-4">
                        <PostResult post={post} />
                    </div>
                );
            });
        } else {
            postsToShow = <div className="alert alert-light">No popular posts found.</div>;
        }

        return (
            <div className="container">
                <h2>Popular Posts</h2>
                <div className="mt-4">{postsToShow}</div>
            </div>
        );
    }
}

export default PopularPosts;
