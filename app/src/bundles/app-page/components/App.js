import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import AppPage from './AppPage';
import Post from '../../post-page/components/Post';
import ResultsPage from '../../results-page/components/ResultsPage';

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" exact component={AppPage}/>
                    <Route path="/post" exact component={Post}/>
                    <Route path="/results" exact component={ResultsPage}/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
