import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AppPage from './AppPage';
import Post from '../../post-page/components/Post';
import ResultsPage from '../../results-page/components/ResultsPage';
import CreatePage from '../../create-page/components/CreatePage';
import EditPage from '../../create-page/components/EditPage';
import CategoriesPage from '../../categories/components/categories';
import BlogsPage from '../../blogs/components/BlogsPage';

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" exact component={AppPage}/>
                    <Route path="/post" exact component={Post}/>
                    <Route path="/results" exact component={ResultsPage}/>
                    <Route path="/create" exact component={CreatePage}/>
                    <Route path="/blogs" exact component={BlogsPage}/>
                    <Route path="/knowledge/categories" exact component={CategoriesPage}/>
                    <Route path="/edit" exact component={EditPage}/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
