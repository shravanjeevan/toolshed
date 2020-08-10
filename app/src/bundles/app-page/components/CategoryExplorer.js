import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import backend from '../../../bundles/apis/backend';
import axios from 'axios';

class CategoryExplorer extends React.Component {
    state = {
        categories: []
    };

    componentDidMount() {
        this.getCategories();
    }

    getCategories = async () => {
        try {
            let res = await backend.get('/categories/popular');
            let { data } = res;
            this.setState({ categories: data });
            console.log(this.state.categories);
        } catch(e) {
            console.log(e);
        }
    }


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
        let { categories }  = this.state;

        var categoriesToShow = categories.map((category) => {
            return (
                <Link className="btn btn-primary p-3 mr-4 mb-4 rounded-pill" type="button" to={`/categories/${category.category}`}>
                    {category.category} ({category.publishedCount})
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
