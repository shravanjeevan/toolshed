import React from 'react';
import ToolsList from './ToolsList';

class ToolsPage extends React.Component {
    render() {
        return (
            <div>
                {/* To access the :slug in the URL, use props and pass down to child component */}
                <ToolsList category={this.props.match.params.slug}/>
            </div>
        );
    }
}

export default ToolsPage;