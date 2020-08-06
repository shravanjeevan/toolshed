import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import AppPage from './AppPage';
import Post from '../../post-page/components/Post';
import ResultsPage from '../../results-page/components/ResultsPage';
import CategoriesPage from '../../categories/categories';
import ToolsPage from '../../tools/tools';

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" exact component={AppPage}/>
                    <Route path="/post" exact component={Post}/>
                    <Route path="/results" exact component={ResultsPage}/>
                    <Route path="/blogs" exact component={ResultsPage}/>
                    <Route path="/knowledge/categories" exact component={CategoriesPage}/>
                    <Route path="/knowledge/tools" exact component={ToolsPage}/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
