// The /categories/ explore page. Links to child categories will show list of tools

import React from 'react';
import { Link } from 'react-router-dom';

import Categories from '../../app-page/components/CategoryExplorer';
import Category from './categoriesAZ';

class CategoriesPage extends React.Component {
    render() {
        return (
            <div>
                <Categories />
                <Category />
                <div className="container mt-4">
                    <Link to="/categories/all"><strong>View All Tools</strong></Link>
                </div>
            </div>
        );
    }
}

export default CategoriesPage;