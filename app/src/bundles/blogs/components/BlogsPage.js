import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import BlogsList from './BlogsList';

class ResultsPage extends React.Component {
    render() {
        return (
            <div>
                <BlogsList />
            </div>
        );
    }
}

export default ResultsPage;
