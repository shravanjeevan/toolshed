import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AppPage from './AppPage';
import Post from '../../post-page/components/Post';
import ResultsPage from '../../results-page/components/ResultsPage';
import CreatePage from '../../create-page/components/CreatePage';
import CategoriesPage from '../../categories/components/categories';
import BlogsPage from '../../blogs/components/BlogsPage';
import Navbar1 from '../../common/components/navbar';
import ScrollToTop from '../../common/components/ScrollToTop';
import ErrorPage from '../../common/components/ErrorPage';

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <ScrollToTop>
                        <Route path="/" component={Navbar1}/>
                        {/* This makes sure the navbar is always on display */}
                        <Switch>
                            <Route path="/" exact component={AppPage}/>
                            <Route path="/posts/:slug" exact component={Post}/>
                            <Route path="/search" exact component={ResultsPage}/>
                            <Route path="/posts/create" exact component={CreatePage}/>
                            <Route path="/blogs" exact component={BlogsPage}/>
                            <Route path="/categories" exact component={CategoriesPage}/>
                            {/* <Route path="/categories/:slug" exact component={ToolsPage}/> This should go to the tools component, i.e. a list of tools */}
                            {/* <Route path="/tools" exact component={ToolsPage}/> */}
                            <Route>
                                <Redirect to="/404"/>
                            </Route>
                            <Route path="/404" component={ErrorPage}/>
                        </Switch>
                    </ScrollToTop>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
