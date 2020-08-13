import React from 'react';
import { Link } from 'react-router-dom';
import backend from '../../apis/backend';

import PostResult from '../../common/components/PostResult';

class KnowledgeList extends React.Component {
    state = {
        posts: [],
    };

    componentDidMount() {
        this.getKnowledge();
    }

    getKnowledge = async () => {
        try {
            let res = await backend.get('/knowledge/popular?top=10');
            let { data } = res;
            this.setState({ posts: data });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        let know;
        let postsToShow = (
            <div className="alert alert-light">No knowledge items found.</div>
        );

        if (this.state.posts && this.state.posts.length > 0) {
            let postsToEmbed = this.state.posts.map((post) => {
                return (
                    <div className="col-lg-6">
                        <PostResult post={post} />
                    </div>
                );
            });

            postsToShow = (
                <div className="container">
                    <div className="row">{postsToEmbed}</div>
                </div>
            );
        }

        return (
            <div className="container">
                <div>
                    <h2>
                        Top Knowledge Base Items{' '}
                        <Link className="button" to="/knowledge/create/">
                            {' '}
                            Create Knowledge Item{' '}
                        </Link>
                    </h2>{' '}
                </div>
                <div className="mt-4">{postsToShow}</div>
            </div>
        );
    }
}

export default KnowledgeList;
