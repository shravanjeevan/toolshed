import React from 'react';
import axios from 'axios';

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

        if (posts) {
            postsToShow = posts.map((post) => {
                return (
                    <div className="my-4">
                        <PostResult post={post} />
                    </div>
                );
            });
        } else {
            postsToShow = <div>NO POSTS ON SUNDAY</div>;
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
