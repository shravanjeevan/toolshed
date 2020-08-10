import React from 'react';
import TagTab from '../../common/components/TagTab';
import backend from '../../apis/backend';

class TagExplorer extends React.Component {
    state = {
        tags: []
    };

    componentDidMount() {
        this.getPopularTags();
    }

    getPopularTags = async () => {
        try {
            let res = await backend.get('/tags/popular');
            let { data } = res;
            this.setState({ tags: data });
            console.log(this.state.tags);
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        let tags = this.state.tags;

        let tagsToShow;

        if (tags && tags.length > 0) {
            tagsToShow = tags.map((tag) => {
                return (
                    <span key={tag.tag} className="mr-4 mb-4">
                        <TagTab tagName={tag.tag} />
                    </span>
                );
            });
        } else {
            tagsToShow = <div className="alert alert-light">No tags found.</div>;
        }


        return (
            <div className="container">
                <h2>Explore Tags</h2>
                <div className="mt-4">{tagsToShow}</div>
            </div>
        );
    }
}

export default TagExplorer;
