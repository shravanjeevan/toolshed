// The collection of blogs when navigating to the general /knowledge/ explore page

import React from 'react';
import KnowledgeList from './KnowledgeList';

class KnowledgePage extends React.Component {
    render() {
        return (
            <div>
                <KnowledgeList />
            </div>
        );
    }
}

export default KnowledgePage;
