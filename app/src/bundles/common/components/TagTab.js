import React from 'react';
import { Link } from 'react-router-dom';


class TagTab extends React.Component {
    render() {
        let path = `/search?tag=${this.props.tagName}`;
        return <Link to={path} className="badge badge-pill badge-success">{this.props.tagName}</Link>;
    }
};

export default TagTab;
