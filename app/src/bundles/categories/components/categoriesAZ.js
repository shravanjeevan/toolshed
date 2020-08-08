import React from 'react';
import {Button}  from 'react-bootstrap'
import {withRouter} from 'react-router-dom';

class Category extends React.Component {
    render() {
        var categories = [
            'Videoconferencing',
            'Collaboration',
            'Project Management',
            'Class Forums',
            'Assignment submission',
            'Course Hosting',
            'File Storage'
        ];

        var categories_sort = categories.sort();

        var categoriesToShow = categories_sort.map((categoryName) => {
            return (
                <a className="btn btn-primary p-3 mr-4 mb-4 rounded-pill" type="button" href="/knowledge/tools">
                    {categoryName}
                </a>
            );
        });

        return (
            <div className="container">
                <h2>Categories A-Z</h2>
                <div className="mt-4">{categoriesToShow}</div>
            </div>
        );
    }
}

export default Category;
