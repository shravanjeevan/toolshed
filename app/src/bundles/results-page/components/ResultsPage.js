import React from 'react';
import Navbar1 from '../../common/components/navbar';
import ResultsList from './ResultsList';

class ResultsPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar1 />
                <ResultsList />
            </div>
        );
    }
}

export default ResultsPage;
