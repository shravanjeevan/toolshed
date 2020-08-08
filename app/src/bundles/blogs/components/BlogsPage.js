import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Navbar1 from '../../common/components/navbar';
import BlogsList from './BlogsList';

class ResultsPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar1 />
                <BlogsList />
            </div>
        );
    }
}

export default ResultsPage;
