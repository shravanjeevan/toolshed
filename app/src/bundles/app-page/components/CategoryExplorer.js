import React from 'react';
import {Button}  from 'react-bootstrap'
import {withRouter} from 'react-router-dom';

class CategoryExplorer extends React.Component {
    renderContent() {
        return (<div><h2>Popular Categories</h2></div>)
    }
    renderHomepage() {
        return(<div><h2>Explore Categories <Button className="button" href="/knowledge/categories"> All Categories </Button></h2> </div>)
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
                <a className="btn btn-primary p-3 mr-4 mb-4 rounded-pill" type="button" href="/knowledge/tools">
                    {categoryName}
                </a>
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
