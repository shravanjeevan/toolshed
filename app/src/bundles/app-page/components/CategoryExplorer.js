import React from 'react';
import { Link } from 'react-router-dom';
import {Button}  from 'react-bootstrap'

class CategoryExplorer extends React.Component {
    renderContent() {
        return (<div><h2>Popular Categories</h2></div>)
    }
    renderHomepage() {
        return(<div><h2>Explore Categories <Link className="button" to="/categories"> All Categories </Link></h2> </div>)
    }
    toRender() {
        if (window.location.pathname == '/') {
            return this.renderHomepage();
        } else {
            return this.renderContent();
        }
    }
    render() {
        var categories = [
            'Videoconferencing',
            'Collaboration',
            'Project Management',
            'Class Forums',
        ];

        var categoriesToShow = categories.map((categoryName) => {
            return (
                <Link className="btn btn-primary p-3 mr-4 mb-4 rounded-pill" type="button" to={`/categories/${categoryName}`}>
                    {categoryName}
                </Link>
            );
        });

        return (
            <div className="container">
                {this.toRender()}
                <div className="mt-4">{categoriesToShow}</div>
            </div>
        );
    }
}

export default CategoryExplorer;
