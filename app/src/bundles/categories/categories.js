import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Navbar1 from "../Global_Components/navbar"
import Categories from '../app-page/components/CategoryExplorer';
import Category from './categoriesAZ';

class CategoriesPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar1 />
                <Categories />
                <Category />
            </div>
        );
    }
}

export default CategoriesPage;