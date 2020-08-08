import React from 'react';
import Categories from '../../app-page/components/CategoryExplorer';
import Category from './categoriesAZ';

class CategoriesPage extends React.Component {
    render() {
        return (
            <div>
                <Categories />
                <Category />
            </div>
        );
    }
}

export default CategoriesPage;