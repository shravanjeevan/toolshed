import React from 'react';


class TagTab extends React.Component {
    render() {
        return <a href="#" className="badge badge-pill badge-success">{this.props.tagName}</a>;
    }
};

export default TagTab;
