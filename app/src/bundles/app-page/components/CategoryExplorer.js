import React from 'react';
import { Link } from 'react-router-dom';
import backend from '../../apis/backend';

class CategoryExplorer extends React.Component {
    state = {
        categories: []
    };

    // Fetch categories only when component has completed loading
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
        return(<div><h2>Explore Categories</h2><Link class="font-weight-bold" to="/categories">View All Categories</Link>
                </div>)
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

        // Conditional rendering of categories vs. no categories
        let categoriesToShow;
        if (categories && categories.length > 0) {
            categoriesToShow = categories.map((category) => {
                return (
                    // hard-coded category select button, not implemented as a separate component
                    <Link key={category.category} className="btn btn-info p-3 mr-4 mb-4 rounded-pill font-weight-bold" type="button" to={`/categories/${category.category}`}>
                        {category.category}
                    </Link>
                );
            });
        } else {
            categoriesToShow = <div className="alert alert-light">No categories found.</div>;
        }
        

        return (
            <div className="container">
                {this.toRender()}
                <div className="mt-4">{categoriesToShow}</div>
            </div>
        );
    }
}

export default CategoryExplorer;
