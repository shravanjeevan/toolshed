import React from 'react';
import TagTab from 'bundles/common/components/TagTab';

class TagExplorer extends React.Component {
    render() {
        var tags = ['Installation', 'Video', 'How-To', 'Apples'];

        var tagsToShow = tags.map((tagName) => {
            return (
                <span className="mr-2 mb-2">
                    <TagTab tagName={tagName} />
                </span>
            );
        });

        return (
            <div className="container">
                <h2>Explore Tags</h2>
                <div className="mt-4">{tagsToShow}</div>
            </div>
        );
    }
}

export default TagExplorer;
