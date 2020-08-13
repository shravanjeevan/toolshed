import React from 'react';
import { Link } from 'react-router-dom';


class TagTab extends React.Component {
    render() {
        let path = `/search?query=${this.props.tagName}`;
        return <Link to={path} className="badge badge-secondary">{this.props.tagName}</Link>;
    }
};

export default TagTab;
