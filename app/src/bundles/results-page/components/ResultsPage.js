import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import ResultsList from './ResultsList';

class ResultsPage extends React.Component {
    render() {
        return (
            <div>
                <ResultsList />
            </div>
        );
    }
}

export default ResultsPage;
