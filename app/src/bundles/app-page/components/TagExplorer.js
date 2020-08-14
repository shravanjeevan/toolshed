import React from 'react';
import TagTab from '../../common/components/TagTab';
import backend from '../../apis/backend';

class TagExplorer extends React.Component {
    state = {
        tags: []
    };

    // Only get popular tags when tags component has loaded
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
            // Loop through popular tags from the system and generate a TagTab component for each one
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
