import React from 'react';

class CategoryExplorer extends React.Component {
    render() {
        var categories = [
            'Videoconferencing',
            'Collaboration',
            'Project Management',
            'Class Forums',
        ];

        var categoriesToShow = categories.map((categoryName) => {
            return (
                <button className="btn btn-primary p-3 mr-4 mb-4 rounded-pill" type="button">
                    {categoryName}
                </button>
            );
        });

        return (
            <div className="container">
                <h2>Explore Categories</h2>
                <div className="mt-4">{categoriesToShow}</div>
            </div>
        );
    }
}

export default CategoryExplorer;
