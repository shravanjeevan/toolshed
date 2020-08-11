import React from 'react';
import {Link } from 'react-router-dom';
import backend from '../../apis/backend';

class Category extends React.Component {
    state = {
        categories: []
    };

    componentDidMount() {
        this.getCategories();
    }

    getCategories = async () => {
        try {
            let res = await backend.get('/categories');
            let { data } = res;
            this.setState({ categories: data });
            console.log(this.state.categories);
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        let { categories } = this.state;
        let sortedCategories = categories.sort((a, b) => (a.category > b.category) ? 1 : -1);       // sorts list of cat objects based on "category" property alphabetically

        var categoriesToShow = sortedCategories.map((category) => {
            return (
                <Link className="btn btn-primary p-3 mr-4 mb-4 rounded-pill font-weight-bold" type="button" to={`/categories/${category.category}`}>
                    {category.category}
                </Link>
            );
        });

        return (
            <div className="container mt-4">
                <h2>Categories A-Z</h2>
                <div className="mt-4">{categoriesToShow}</div>
            </div>
        );
    }
}

export default Category;
